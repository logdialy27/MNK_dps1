
const setting = require("./setting");

const table_攻防関数min = [
    { begin: 0, end: 0.375, f: function (n,max) { return 0 } },
    { begin: 0.375, end: 1.25, f: function (n,max) { return n * 1.141 - 0.426; } },
    { begin: 1.25, end: 1.5, f: function (n,max) { return 1; } },
    { begin: 1.5, end: 2.375, f: function (n,max) { return n * 1.141 - 0.711; } },
    { begin: 2.375, end: 100.0, f: function (n, max) { return n - 0.375; } },
];

exports.攻防関数min = function (ad, C,wt, dlu,pdl, line) {
    if (wt == "格闘" || wt == "両手刀") {
        max = 3.50;
    } else if (wt == "両手鎌") {
        max = 4.0;
    } else if (wt == "両手剣" || wt == "両手斧" || wt == "両手槍" || wt == "両手棍") {
        max = 3.75;
    } else {
        max = 3.25;
    }

    // クリティカル時のボーナス
    var c_bounus = 1.0;
    line["攻防関数上限:max1"] = max;

    // 特性の加算
    max += dlu;
    line["攻防関数下限:max2"] = max;

    // 装備の乗算
    max = max * (100 + pdl) / 100;
    line["攻防関数下限:max3"] = max;

    var r = 0.0;
    for (var t of table_攻防関数min) {
        if (t.begin <= ad && ad < t.end) {
            r = t.f(ad, max);
            break;
        }
    }

    line["攻防関数下限:r1"] = r;
    r = Math.min(r, max);
    line["攻防関数下限:r2"] = r;

    if (C) {
        line["攻防関数下限:クリティカル"] = true;
        r = r + c_bounus;
    }

    line["攻防関数下限:r3"] = r;

    return r;
}

const table_攻防関数max = [
    { begin: 0, end: 0.5, f: function (n, max) { return n * 1.141 + 0.430 } },
    { begin: 0.5, end: 0.75, f: function (n, max) { return 1; } },
    { begin: 0.75, end: 1.625, f: function (n, max) { return n * 1.141 + 0.145; } },
    { begin: 1.625, end: 100.0, f: function (n, max) { return n + 0.375; } },
];

exports.攻防関数max = function (ad, C,wt,dlu,pdl,line) {
    if (wt == "格闘" || wt == "両手刀") {
        max = 3.50;
    } else if (wt == "両手鎌") {
        max = 4.0;
    } else if (wt == "両手剣" || wt == "両手斧" || wt == "両手槍" || wt == "両手棍") {
        max = 3.75;
    } else {
        max = 3.25;
    }

    // クリティカル時のボーナス
    var c_bounus = 1.0;

    line["攻防関数上限:max1"] = max;
    // 特性の加算
    max += dlu;
    line["攻防関数上限:max2"] = max;

    // 装備の乗算
    max = max * (100 + pdl) / 100;
    line["攻防関数上限:max3"] = max;

    var r = 0.0;
    for (var t of table_攻防関数max) {
        if (t.begin <= ad && ad < t.end) {
            r = t.f(ad, max);
            break;
        }
    }

    line["攻防関数上限:r1"] = r;
    r = Math.min(r, max);
    line["攻防関数上限:r2"] = r;

    if (C) {
        line["攻防関数上限:クリティカル"] = true;
        r = r + c_bounus;
    }

    line["攻防関数上限:r3"] = r;

    return r;
}

exports.攻防比 = function (a, d, wt,player,line) {
    if (d == 0) {
        d = 1;
    }

    // インピタス中の攻撃アップ
    if (player.buff_インピタス()) {
        // 100 + 40(ジョブポ)
        a = a + Math.min(140, player.n_hit_count_インピタス * 2);
    }

    var r = (a / d);

    // 最大値補正
    if (r >= 99.0) {
        r = 99.0;
    }

    line["攻防比"] = r;
    return r;
}

exports.固定ダメージ = function (str,vit,d,wt,player,line) {

    var w_rank;

    if (wt == "格闘") {
        w_rank = Math.floor((d - player.素手D() + 3) / 9);
    }
    else {
        w_rank = Math.floor(d / 9);
    }

    var sv_min = 0 - (w_rank * 2);
    var sv_max = (w_rank * 2 + 16) / 2;

    line["固定ダメージ:sv_max"] = sv_max;
    line["固定ダメージ:sv_min"] = sv_min;

    // TODO:SV関数は非キャップの変数

    var sv;

    if (false) {
        // 遠隔
        // 変数は4を採用
        sv = ((str - vit) + 4) / 2;
    } else {
        // 近接
        // 変数は4を採用
        sv = ((str - vit) + 4) / 4;
    }

    line["固定ダメージ:sv1"] = sv;

    // SV関数最大値と最低値補正
    sv = Math.max(sv_min, sv);
    sv = Math.min(sv_max, sv);

    line["固定ダメージ:sv2"] = sv;

    var r = d + sv;

    line["固定ダメージ:補正後"] = r;

    return r;
}

exports.命中判定 = function (wt,sub,acc,player,enemy,line) {

    // 武器種判定も必要
    if (wt == "格闘") {
        max = 99.0;
    } else if (wt == "両手鎌" || wt == "両手刀" || wt == "両手剣" || wt == "両手斧" || wt == "両手槍" || wt == "両手棍") {
        max = 95.0;
    } else if (sub) {
        // 二刀流のサブウェポン
        max = 95.0;
    } else {
        max = 99.0;
    }

    line["命中:max"] = max;
    // 命中と回避の差 2 = 命中率1 %で計算
    var e = enemy.Evasion();
    var r;

    // インピタス中の命中増加
    if (player.buff_インピタス() && player.equip_インピタス性能アップ()) {
        acc = acc + Math.min(50, player.n_hit_count_インピタス);
    }

    if (acc >= e) {
        r = 50 + Math.floor((acc - e) / 2);
        r = Math.min(max, r);
    } else {
        r = 50 - Math.floor((e - acc) / 2);
        r = Math.max(5, r);
    }

    line["命中:命中率"] = r;

    // 命中時
    if (this.rand(r)) {
        line["命中:HIT"] = true;
        return true;
    } else {
        line["命中:MISS"] = true;
        return false;
    }
}

// レリックとエンピリアンとSU5の倍撃判定
exports.xN = function (player,wt, idx, line) {

      if (player.xN_Relic() > 0) {
        // xN_Relicは発生確率を返却
        if (idx == 0 && this.rand(player.xN_Relic())) {
            return 3.0;
        }
    } else if (player.xN_Empyrean() > 0) {
        // xN_Empyreanは発生確率を返却
        if (wt == "格闘") {
            if (idx == 0 && this.rand(player.xN_Empyrean())) {
                return 3.0;
            }
        } else {
            if (this.rand(player.xN_Empyrean())) {
                return 3.0;
            }
        }
    } else if (player.xN_SU5() > 0) {
        // xN_SU5は発生確率を返却
        if (wt == "格闘") {
            if (idx == 0 && this.rand(player.xN_SU5())) {
                return 2.0;
            }
        } else {
            if (this.rand(player.xN_SU5())) {
                return 2.0;
            }
        }
    }

    return 1.0;
}

exports.AA_ダメージ計算 = function (t, player, enemy, line) {
    var logic = this;

    // クリティカルヒット判定
    var c = logic.critical(t.C, player, enemy, line);

    var attack = t.attack;
    // TODO:シのTA攻撃力アップ
    // TODO:戦のDA攻撃力アップ
    // TODO:モの蹴撃効果アップ
    // TODO:侍の残心効果アップ
    // WSのfunctionで実装すると箇所が複数になるので此処で実装

    var 攻防比 = logic.攻防比(attack, enemy.Defence(), t.wt, player,line);
    var 固定ダメージ = logic.固定ダメージ(player.STR(), enemy.VIT(), t.D, t.wt, player,line);

    var 攻防関数min = logic.攻防関数min(攻防比, c, t.wt, player.DamageLimit(), player.PhysicalDamageLimit(), line);
    var 攻防関数max = logic.攻防関数max(攻防比, c, t.wt, player.DamageLimit(), player.PhysicalDamageLimit(), line);

    var 攻防関数 = logic.rand_min_max(攻防関数min, 攻防関数max);
    line["攻防関数:確定値"] = 攻防関数;

    var dmg = Math.floor(固定ダメージ * t.xN);
    line["ダメージ:0"] = dmg;

    dmg = Math.floor(dmg * 攻防関数);
    line["ダメージ:1"] = dmg;

    // 1.00～1.05適用
    dmg = Math.floor(dmg * logic.rand_min_max(1.00, 1.05));
    line["ダメージ:3"] = dmg;

    if (c) {
        // Cインクリース適用
        line["ダメージ:3-CriticalDamage-N"] = player.CriticalDamage() + logic.extra_CriticalDamage(player);
        dmg = Math.floor(dmg * (100 + Math.min(player.CriticalDamage() + logic.extra_CriticalDamage(player),100)) / 100);
        line["ダメージ:3-CriticalDamage"] = dmg;
    }

    if (t.DA) {
        // DAダメージアップ適用
        dmg = Math.floor(dmg * (100 + player.DA_DamageUp()) / 100);
        line["ダメージ:3-DA_DamageUp"] = dmg;
    }

    if (t.TA) {
        // TAダメージアップ適用
        dmg = Math.floor(dmg * (100 + player.TA_DamageUp()) / 100);
        line["ダメージ:3-TA_DamageUp"] = dmg;
    }

    line["ダメージ:4"] = dmg;

    // TODO:武器種の耐性
    // TODO:ダメージカット

    return [dmg, c];
}


exports.WS_ダメージ計算 = function (idx,BP_D,t, player, enemy, line) {
    var logic = this;

    var c = false;

    // クリティカルヒット修正のWSのみ判定を実施
    if (t.C > 0) {
        c = logic.critical(t.C, player, enemy, line);
    }

    var attack = t.attack;
    // TODO:シのTA攻撃力アップ
    // TODO:戦のDA攻撃力アップ
    // TODO:モの蹴撃効果アップ
    // TODO:侍の残心効果アップ
    // WSのfunctionで実装すると箇所が複数になるので此処で実装

    var 攻防比 = logic.攻防比(attack, enemy.Defence(), t.wt, player,line);
    var 固定ダメージ = logic.固定ダメージ(player.STR(), enemy.VIT(), t.D, t.wt, player,line);

    // 固定ダメージにステータス修正の加算
    固定ダメージ += BP_D;
    line["固定ダメージ:確定値"] = 固定ダメージ;

    var 攻防関数min = logic.攻防関数min(攻防比, c, t.wt, player.DamageLimit(), player.PhysicalDamageLimit(), line);
    var 攻防関数max = logic.攻防関数max(攻防比, c, t.wt, player.DamageLimit(), player.PhysicalDamageLimit(), line);

    var 攻防関数 = logic.rand_min_max(攻防関数min, 攻防関数max);
    line["攻防関数:確定値"] = 攻防関数;

    var dmg = Math.floor(固定ダメージ * t.xN);
    line["ダメージ:0"] = dmg;

    dmg = Math.floor(dmg * 攻防関数);
    line["ダメージ:1"] = dmg;

    line["ダメージ:2"] = dmg;

    // 1.00～1.05適用
    dmg = Math.floor(dmg * logic.rand_min_max(1.00, 1.05));
    line["ダメージ:3"] = dmg;

    if (c) {
        // Cインクリース適用
        dmg = Math.floor(dmg * (100 + Math.min(player.CriticalDamage() + logic.extra_CriticalDamage(player),100) ) / 100);
        line["ダメージ:3-CriticalDamage"] = dmg;
    }

    if (t.DA) {
        // DAダメージアップ適用
        dmg = Math.floor(dmg * (100 + player.DA_DamageUp()) / 100);
        line["ダメージ:3-DA_DamageUp"] = dmg;
    }

    if (t.TA) {
        // TAダメージアップ適用
        dmg = Math.floor(dmg * (100 + player.TA_DamageUp()) / 100);
        line["ダメージ:3-TA_DamageUp"] = dmg;
    }

    line["ダメージ:4"] = dmg;

    // WSダメージアップ(装備やギフト)
    // 初段のみ適用
    if (idx == 0) {
        dmg = Math.floor(dmg * (100 + player.WS_DamageUp1()) / 100);
        line["ダメージ:5"] = dmg;
    }

    // WSダメージアップ(特性)
    dmg = Math.floor(dmg * (100 + player.WS_DamageUp2()) / 100);
    line["ダメージ:6"] = dmg;

    // WSダメージアップ(装備(2)RMEA特別)
    dmg = Math.floor(dmg * (100 + player.WS_DamageUp3(player.WS())) / 100);
    line["ダメージ:7"] = dmg;

    // TODO:武器種の耐性
    // TODO:ダメージカット

    return [dmg, c];
}

exports.WS属性_ダメージ計算 = function (idx, BP_D, t, player, enemy, line) {
    var logic = this;

    // TODO:作成
    return 0;
}

exports.AA_間隔 = function(player,line)
{
    // 短縮キャップがあり武器間隔の1/5より短縮されることはない
    // 格闘の場合は(素手+武器)
    var min_m = Math.floor(1000 * Math.floor(player.AttackSpeed() / 5) / 60);

    line["間隔:最低"] = min_m;

    // 得TPの基本間隔とは違って格闘と二刀流は/2の前の値
    var w = player.AttackSpeed();

    if (player.BlitzersRoll() != 0) {
        // ブリッツァロール
        w = w * (100 - player.BlitzersRoll()) / 100;
        line["間隔:ブリッツァロール後"] = m;
    }

    if (player.WeaponType() == "格闘") {
        // 格闘の場合
        // MAの適用
        w = w - player.MartialArts();
        line["間隔:MA後"] = w;
    } else if (player.SubWeaponType() != "") {
        // 二刀流の場合
        // 二刀流係数の適用
        w = w * (100 - player.DualWield()) / 100;
        line["間隔:二刀流係数後"] = w;
    } else {

    }

    w = Math.floor(w);
    line["間隔:武器間隔2"] = w;

    // 魔法枠と装備枠ヘイスト加算
    var h1 = Math.min(25.0, player.EquipHaste()) + Math.min(43.75,player.MagicHaste());

    // アビリティ枠ヘイスト
    var h2 = 0;
    // 両手武器の場合は八双とラストリゾートの加算
    var wt = player.WeaponType();
    if (wt == "両手剣" || wt == "両手斧" || wt == "両手槍" || wt == "両手鎌" ||
        wt == "両手棍" || wt == "両手刀") {

        h2 = h2 + player.HassoHaste();
        h2 = h2 + player.LastResortHaste();

    }
    // ヘイストサンバ加算
    h2 = Math.min(h2 + player.SambaHaste(), 25);

    var h = h1 + h2;

    line["間隔:ヘイスト合計"] = h;

    w= Math.floor(w * (100 - h) / 100.0);
    line["間隔:装備ヘイスト後"] = w;

    // 以降ミリ秒
    var m = Math.floor(1000 * w / 60);
    line["間隔:武器"] = m;

    if (m < min_m) {
        m = min_m;
        line["間隔:キャップ到達"] = m;
    }

    return m;
}

exports.get_基本隔 = function (player, line) {

    // この数値は二刀流の場合はメイン＋サブの値
    var m = player.AttackSpeed();

    // ブリッツァロール
    if (player.BlitzersRoll() != 0) {
        m = m * (100 - player.BlitzersRoll()) / 100;
    }

    // 格闘と二刀流
    if (player.WeaponType() == "格闘") {
        // 格闘の場合
        // MAの適用
        m = (m - player.MartialArts()) / 2;
    } else if (player.SubWeaponType() != "") {
        // 二刀流の場合
        // 二刀流係数の適用
        m = (m * (100 - player.DualWield()) / 100) / 2;
    } else {

    }

    line["基本隔"] = Math.floor(m);
    return m;
}

exports.get_基本TP = function (m, player, line) {

    var base_TP;
    if (m < 180) {
        base_TP = Math.floor(33 + (m - 20) * 28 / 160);
    } else if (180 <= m && m < 540) {
        base_TP = Math.floor(61 + (m - 180) * 88 / 360);
        if (base_TP < 40) {
            base_TP = 40;
        }
    } else if (540 <= m && m < 600) {
        base_TP = Math.floor(149 + (m - 540) * 3 / 60);
    } else if (600 <= m && m < 720) {
        base_TP = Math.floor(152 + (m - 600) * 9 / 120);
    } else if (720 <= m && m < 999) {
        base_TP = Math.floor(161 + (m - 720) * 19 / 280);
    } else {
        base_TP = 180;
    }

    line["基本TP:TP"] = base_TP;
    return base_TP;
}

// ストアTP適用
exports.STP = function(base_TP, stp, line){
    var tp = Math.floor(base_TP * (100 + stp) / 100);
    line["STP適用:TP"] = tp;
    return tp;
}


// 得TPの計算
exports.get_得TP = function (player, line) {
    var logic = this;
    // 基本得TPの計算
    var 基本間隔 = logic.get_基本隔(player, line);

    // 基本TPの計算
    var base_TP = logic.get_基本TP(基本間隔, player, line);

    // ストアTP適用
    var gain_TP = logic.STP(base_TP, player.STP(), line);

    line["得TP:TP"] = gain_TP;
    return gain_TP;
}

// クリティカル時得TPの計算
// カランビットとラブラウンダ用
exports.get_得TP_クリティカル = function (player,AA, line) {
    var logic = this;
    // 基本得TPの計算
    var 基本間隔 = logic.get_基本隔(player, line);

    // 基本TPの計算
    var base_TP = logic.get_基本TP(基本間隔, player, line);

    // ストアTP適用
    var gain_TP;

    if (AA) {
        // カランビット対応
        gain_TP = logic.STP(base_TP, player.STP() + player.equip_クリティカルヒット時ストアTP(), line);
    } else {
        gain_TP = logic.STP(base_TP, player.STP(), line);
    }

    // ラブラウンダ対応
    gain_TP += player.equip_クリティカルヒット時TP();

    line["得TPクリ:TP"] = gain_TP;
    return gain_TP;
}

// ミシックのAM3
exports.MythicAM3 = function (player, line) {

    // 1:2:3 = 35:45:20とする
    const m_table = {
        3: [{ min: 0, max: 35, c: 1 }, { min: 35, max: 80, c: 2 }, { min: 80, max: 100, c: 3 }],
    };

    // 乱数は一回だけ計算
    var r = Math.ceil(Math.random() * 100);

    line["MythicAM3:n"] = 3;
    line["MythicAM3:r"] = r;

    var t = m_table[3];
    if (t) {

        for (var i = 0; i < t.length; ++i) {
            if ((r >= t[i].min) && (r < t[i].max)) {
                var c = t[i].c;
                line["MythicAM3:c"] = c;
                return c;
            }
        }

    } else {
        return 1;
    }
}

// 複数回攻撃武器の発動数
exports.複数回攻撃判定 = function (player,line) {
    var n = player.複数回攻撃()

    const m_table = {
        2: [{ min: 0, max: 55, c: 1 }, { min: 55, max: 100, c:2 }],
        3: [{ min: 0, max: 30, c: 1 }, { min: 30, max: 80, c: 2 }, { min: 80, max: 100, c:3 }],
        4: [{ min: 0, max: 40, c: 1 }, { min: 40, max: 70, c: 2 }, { min: 70, max: 90, c: 3 }, { min: 90, max: 100, c:4 }],
        8: [{ min: 0, max: 5, c: 1 }, { min: 5, max: 20, c: 2 }, { min: 20, max: 45, c: 3 }, { min: 45, max: 70, c:4 },
            { min: 70, max: 85, c: 5 }, { min: 85, max: 95, c: 6 }, { min: 95, max: 98, c: 7 }, { min: 98, max: 100, c:8 }],
    };

    // 乱数は一回だけ計算
    var r = Math.ceil(Math.random() * 100);

    line["複数回攻撃:n"] = n;
    line["複数回攻撃:r"] = r;
    var t = m_table[n];
    if (t) {

        for (var i = 0; i < t.length; ++i) {
            if ((r >= t[i].min) && (r < t[i].max)) {
                var c = t[i].c;
                line["複数回攻撃:c"] = c;
                return c;
            }
        }

    } else {
        return 1;
    }
}

// DEX-AGI差
// 判明していない領域は仮値
const table_dex_agi = {
    0: 5,
    1: 5.2,
    2: 5.4,
    3: 5.6,
    4: 5.8,
    5: 6,
    6: 6,
    7: 6,
    8: 6.2,
    9: 6.4,
    10: 6.6,
    11: 6.8,
    12: 7,
    13: 7,
    14: 7,
    15: 7.2,
    16: 7.4,
    17: 7.6,
    18: 7.8,
    19: 8,
    20: 8,
    21: 8.1,
    22: 8.2,
    23: 8.3,
    24: 8.4,
    25: 8.5,
    26: 8.6,
    27: 8.7,
    28: 8.8,
    29: 8.9,
    30: 9,
    31: 9.1,
    32: 9.2,
    33: 9.3,
    34: 9.4,
    35: 9.5,
    36: 9.6,
    37: 9.7,
    38: 9.8,
    39: 9.9,
    40: 10,
    41: 11,
    42: 12,
    43: 13,
    44: 14,
    45: 15,
    46: 16,
    47: 17,
    48: 18,
    49: 19,
    50: 20,
}

exports.critical = function (c, player, enemy,line) {
    var dex = player.DEX();
    var agi = enemy.AGI();

    var d = (dex - agi);
    if (d > 50) {
        v = 20;
    }
    else if (d < 0) {
        v =  5;
    }
    else {
        v = table_dex_agi[d];
    }

    // TODO:enemy側の被クリティカル率アップ状態を参照
    var r = 0;

    if (player.buff_インピタス() && player.equip_インピタス性能アップ()) {
        c += Math.min(50, player.n_hit_count_インピタス);
    }

    var cc = Math.floor(c + v + r);
    var ret = this.rand(cc);

    if (!line["クリティカル"]) {
        line["クリティカル"] = []
    }

    line["クリティカル"].push([cc, ret]);

    if (setting.クリティカル詳細1()) {
        player.result_list("クリティカル詳細1", cc );
    }

    if (setting.クリティカル詳細2()) {
        player.result_list("クリティカル詳細2", [cc, ret]);
    }

    return ret;
}

// クリティカルダメージアップの特別処理
exports.extra_CriticalDamage = function (player){
    // インピタス
    // クリティカルダメージアップ
    var c = 0;
    if (player.buff_インピタス() && player.equip_インピタス性能アップ()) {
        c += Math.min(50.0, player.n_hit_count_インピタス);
    }

    return c;
}

exports.addTP = function (t, a) {
    t += a;
    if (t > 3000) {
        t = 3000;
    }
    return t;
}


// 乱数0～100が指定値以下であるかを判定する
// 
// Math.randomは0～1未満の値を返却する
// 100を乗算して0.xxxx～99.xxxxの値としている
exports.rand = function (r) {
    if (r >= 100) {
        return true;
    }

    // 101を乗算して0.xxxx～100.xxxxの値としていると1%低下した
    // var a = Math.random() * 101;
    var a = Math.random() * 100;
  
    if (a <= r) {
        return true;
    }
    return false;
}

// 範囲指定のランダム値
exports.rand_min_max = function (min, max) {
    return Math.random() * (max - min) + min;
}

// 指定範囲に含まれているかを判定
// min<= value < max
exports.contains = function (value, min, max) {
    if (min == max) {
        if (value == min) {
            return true;
        }
    }

    if (value < min) {
        return false;
    }

    if (value >= max) {
        return false;
    }
    return true;
}

// エンダメージのレジスト判定
exports.regist_エン = function (en_dmg, player, enemy, line)
{
    var t = player.エン仮レジスト();

    if (!t) {
        return en_dmg;
    }

    // 乱数は一回
    var r = Math.ceil(Math.random() * 101);

    if (t[0] && r <= t[0]) {
        // フルヒット
        return en_dmg;
    }

    if (t[1] && r <= t[1]) {
        // 1/2レジ
        return Math.ceil(en_dmg / 2);
    }

    if (t[2] && r <= t[2]) {
        // 1/4レジ
        return Math.ceil(en_dmg / 4);
    }

    if (t[3] && r <= t[3]) {
        // 1/8レジ
        return Math.ceil(en_dmg / 8);
    }

    return en_dmg;
}

// ガンビットの倍率判定
// 
// eが攻撃属性
// gがガンビットルーン一覧
// 攻撃属性毎にルーンが付与されている数分+10する
// 最終的に30とminで決定
exports.ガンビット = function (e, g, line) {

    var ret = 0;
    
    for (var i = 0; i < e.length; ++i) {
        for (var j = 0; j < g.length; ++j) {

            if (e[i] == g[j]) {
                ret += 10;

                if (ret >= 30) {
                    return 30;
                }
            }
        }
    }

    return Math.min(30, ret);
}

// コンサーブTP
exports.コンサーブTP = function(player, line)
{
    if (this.rand(player.コンサーブTP())) {
        // 10～200の均等ランダム
        var r = Math.round(Math.random() * 19) * 10 + 10 ;
        line["コンサーブTP:TP"] = r;
        return r;
    }

    return 0;
}

exports.属性WS基本D = function (player, line) {
    var w_lv = 119;

    if (w_lv <= 99) {
        return w_lv * 1.5 + 5;
    } else {
        return 99 * 1.5 + 5 + (w_lv - 100) * 2.5;
    }
}