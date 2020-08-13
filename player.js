// Playerの設定IF
// 実装jsでは必要なメソッドの未実装するための抽象クラス

// playerの変化するステータス
exports.n_TP = 0;
// 攻撃によって変化するカウンタ
exports.n_hit_count_エンII = 0;
exports.n_hit_count_インピタス = 0;

// 結果集計領域
// 結果はPlayer単位で集計する
exports.r_count = {};
exports.r_sum = {};
exports.r_list = {};
exports.r_max = {};
exports.r_min = {};

exports.r_dist = {};

exports.result_count = function (name) {
    if (this.r_count[name]) {
        this.r_count[name] += 1
    } else {
        this.r_count[name] = 1;
    }
}

exports.result_sum = function (name, v) {
    if (this.r_sum[name]) {
        this.r_sum[name] += v
    } else {
        this.r_sum[name] = v;
    }
}

exports.result_list = function (name, v) {
    if (this.r_list[name]) {
        this.r_list[name].push(v);
    } else {
        this.r_list[name] = [];
        this.r_list[name].push(v);
    }
}

exports.result_max = function (name, v) {
    if (this.r_max[name]) {
        if (v > this.r_max[name]) {
            this.r_max[name] = v;
        }
    } else {
        this.r_max[name] = v;
    }
}

exports.result_min = function (name, v) {
    if (this.r_min[name]) {
        if (v < this.r_min[name]) {
            this.r_min[name] = v;
        }
    } else {
        this.r_min[name] = v;
    }
}

exports.result_all = function (name, v) {
    this.result_count(name);
    this.result_sum(name, v);
    this.result_max(name, v);
    this.result_min(name, v);
    this.result_list(name, v);
}

exports.result_dist = function (name, v, n,c) {
    var i = Math.floor(v / n);
    if (this.r_dist[name]) {
        if (this.r_dist[name][i]) {
            this.r_dist[name][i] += c;
        } else {
            this.r_dist[name][i] = c;
        }
    } else {
        this.r_dist[name] = {}
        this.r_dist[name][i] = c;
    }


}

var zone = require("./zone");

// 定義jsのロード
var impl = null;

exports.Load = function(name){
    impl = require("./player_" + name);
    impl.n_equipset = this.n_equipset;

    if (impl.Load) {
        impl.Load(name);
    }
}


exports.tryWS = function () {
    if (this.n_TP >= this.WS_TP()) {
        return true;
    } else {
        return false;
    }
}

// プレイヤー名
exports.Name = function () {
    if (impl.Name) {
        return impl.Name();
    } else {
        return "XXX/XXX";
    }
}

// 装備セット番号
// この番号を参照し装備に対応する返却値を調節する
exports.n_equipset = 0;

// インターバル毎に実行される
// 
// [x,y] 
// x = AA遅延時間
// y = 行動禁止時間
exports.on_timer = function(current_time,line){
    if (impl.on_timer) {
        return impl.on_timer(current_time, line);
    } else {
        return [0,0];
    }
}

// WS実行後に呼び出される
exports.on_ws_done = function (current_time, ws_name, line) {
    if (impl.on_ws_done) {
        return impl.on_ws_done(current_time, ws_name, line);
    } else {
        return 0;
    }
}

// equipset変更
// 0:オートアタック装備
// 1:WS装備
exports.equipset = function (no) {
    if (impl) {
        impl.n_equipset = no;
    }

    this.n_equipset = no
}

// WSを実行するTP
// 現在のTPがこの数値以上の場合にWSを実行する
//
// TPが1000を超えていてもWSを実行しないという行動になる
// この値はDPS値に大きな影響がある
//
// 1.AAの比率が増えてWSの回数が減る
// 2.多段連携の場合、連携の成功確率が下がる
// 3.TPダメージ修正のWSのダメージ平均が高くなる
// 4.防御力カット修正などのWSはかなり不利になる
// 
// この数値を固定値のまま変更する場合は影響を理解した上で実施する必要がある
//
exports.WS_TP = function () {
    if (impl.WS_TP) {
        return impl.WS_TP();
    } else {
        return 1000;
    }
}

// playerの各種ステータス
// 装備や支援、ジョブ、種族、食事といった全ての計算を適用した結果を返却する
// 
// ・装備変更などもこのplayer.js経由で吸収する。
// ・基本的には「今の」状態を返す。
// ・バフの適用結果も含める。
// ・ただし以下のは例外とする
//
// 例外
// ・WSによる修正項目でこれはWS計算側で適用する
// ・エンIIのヒットによる増加
// ・インピタスによる攻撃、クリ、命中率の増加
// 
exports.STR = function () {
    if (impl.STR) {
        return impl.STR() + zone.STR();
    } else {
        return 1;
    }
}

exports.DEX = function () {
    if (impl.DEX) {;
        return impl.DEX() + zone.DEX();
    } else {
        return 1;
    }
}

exports.VIT = function () {
    if (impl.VIT) {
        return impl.VIT() + zone.VIT();
    } else {
        return 1;
    }
}

exports.AGI = function () {
    if (impl.AGI) {
        return impl.AGI() + zone.AGI();
    } else {
        return 1;
    }
}

exports.INT = function () {
    if (impl.INT) {
        return impl.INT() + zone.INT();
    } else {
        return 1;
    }
}

exports.MND = function () {
    if (impl.MND) {
        return impl.MND() + zone.MND();
    } else {
        return 1;
    }
}

exports.CHR = function () {
    if (impl.CHR) {
        return impl.CHR() + zone.CHR();
    } else {
        return 1;
    }
}

exports.HP = function () {
    if (impl.HP) {
        return impl.HP() + zone.HP();
    } else {
        return 1;
    }
}

exports.MP = function () {
    if (impl.MP) {
        return impl.MP() + zone.MP();
    } else {
        return 1;
    }
}

// メインのD値
exports.D = function () {
    if (impl.D) {
        return impl.D();
    } else {
        return 1;
    }
}

// 攻撃間隔
// 二刀流の場合はメイン＋サブの攻撃間隔
// 
// マーシャルアーツと二刀流係数も適用前の数値
// ヘイストも非適用
// 最低値が武器の攻撃間隔の値の20%のためこの値の計算はあとで実施する
exports.AttackSpeed = function () {
    if (impl.AttackSpeed) {
        return impl.AttackSpeed();
    } else {
        return 0;
    }
}

exports.SubD = function () {
    if (impl.SubD) {
        return impl.SubD();
    } else {
        return 0;
    }
}

// 素手のD値、SV計算時に減算する
// TODO:蹴撃の武器D値を確認する
exports.素手D = function () {
    if (impl.素手D) {
        return impl.素手D();
    } else {
        return 0;
    }
}

exports.KickD = function () {
    if (impl.KickD) {
        return impl.KickD();
    } else {
        return 0;
    }
}

exports.Attack = function () {
    if (impl.Attack) {
        return impl.Attack() + zone.Attack();
    } else {
        return 1;
    }
}

exports.SubAttack = function () {
    if (impl.SubAttack) {
        return impl.SubAttack() + zone.SubAttack();
    } else {
        return 1;
    }
}

exports.RangedAttack = function () {
    if (impl.RangedAttack) {
        return impl.RangedAttack() + zone.RangedAttack();
    } else {
        return 1;
    }
}

exports.Defense = function () {
    if (impl.Defense) {
        return impl.Defense() + zone.Defense();
    } else {
        return 1;
    }
}

exports.Accuracy = function () {
    if (impl.Accuracy) {
        return impl.Accuracy() + zone.Accuracy();
    } else {
        return 0;
    }
}

exports.SubAccuracy = function () {
    if (impl.SubAccuracy) {
        return impl.SubAccuracy() + zone.SubAccuracy();
    } else {
        return 0;
    }
}

exports.RangedAccuracy = function () {
    if (impl.RangedAccuracy) {
        return impl.RangedAccuracy() + zone.RangedAccuracy();
    } else {
        return 0;
    }
}

exports.RangedD = function () {
    if (impl.RangedD) {
        return impl.RangedD();
    } else {
        return 0;
    }
}

exports.MagicAttack = function () {
    if (impl.MagicAttack) {
        return impl.MagicAttack() + zone.MagicAttack();
    } else {
        return 1;
    }
}

exports.MagicAccuracy = function () {
    if (impl.MagicAccuracy) {
        return impl.MagicAccuracy() + zone.MagicAccuracy();
    } else {
        return 1;
    }
}

exports.MagicDefense = function () {
    if (impl.MagicDefense) {
        return impl.MagicDefense() + zone.MagicDefense();
    } else {
        return 1;
    }
}

exports.Evasion = function () {
    if (impl.Evasion) {
        return impl.Evasion() + zone.Evasion();
    } else {
        return 1;
    }
}

exports.MagicEvasion = function () {
    if (impl.MagicEvasion) {
        return impl.MagicEvasion() + zone.MagicEvasion();
    } else {
        return 1;
    }
}

// ストアTP
exports.STP = function () {
    if (impl.STP) {
        return impl.STP();
    } else {
        return 0;
    }
}

exports.DA = function () {
    if (impl.DA) {
        return impl.DA();
    } else {
        return 0;
    }
}

exports.TA = function () {
    if (impl.TA) {
        return impl.TA();
    } else {
        return 0;
    }
}

exports.QA = function () {
    if (impl.QA) {
        return impl.QA();
    } else {
        return 0;
    }
}

// ミシックのAM3
// 状態をtrue or falseで返却
exports.MythicAM3 = function () {
    if (impl.MythicAM3) {
        return impl.MythicAM3();
    } else {
        return false;
    }
}

// 複数回攻撃武器の2～N
// 発動は別途テーブルを使って計算
// 武器に設定されている最大数を返却
exports.複数回攻撃 = function () {
    if (impl.複数回攻撃) {
        return impl.複数回攻撃();
    } else {
        return 0;
    }
}

// サブの複数回攻撃武器の2～N
// 発動は別途テーブルを使って計算
// 武器に設定されている最大数を返却
exports.Sub複数回攻撃 = function () {
    if (impl.Sub複数回攻撃) {
        return impl.Sub複数回攻撃();
    } else {
        return 0;
    }
}


// 追撃発動率
exports.Pursuit = function () {
    if (impl.Pursuit) {
        return impl.Pursuit();
    } else {
        return 0;
    }
}

// 打剣発動率
exports.Daken = function () {
    if (impl.Daken) {
        return impl.Daken();
    } else {
        return 0;
    }
}

// 蹴撃発動率
exports.Kick = function () {
    if (impl.Kick) {
        return impl.Kick();
    } else {
        return 0;
    }
}

// クリティカル
// 装備、支援を適用後の値
// ※DEX/AGI補正は含めない
// ※WSのクリティカル補正除く
// ※インピタスは除く
exports.Critical = function () {
    if (impl.Critical) {
        return impl.Critical() + zone.Critical();
    } else {
        return 0;
    }
}

// サブクリティカル
// 武器に付与されているプロパティ「クリティカルヒット+」は、基本的にその武器での攻撃にしか適用されない。
exports.SubCritical = function () {
    if (impl.SubCritical) {
        return impl.SubCritical() + zone.SubCritical();
    } else {
        return 0;
    }
}

// 遠隔のクリティカル
exports.RangedCritical = function () {
    if (impl.RangedCritical) {
        return impl.RangedCritical() + zone.RangedCritical();
    } else {
        return 0;
    }
}

exports.MagicCritical = function () {
    if (impl.MagicCritical) {
        return impl.MagicCritical();
    } else {
        return 0;
    }
}

exports.MagicCriticalDamage = function () {
    if (impl.MagicCriticalDamage) {
        return impl.MagicCriticalDamage();
    } else {
        return 0;
    }
}

// 被クリティカル
exports.CriticalDown = function () {
    if (impl.CriticalDown) {
        return impl.CriticalDown();
    } else {
        return 0;
    }
}

// クリティカルヒットダメージアップ
// ※インピタスは除く
exports.CriticalDamage = function () {
    if (impl.CriticalDamage) {
        return impl.CriticalDamage();
    } else {
        return 0;
    }
}

// 連携ボーナス+
exports.SkillchainBonus = function () {
    if (impl.SkillchainBonus) {
        return impl.SkillchainBonus();
    } else {
        return 0;
    }
}

// 魔法ダメージ+
exports.魔法ダメージ = function () {
    if (impl.魔法ダメージ) {
        return impl.魔法ダメージ();
    } else {
        return 0;
    }
}

// アフィニティ
// 引数で属性を指定
// TODO:アフィニティの属性
exports.Affinity = function (element) {
    if (impl.Affinity) {
        return impl.Affinity(element);
    } else {
        return 0;
    }
}

// 天候
// TODO:天候の属性
exports.天候曜日 = function (element) {
    if (impl.天候曜日) {
        return impl.天候曜日(element);
    } else {
        return 0;
    }
}

// 属性杖
// TODO:天候の属性
exports.属性杖 = function (element) {
    if (impl.属性杖) {
        return impl.属性杖(element);
    } else {
        return 0;
    }
}

// 虚誘
exports.虚誘 = function (element) {
    if (impl.虚誘) {
        return impl.虚誘(element);
    } else {
        return 0;
    }
}


// 武器種
exports.WeaponType = function () {
    if (impl.WeaponType) {
        return impl.WeaponType();
    } else {
        return "片手剣";
    }
}

// サブ武器種
// グリップは対象外
exports.SubWeaponType = function () {
    if (impl.SubWeaponType) {
        return impl.SubWeaponType();
    } else {
        return "";
    }
}

// 二刀流
// 0～100
// 装備基準の整数値表現
// 計算メソッド
// 
exports.DualWield = function () {
    // 特性と装備
    if (impl.DualWield) {
        return impl.DualWield();
    } else {
        return (1.00 - this.DualWield_特性()) * 100 + this.DualWield_装備();
    }
}

// 二刀流の特性
// 歴史的に特性の表記は短縮率の小数値
exports.DualWield_特性 = function () {
    if (impl.DualWield_特性) {
        return impl.DualWield_特性();
    } else {
        return 1.00;
    }
}

// 二刀流の装備
// 装備の整数値
exports.DualWield_装備 = function () {
    if (impl.DualWield_装備) {
        return impl.DualWield_装備();
    } else {
        return 0;
    }
}

// 魔法枠ヘイスト合計値
exports.MagicHaste = function () {
    if (impl.MagicHaste) {
        return impl.MagicHaste();
    } else {
        return 0;
    }
}

// 装備枠ヘイスト合計値
exports.EquipHaste = function () {
    if (impl.EquipHaste) {
        return impl.EquipHaste();
    } else {
        return 0;
    }
}

// ヘイストサンバ
exports.SambaHaste = function () {
    if (impl.SambaHaste) {
        return impl.SambaHaste();
    } else {
        return 0;
    }
}

// 八双のヘイスト
exports.HassoHaste = function () {
    if (impl.HassoHaste) {
        return impl.HassoHaste();
    } else {
        return 0;
    }
}
// ラストリゾートのヘイスト
exports.LastResortHaste = function () {
    if (impl.LastResortHaste) {
        return impl.LastResortHaste();
    } else {
        return 0;
    }
}

// マーシャルアーツ合計値
// 特性、ギフト、メリポ、ジョブポ、装備全部加算後の値
exports.MartialArts = function () {
    if (impl.MartialArts) {
        return impl.MartialArts();
    } else {
        return 0;
    }
}

// ブリッツァロール
// 短縮割合を返却、ロールの出目、ロール+の効果は適用後の値
exports.BlitzersRoll = function () {
    if (impl.BlitzersRoll) {
        return impl.BlitzersRoll();
    } else {
        return 0;
    }
}

// 耐性
exports.Regist = function (n) {
    if (impl.Regist) {
        return impl.Regist(n);
    } else {
        return 0;
    }
}

// 特性のダメージ上限アップ
// モ=0.3、暗黒=0.5等
exports.DamageLimit = function () {
    if (impl.DamageLimit) {
        return impl.DamageLimit();
    } else {
        return 0;
    }
}
// 装備の物理ダメージ上限(%)
// モンクの喉輪=10%,暗黒の数珠=10%
exports.PhysicalDamageLimit = function () {
    if (impl.PhysicalDamageLimit) {
        return impl.PhysicalDamageLimit();
    } else {
        return 0;
    }
}

// レリックの倍撃
// レリックをメインに装備している場合にのみ設定
// 発生確率
exports.xN_Relic = function () {
    if (impl.xN_Relic) {
        return impl.xN_Relic();
    } else {
        return 0;
    }
}

// エンピの倍撃
// エンピをメインに装備していてAMの場合に設定
// 発生確率なのでAMの発生確率を設定
exports.xN_Empyrean = function () {
    if (impl.xN_Empyrean) {
        return impl.xN_Empyrean();
    } else {
        return 0;
    }
}

// マスター武器の倍撃
// マスター武器をメインに装備している場合にのみ設定
// 発生確率
exports.xN_SU5 = function () {
    if (impl.xN_SU5) {
        return impl.xN_SU5();
    } else {
        return 0;
    }
}

// ダブルアタックダメージアップ
exports.DA_DamageUp = function () {
    if (impl.DA_DamageUp) {
        return impl.DA_DamageUp();
    } else {
        return 0;
    }
}

// トリプルアタックダメージアップ
exports.TA_DamageUp = function () {
    if (impl.TA_DamageUp) {
        return impl.TA_DamageUp();
    } else {
        return 0;
    }
}

// WSダメージアップ:属性ゴルゲとベルトの潜在能力
// 倍率で記載0.1 or 0.2
exports.WS_DamageUp0 = function () {
    if (impl.WS_DamageUp0) {
        return impl.WS_DamageUp0();
    } else {
        return 0;
    }
}

// WSダメージアップ:装備やギフト
exports.WS_DamageUp1 = function () {
    if (impl.WS_DamageUp1) {
        return impl.WS_DamageUp1();
    } else {
        return 0;
    }
}

// WSダメージアップ:竜の特性
exports.WS_DamageUp2 = function () {
    if (impl.WS_DamageUp2) {
        return impl.WS_DamageUp2();
    } else {
        return 0;
    }
}

// WSダメージアップ:RMEAやアンバス武器
// 引数のWS毎の対応で返却
exports.WS_DamageUp3 = function (name) {
    if (impl.WS_DamageUp3) {
        return impl.WS_DamageUp3(name);
    } else {
        return 0;
    }
}

// 属性ウェポンスキルダメージ
// クロセアモースやシャランガのオーグメント
exports.属性ウェポンスキルダメージ = function () {
    if (impl.属性ウェポンスキルダメージ) {
        return impl.属性ウェポンスキルダメージ(name);
    } else {
        return 0;
    }
}

// 使用する可能性のあるWS一覧
exports.WS_list = function () {
    if (impl.WS_list) {
        return impl.WS_list();
    } else {
        return ["ビクトリースマイト"];
    }
}

// 使用するWS名
exports.WS = function () {
    if (impl.WS) {
        return impl.WS();
    } else {
        return "ビクトリースマイト";
    }
}

// TPボーナス
// サブでも適用されるものはこちらに加算
exports.TP_Bonus = function () {
    if (impl.TP_Bonus) {
        return impl.TP_Bonus();
    } else {
        return 0;
    }
}

// 遠隔TPボーナス
exports.RangedTP_Bonus = function () {
    if (impl.RangedTP_Bonus) {
        return impl.RangedTP_Bonus();
    } else {
        return 0;
    }
}

// メインのエンのダメージ値
// エンがある場合は詠唱時の強化スキルと攻撃時の魔法剣+(固定値)で決まるエンダメージ値を返却
// 0でエンはなし
// 魔法剣ダメージ+%は適用前の値
// アフィニティ適用前の値
exports.エン = function () {
    if (impl.エン) {
        return impl.エン();
    } else {
        return 0;
    }
}

// サブエンのダメージ値
// エンがある場合は詠唱時の強化スキルと攻撃時の魔法剣+(固定値)で決まるエンダメージ値を返却
// 0でエンはなし
// 魔法剣ダメージ+%は適用前の値
// アフィニティ適用前の値
exports.Subエン = function () {
    if (impl.Subエン) {
        return impl.Subエン();
    } else {
        return 0;
    }
}

// エンIIのダメージ値
// エンIIがある場合は攻撃時の強化スキルと攻撃時の魔法剣+で決まるエンダメージ値を返却
// 0でエンIIはなし、アフィニティ適用前の値
// エンIIはダメージ値が増えていくが、それはn領域で計算時に加算
// この値の二倍まで増加する
exports.エンII = function () {
    if (impl.エンII) {
        return impl.エンII();
    } else {
        return 0;
    }
}

// エンの属性を返却
// 暫定処理:全属性扱い
exports.エン属性 = function () {
    if (impl.エン属性) {
        return impl.エン属性();
    } else {
        return ["火", "氷", "風", "土", "雷", "水", "光", "闇"];
    }
}

// エンの仮レジ確率を配列で返却
// [0] = フルヒット確率
// [1] = ハーブレジスト確率
// [2] = クオーターレジスト確率
// [3] = フルレジスト確率
// 
// Enemyの耐性と魔命と強化スキルで動的に判定する必要がある
exports.エン仮レジスト = function () {
    if (impl.エン仮レジスト) {
        return impl.エン仮レジスト();
    } else {
        return [100,0,0,0];
    }
}

// 魔法剣ダメージ+N%
// コンポージャーの効果も加算
exports.EnspellDamageUp = function () {
    if (impl.EnspellDamageUp) {
        return impl.EnspellDamageUp();
    } else {
        return 0;
    }
}

// 魔法剣ダメージ+N%のサブ
// コンポージャーの効果も加算
exports.SubEnspellDamageUp = function () {
    if (impl.SubEnspellDamageUp) {
        return impl.SubEnspellDamageUp();
    } else {
        return 0;
    }
}

// ウェポンスキル使用時TPを消費しない
// 発生確率
exports.ウェポンスキル使用時TPを消費しない = function () {
    if (impl.ウェポンスキル使用時TPを消費しない) {
        return impl.ウェポンスキル使用時TPを消費しない();
    } else {
        return 0;
    }
}

// モクシャ
// モクシャI+IIの合計
exports.モクシャ = function () {
    if (impl.モクシャ) {
        return impl.モクシャ();
    } else {
        return 0;
    }
}

// セーブTP
exports.セーブTP = function () {
    if (impl.セーブTP) {
        return impl.セーブTP() + zone.セーブTP();
    } else {
        return 0;
    }
}

// コンサーブTP
exports.コンサーブTP = function () {
    if (impl.コンサーブTP) {
        return impl.コンサーブTP();
    } else {
        return 0;
    }
}

exports.被物理ダメージ = function () {
    if (impl.被物理ダメージ) {
        return impl.被物理ダメージ();
    } else {
        return 0;
    }
}

exports.被魔法ダメージ = function () {
    if (impl.被魔法ダメージ) {
        return impl.被魔法ダメージ();
    } else {
        return 0;
    }
}

exports.被ダメージ = function () {
    if (impl.被ダメージ) {
        return impl.被ダメージ() + zone.被ダメージ();
    } else {
        return 0;
    }
}

// アビリティによる特別な効果

// バフの有無
exports.buff_インピタス = function () {
    if (impl.buff_インピタス) {
        return impl.buff_インピタス();
    } else {
        return false;
    }
}

// 装備による特別な効果

exports.equip_インピタス性能アップ = function () {
    if (impl.equip_インピタス性能アップ) {
        return impl.equip_インピタス性能アップ();
    } else {
        return false;
    }
}

// ラブラウンダ
// return +値
exports.equip_クリティカルヒット時TP = function () {
    if (impl.equip_クリティカルヒット時TP) {
        return impl.equip_クリティカルヒット時TP();
    } else {
        return 0;
    }
}

// カランビット
// クリティカルヒット時ストアTP+50
// return STP
exports.equip_クリティカルヒット時ストアTP = function () {
    if (impl.equip_クリティカルヒット時ストアTP) {
        return impl.equip_クリティカルヒット時ストアTP();
    } else {
        return 0;
    }
}
