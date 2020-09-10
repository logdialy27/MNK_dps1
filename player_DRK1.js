﻿exports.n_equipset = 0;

// プレイヤー名
exports.Name = function () {
    return "DRK1";
}

exports.Description = function () {
    return "トアクリーバー/ザルフィカール/育成中装備";
}

// JOB
exports.JOB = function () {
    return "DRK/WAR";
}

// playerの各種ステータス
// 
// 関連するプロパティのメソッドのみplayer.jsと同じ名前実装
//
exports.STR = function () {
    if (this.n_equipset == 0) {
        return 106+162;
    } else {
        return 106 + 162;
    }
}

exports.DEX = function () {
    if (this.n_equipset == 0) {
        return 104 + 213;
    } else {
        return 104 + 213;
    }
}

exports.VIT = function () {
    if (this.n_equipset == 0) {
        return 99 + 128;
    } else {
        return 99+128;
    }
}

exports.AGI = function () {
    if (this.n_equipset == 0) {
        return 104 + 86;
    } else {
        return 104 + 86;
    }
}

exports.INT = function () {
    if (this.n_equipset == 0) {
        return 107 + 69;
    } else {
        return 107 + 69;
    }
}

exports.MND = function () {
    if (this.n_equipset == 0) {
        return 91 + 113;
    } else {
        return 91+114;
    }
}

exports.CHR = function () {
    if (this.n_equipset == 0) {
        return 85 + 78;
    } else {
        return 85 + 78;
    }
}

// メインのD値
exports.D = function () {
    return 297 + 14;
}

// 攻撃間隔
// 二刀流の場合はメイン＋サブの攻撃間隔
exports.AttackSpeed = function () {
    return 504;
}

exports.SubD = function () {
    return 0;
}

exports.Attack = function () {
    if (this.n_equipset == 0) {
        return 1819;
    } else {
        return 1819;
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
        return 1162;
    } else {
        return 1162;
    }
}

exports.Accuracy = function () {
    if (this.n_equipset == 0) {
        return 1381;
    } else {
        return 1390;
    }
}

exports.SubAccuracy = function () {
    if (this.n_equipset == 0) {
        return 1204;
    } else {
        return 1204;
    }
}

exports.Evasion = function () {
    return 688;
}

// ストアTP
exports.STP = function () {
    if (this.n_equipset == 0) {
        return 30 + 5 + 7 + 1 + 7 + 5 + 7;
    } else{
        return 30 + 5 + 7 + 7 + 5 + 7;
    }
}

exports.DA = function () {
    if (this.n_equipset == 0) {
        return (10) + 5 + 3 + 10 + 3;
    } else {
        return (10) + 3 + 3;
    }
}

exports.TA = function () {
    if (this.n_equipset == 0) {
        return (5) + 4 + 4 + 4 + 3 + 2 + 3 + 6;
    } else {
        return (5) + 4 + 3 + 3 + 6;
    }
}

exports.QA = function () {
    if (this.n_equipset == 0) {
        return 3 + 2;
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
        return 5 + 5 + 4 + (5); // メリポ(5)
    } else {
        return 5 + 5 + 5 + 2 + 10 + (5); // メリポ(5)
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
        return 0
    } else {
        return 0
    }
}

// 連携ボーナス+
exports.SkillchainBonus = function () {
    return 0;
}

// 魔法ダメージ+
exports.魔法ダメージ = function(){
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
    return "両手剣";
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
exports.EquipHaste = function () {
    //return 25.0;
    if (this.n_equipset == 0) {
        return Math.min(25,(4 + 8 + 4 + 5 + 6 + 4));
    } else {
        return Math.min(25,(4 +8 + 4 + 5 + 6 + 4));
    }
}


// 八双のヘイスト
exports.HassoHaste = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 0;
    }
}
// ラストリゾートのヘイスト
exports.LastResortHaste = function () {
    if (this.n_equipset == 0) {
        return 25;
    } else {
        return 25;
    }
}


// 特性のダメージ上限アップ
exports.DamageLimit = function () {
    return 5 * 26/256;
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
    return 0;
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
    if (name == "トアクリーバー") {
        return 0;
    }

    return 0;
}

// 使用する可能性のあるWS一覧
exports.WS_list = function () {
    return ["トアクリーバー"];
}

// 使用するWS名
exports.WS = function () {
    return ["トアクリーバー"];
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

// ウトゥグリップ
// ウェポンスキルDEX補正+10
exports.equip_ウェポンスキルDEX補正 = function () {
    if (this.n_equipset == 0) {
        return 10;
    } else {
        return 10;
    }
}