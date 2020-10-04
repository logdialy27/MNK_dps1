exports.n_equipset = 0;

//const ws_set = 100 // BI
const ws_set = 101 // フラマ

// プレイヤー名
exports.Name = function () {
    return "WAR1";
}

exports.Description = function () {
    return "ウコンバサラ/ウッコフューリー/ウコン装備AM1/2/3";
}

// JOB
exports.JOB = function () {
    return "WAR/SAM";
}

// playerの各種ステータス
// 
// 関連するプロパティのメソッドのみplayer.jsと同じ名前実装
//
exports.STR = function () {
    if (this.n_equipset == 0) {
        return 114 + 259 + 7; // +7=八双
    } else if (ws_set == 100) {
        return 114 + 323 + 7; // +7=八双
    } else {
        return 114 + 349 + 7; // +7=八双
    }
}

exports.DEX = function () {
    if (this.n_equipset == 0) {
        return 101 + 167;
    } else if (ws_set == 100) {
        return 101 + 190;
    } else {
        return 101 + 217;
    }
}

exports.VIT = function () {
    if (this.n_equipset == 0) {
        return 104 + 201;
    } else if (ws_set == 100) {
        return 101 + 183;
    } else {
        return 104 + 195;
    }
}

exports.AGI = function () {
    if (this.n_equipset == 0) {
        return 96 + 102;
    } else if (ws_set == 1001) {
        return 96 + 105;
    } else {
        return 96 + 106;
    }
}

exports.INT = function () {
    if (this.n_equipset == 0) {
        return 86 + 92;
    } else if (ws_set == 100) {
        return 86 + 94;
    } else {
        return 86 + 94;
    }
}

exports.MND = function () {
    if (this.n_equipset == 0) {
        return 97 + 134;
    } else if (ws_set == 100) {
        return 97 + 100;
    } else {
        return 97 + 101;
    }
}

exports.CHR = function () {
    if (this.n_equipset == 0) {
        return 96 + 161;
    } else if (ws_set == 100) {
        return 96 + 113;
    } else {
        return 96 + 114;
    }
}

// メインのD値
exports.D = function () {
    return 340 + 12;
}

// 攻撃間隔
// 二刀流の場合はメイン＋サブの攻撃間隔
exports.AttackSpeed = function () {
    return 482;
}

exports.SubD = function () {
    return 0;
}

exports.Attack = function () {
    if (this.n_equipset == 0) {
        return 1860;
    } else if (ws_set == 100) {
        return 1702;
    } else {
        return 1726;
    }
}

exports.SubAttack = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else if (ws_set == 100) {
        return 0;
    } else {
        return 0;
    }
}

exports.Defense = function () {
    if (this.n_equipset == 0) {
        return 1579;
    } else if (ws_set == 100) {
        return 1531;
    } else {
        return 1540;
    }
}

exports.Accuracy = function () {
    if (this.n_equipset == 0) {
        return 1228;
    } else if (ws_set == 100) {
        return 1209;
    } else {
        return 1243;
    }
}

exports.SubAccuracy = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 0;
    }
}

exports.Evasion = function () {
    if (this.n_equipset == 0) {
        return 726;
    } else if (ws_set == 100) {
        return 732;
    } else {
        return 753;
    }
}

// ストアTP
exports.STP = function () {
    if (this.n_equipset == 0) {
        return 7 + 5 + 3 + 10 + 5 + 5 + 4 + (15) ;
    } else if (ws_set == 100) {
        return 10 + 6 + (15);
    } else {
        return 10 + 6 + 6 + (15);
    }
}

exports.DA = function () {
    if (this.n_equipset == 0) {
        return (28) + (5) + 6 + 7 + 1 + 3 + 6 + 10 + 9 + 6 + 9 
    } else if (ws_set == 100) {
        return (28) + (5) + 3 + 7 + (1) + 5 + 11
    } else {
        return (28) + (5) + 3 + 7 + (1) + 5 + 11 + 6
    }
}

exports.TA = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 2;
    }
}

exports.QA = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 3;
    }
}

// ミシックのAM3
// 状態をtrue or falseで返却
exports.MythicAM3 = function () {
    return false;
}

// 複数回攻撃武器の2～N
// 発動は別途テーブルを使って計算
// 武器に設定されている最大数を返却
exports.複数回攻撃 = function () {
    return 0;
}

// サブの複数回攻撃武器の2～N
// 発動は別途テーブルを使って計算
// 武器に設定されている最大数を返却
exports.Sub複数回攻撃 = function () {
    return 0;
}

// クリティカル
// 装備、支援を適用後の値
// ※DEX/AGI補正は含めない
// ※WSのクリティカル補正除く
exports.Critical = function () {
    if (this.n_equipset == 0) {
        return 13 + (5) + (10); // メリポ(5) + ギフト(10)
    } else {
        return 2 + 10 + 13 + 8 + (5) + (10); // メリポ(5)+ ギフト(10)
    }
}



// 武器に付与されているプロパティ「クリティカルヒット+」は、基本的にその武器での攻撃にしか適用されない。

exports.SubCritical = function () {
    if (this.n_equipset == 0) {
        return 0
    } else {
        return 0
    }
}

// クリティカルヒットダメージアップ
exports.CriticalDamage = function () {
    // Cインクリースやギフトも含む合算値で0～100の%値
    if (this.n_equipset == 0) {
        // 特性+ギフト
        return (8+10)
    } else if (ws_set == 100) {
        return (8 + 10) + 6 + 11
    } else {
        return (8+10) + 6 
    }
}

// 連携ボーナス+
exports.SkillchainBonus = function () {
    return 0;
}

// 魔法ダメージ+
exports.魔法ダメージ = function () {
    return 1;
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
    return "両手斧";
}

// サブ武器種
// グリップは対象外
exports.SubWeaponType = function () {
    return "";
}

// 魔法枠ヘイスト合計値
exports.MagicHaste = function () {
    return 43.75;
}

// 装備枠ヘイスト合計値
// 装備枠ヘイストは26%でないとキャップしない
// これは装備品毎にMath.floor(10.24 * N)を実施しているため
exports.EquipHaste = function () {
    //return 25.0;
    if (this.n_equipset == 0) {
        return Math.min(25,5 + 3 + 8 + 6 + 4)
        //イオスケハで25%の場合の厳密式
        //return Math.floor(Math.min(256,
        //    Math.floor(10.24 * 4) +
        //    Math.floor(10.24 * 3) +
        //    Math.floor(10.24 * 8) +
        //    Math.floor(10.24 * 6) +
        //    Math.floor(10.24 * 4) ) / 1024 * 100)
    } else {
        return Math.min(25,8 + 4 + 9 + 6 + 2)
        //25%の場合の厳密式
        //return Math.floor(Math.min(256,
        //    Math.floor(10.24 * 4) +
        //    Math.floor(10.24 * 3) +
        //    Math.floor(10.24 * 8) +
        //    Math.floor(10.24 * 6) +
        //    Math.floor(10.24 * 4)) / 1024 * 100)
    }
}

// 八双のヘイスト
exports.HassoHaste = function () {
    if (this.n_equipset == 0) {
        return 10
    } else {
        return 10
    }
}

// ラストリゾートのヘイスト
exports.LastResortHaste = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 0;
    }
}

// 特性のダメージ上限アップ
exports.DamageLimit = function () {
    return 2 * 26 / 256;
}

// 装備の物理ダメージ上限(%)
exports.PhysicalDamageLimit = function () {
    return 0;
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
    return 30;
}

// マスター武器の倍撃
// マスター武器をメインに装備している場合にのみ設定
// 発生確率
exports.xN_SU5 = function () {
    return 0;
}

// ダブルアタックダメージアップ
exports.DA_DamageUp = function () {
    if (this.n_equipset == 0) {
        return 31
    } else {
        return 20
    }
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
    if (this.n_equipset == 0) {
        // ギフト
        return (3); 
    } else {
        // 耳 + マント + ギフト
        return 3 + 10 + (3);
    }
}

// WSダメージアップ:竜の特性
exports.WS_DamageUp2 = function () {
    return 0;
}

// WSダメージアップ:RMEAやアンバス武器
// 引数のWS毎の対応で返却
exports.WS_DamageUp3 = function (name) {
    if (name == "ウッコフューリー") {
        return 10;
    }

    return 0;
}

// 使用する可能性のあるWS一覧
exports.WS_list = function () {
    return ["ウッコフューリー"];
}

// 使用するWS名
exports.WS = function () {
    return ["ウッコフューリー"];
}

// TPボーナス
// サブでも適用されるものはこちらに加算
exports.TP_Bonus = function () {
    return 0;
}

// ウェポンスキル使用時TPを消費しない
// 発生確率
exports.ウェポンスキル使用時TPを消費しない = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 0;
    }
}

// モクシャ
// モクシャI+IIの合計
exports.モクシャ = function () {
    return 0;
}

// スマイト
exports.スマイト = function () {
    return 20;
}

// ウトゥグリップ
// ウェポンスキルDEX補正+10
exports.equip_ウェポンスキルDEX補正 = function () {
    if (this.n_equipset == 0) {
        return 10;
    } else {
        return 10;
    }
}

exports.buff_ブラッドレイジ = function () {
    return 40
}

exports.buff_サベッジリ = function () {
    return 500
}

exports.buff_ウォークライ = function () {
    return 11.3
}

exports.buff_バーサク = function () {
    return 35.0
}

