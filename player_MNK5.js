// モンクのビクスマ-調整装備
exports.n_equipset = 0;

// プレイヤー名
exports.Name = function () {
    return "MNK/WAR/ビクスマ/サギッタA/調整後";
}

// playerの各種ステータス
// 
// 関連するプロパティのメソッドのみplayer.jsと同じ名前で実装
//
exports.STR = function () {
    if (this.n_equipset == 0) {
        return 107+195;
    } else {
        return 107+213;
    }
}

exports.DEX = function () {
    if (this.n_equipset == 0) {
        return 106 + 260;
    } else {
        return 106 + 214;
    }
}

exports.VIT = function () {
    if (this.n_equipset == 0) {
        return 107 + 138;
    } else {
        return 107 + 140;
    }
}

exports.AGI = function () {
    if (this.n_equipset == 0) {
        return 95 + 138;
    } else {
        return 95 + 146;
    }
}

exports.INT = function () {
    if (this.n_equipset == 0) {
        return 88 + 97;
    } else {
        return 88+77;
    }
}

exports.MND = function () {
    if (this.n_equipset == 0) {
        return 97 + 137;
    } else {
        return 97 + 113;
    }
}

exports.CHR = function () {
    if (this.n_equipset == 0) {
        return 95 + 109;
    } else {
        return 95 + 88;
    }
}

// メインのD値
// 格闘の場合も素手のDを加算した値
exports.D = function () {
    //return 80 + 158 + 20;// ウルス
    return  80 + 192 + 12;// サギッタA
    //return 78 + 180;//カランビット
}

// 素手のD値、SV計算時に減算する
// 蹴撃の武器D値を確認する
exports.素手D = function () {
    return 80;
}

// 攻撃間隔
// 二刀流の場合はメイン＋サブの攻撃間隔
// 
// マーシャルアーツと二刀流係数も適用前の数値
// ヘイストも非適用
// 最低値が武器の攻撃間隔の値の20%のためこの値の計算はあとで実施する
exports.AttackSpeed = function () {
    //return (480)+81; // ウルス
    return (480) + 121; //サギッタA
    //return (480) + 96; // カランビット
}

exports.KickD = function () {
    if (this.n_equipset == 0) {
        return (80) + 20 + 25 + 120;
    } else {
        return (80) + 20 + 25;
    }
}

exports.Attack = function () {
    if (this.n_equipset == 0) {
        return 1529;
    } else {
        return 1453;
    }
}

exports.SubAttack = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 0;
    }
}

exports.Defense = function () {
    if (this.n_equipset == 0) {
        return 1138;
    } else {
        return 1153;
    }
}

exports.Accuracy = function () {
    if (this.n_equipset == 0) {
        return 1324;
    } else {
        return 1315;
    }
}

exports.Evasion = function () {
    if (this.n_equipset == 0) {
        return 863;
    } else {
        return 847;
    }
}

// ストアTP
exports.STP = function () {
    if (this.n_equipset == 0) {
        return 5 + 1 + 5 + 7 + 25;
    } else{
        return 5 + 1 + 25;
    }
}

exports.DA = function () {
    if (this.n_equipset == 0) {
        return (10) + 2 + 5 + 10;
    } else {
        // サポ戦  + 耳左 + 耳右
        return (10) + 5 + 5  ;
    }
}

exports.TA = function () {
    if (this.n_equipset == 0) {
        // 頭 + 両手 + リング + 腰
        return 4 + 4 + 5 + 8;
    } else {
        // 頭 +  リング + 腰 + 脚 + 足
        return 4 + 5 + 8 + 5 + 4;
    }
}

exports.QA = function () {
    if (this.n_equipset == 0) {
        return 3;
    } else {
        return 3;
    }
}

// ミシックのAM3
// 状態をtrue or falseで返却
exports.MythicAM3 = function () {
    return false;
}

// 追撃発動率
exports.Pursuit = function () {
    return 0;
}

// 蹴撃発動率
exports.Kick = function () {
    if (this.n_equipset == 0) {
        // (特性 + メリポ) + 首 + 背中 + 脚 + 足
        return (14 + 5) + 25 + 10 + 19 + 10;
    } else {
        // (特性 + メリポ) + 首 + 背中
        return (14 + 5) + 25 + 10;
    }
}

// クリティカル
// 装備、支援を適用後の値
// ※DEX/AGI補正は含めない
// ※WSのクリティカル補正除く
exports.Critical = function () {
    if (this.n_equipset == 0) {
        return 8 + (3 + 5);  // 末尾の3+5はメリポとイオニス
    } else {
        // 両手+マント+脚+足の順
        return  5 + 10 + 7 + 5 + (3 + 5);// 末尾の3+5はメリポとイオニス
    }
}

// 武器に付与されているプロパティ「クリティカルヒット+」は、基本的にその武器での攻撃にしか適用されない。
exports.SubCritical = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 0;
    }
}

// クリティカルヒットダメージアップ
exports.CriticalDamage = function () {
    if (this.n_equipset == 0) {
        return 6;
    } else {
        // 頭 + 両手
        return 6 + 5;
    }
}

// 連携ボーナス+
exports.SkillchainBonus = function () {
    // 特性
    return 12;
}

// 魔法ダメージ+
exports.魔法ダメージ = function(){
    return 0;
}

// アフィニティは簡易的に共通値を採用
// TODO:アフィニティの属性
exports.Affinity = function (element) {
    return 0;
}

// 天候
// TODO:天候の属性
exports.天候曜日 = function (element) {
    return 0;
}

// 武器種
exports.WeaponType = function () {
    return "格闘";
}

// サブ武器種
exports.SubWeaponType = function () {
    return "";
}

// 魔法枠ヘイスト合計値
exports.MagicHaste = function () {
    return 43.75;
}

// 装備枠ヘイスト合計値
exports.EquipHaste = function () {
    //return 25.0;
    if (this.n_equipset == 0) {
        return Math.min(25,(4 + 8 + 4 + 5 + 6 + 4));
    } else {
        return Math.min(25, (4 +8 + 4 + 5 + 6 + 4));
    }
}

// マーシャルアーツ合計値
// 特性、ギフト、メリポ、ジョブポ、装備全部加算後の値
// サギッタの場合耳をマーケピアス+1
exports.MartialArts = function () {
    if (this.n_equipset == 0) {
        return (210) + 6 + 13;
    } else {
        return (210) + 6 ;
    }
}

// 特性のダメージ上限アップ
exports.DamageLimit = function () {
    return 3 * 26/256; // = 0.3
}
// 装備の物理ダメージ上限(%)
exports.PhysicalDamageLimit = function () {
    return 10;
}

// レリックの倍撃
// レリックをメインに装備している場合にのみ設定
// 発生確率
exports.xN_Relic = function () {
    return 0;
}

// エンピの倍撃
// エンピをメインに装備していてAMの場合に設定
// 発生確率なのでAMの発生確率を設定
exports.xN_Empyrean = function () {
    return 0;
}

// マスター武器の倍撃
// マスター武器をメインに装備している場合にのみ設定
// 発生確率
exports.xN_SU5 = function () {
    return 50;
}

// ダブルアタックダメージアップ
exports.DA_DamageUp = function () {
    return 0;
}

// トリプルアタックダメージアップ
exports.TA_DamageUp = function () {
    return 0;
}

// WSダメージアップ:属性ゴルゲとベルトの潜在能力
// 倍率で記載0.1 or 0.2
exports.WS_DamageUp0 = function () {
    if (this.n_equipset == 0) {
        return 0.0;
    } else {
        return 0.0;
    }
}

// WSダメージアップ:装備やギフト
exports.WS_DamageUp1 = function () {
    return 0;
}

// WSダメージアップ:竜の特性
exports.WS_DamageUp2 = function () {
    return 0;
}

// WSダメージアップ:RMEAやアンバス武器
// 引数のWS毎の対応で返却
exports.WS_DamageUp3 = function (name) {
    if (name == "ビクトリースマイト") {
        return 0;
    }
    if (name == "夢想阿修羅拳") {
        return 0;
    }
    return 0;
}

// 使用する可能性のあるWS一覧
exports.WS_list = function () {
    return ["四神円舞","ビクトリースマイト"];
    //return ["ビクトリースマイト"];
}

var ws_idx = 0;
const ws_list = ["四神円舞", "ビクトリースマイト", "ビクトリースマイト"];
//const ws_list = ["ビクトリースマイト"];
// 使用するWS名
exports.WS = function () {

    return ws_list[ws_idx];
}

exports.on_ws_done = function () {
    ws_idx = ws_idx + 1;
    if (ws_idx >= ws_list.length) {
        ws_idx = 0;
    }
}

// TPボーナス
// サブでも適用されるものはこちらに加算
exports.TP_Bonus = function () {
    return 0;
}

// ウェポンスキル使用時TPを消費しない
// 発生確率
exports.ウェポンスキル使用時TPを消費しない = function () {
    return 0;
}

// モクシャ
// モクシャI+IIの合計
exports.モクシャ = function () {
    return 75;
}

// バフの有無
exports.buff_インピタス = function () {
    return true;
}

// 装備による特別な効果
exports.equip_インピタス性能アップ = function () {
    if (this.n_equipset == 0) {
        return true;
    } else {
        return true;
    }
}

// カランビット
exports.equip_クリティカルヒット時ストアTP = function () {
    return 0;
}

// WSを実行するTP
exports.WS_TP = function () {
    return 1000;
}