exports.n_equipset = 0;

// プレイヤー名
exports.Name = function () {
    return "SCH1";
}

exports.Description = function () {
    return "ムサ/カタクリスム/物理攻撃装備";
}

// JOB
exports.JOB = function () {
    return "SCH/WAR";
}

// playerの各種ステータス
// 
// 関連するプロパティのメソッドのみplayer.jsと同じ名前実装
//
exports.STR = function () {
    if (this.n_equipset == 0) {
        return 92 + 164;
    } else {
        return 92 + 94;
    }
}

exports.DEX = function () {
    if (this.n_equipset == 0) {
        return 101 + 162;
    } else {
        return 101 + 82;
    }
}

exports.VIT = function () {
    if (this.n_equipset == 0) {
        return 93 + 95;
    } else {
        return 93 + 76;
    }
}

exports.AGI = function () {
    if (this.n_equipset == 0) {
        return 104 + 103;
    } else {
        return 104 + 85;
    }
}

exports.INT = function () {
    if (this.n_equipset == 0) {
        return 109 + 174;
    } else {
        return 109 + 256;
    }
}

exports.MND = function () {
    if (this.n_equipset == 0) {
        return 94 + 141;
    } else {
        return 94 + 153;
    }
}

exports.CHR = function () {
    if (this.n_equipset == 0) {
        return 101 + 138;
    } else {
        return 101 + 131;
    }
}

// メインのD値
exports.D = function () {
    return 276 + 11;
}

// 攻撃間隔
// 二刀流の場合はメイン＋サブの攻撃間隔
exports.AttackSpeed = function () {
    return 399;
}

exports.SubD = function () {
    return 0;
}

exports.Attack = function () {
    if (this.n_equipset == 0) {
        return 1111;
    } else {
        return 982;
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
        return 959;
    } else {
        return 833;
    }
}

exports.Accuracy = function () {
    if (this.n_equipset == 0) {
        return 1202;
    } else {
        return 922;
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
        return 580;
    } else {
        return 467;
    }
}

exports.MagicAttack = function () {
    if (this.n_equipset == 0) {
        return (33)
    } else {
        return 4 + 7 + 52 + (33 + 20) + 8 + 3 + 51 + 39 + (33);
    }
}

// ストアTP
exports.STP = function () {
    if (this.n_equipset == 0) {
        return 4 + 3 + 1 + 6 + 6 + 9 + (72 * 1.2); // クルケットカードのサムライロール11
    } else {
        return (72 * 1.2); // クルケットカードのサムライロール11
    }
}

exports.DA = function () {
    if (this.n_equipset == 0) {
        return (10) + 3 + 1 + 3 + 5 +10  + (15) // ファイターズロールは15
    } else {
        return (10) + (15) // ファイターズロールは15
    }
}

exports.TA = function () {
    if (this.n_equipset == 0) {
        return 2;
    } else {
        return 0;
    }
}

exports.QA = function () {
    if (this.n_equipset == 0) {
        return 2;
    } else {
        return 0;
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

// 追撃発動率
exports.Pursuit = function () {
    return 50;
}


// クリティカル
// 装備、支援を適用後の値
// ※DEX/AGI補正は含めない
// ※WSのクリティカル補正除く
exports.Critical = function () {
    if (this.n_equipset == 0) {
        return 10 + (5) ; 
    } else {
        return (5); 
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
        return (0)
    } else {
        return (0)
    }
}

// 連携ボーナス+
exports.SkillchainBonus = function () {
    return 0;
}

// 魔法ダメージ+
exports.魔法ダメージ = function () {
    if (this.n_equipset == 0) {
        return 310 + 21;
    } else {
        return 310 + 21 + 25 + 20;
    }
}

// アフィニティは簡易的に共通値を採用
// TODO:アフィニティの属性
exports.Affinity = function (element) {
    if (this.n_equipset == 0) {
        return (0)
    } else {
        return 28
    }
}

// 天候
// TODO:天候の属性
exports.天候曜日 = function (element) {
    return 0;
}

// 武器種
exports.WeaponType = function () {
    return "両手棍";
}

// サブ武器種
// グリップは対象外
exports.SubWeaponType = function () {
    return "";
}

// 魔法枠ヘイスト合計値
exports.MagicHaste = function () {
    //return 43.75;
    return 26.0+15.0;
}

// 装備枠ヘイスト合計値
// 装備枠ヘイストは26%でないとキャップしない
// これは装備品毎にMath.floor(10.24 * N)を実施しているため
exports.EquipHaste = function () {
    if (this.n_equipset == 0) {
        return Math.min(25,4 + 8 + 3 + 3 + (5+10))
    } else {
        return Math.min(25,3 + 3 + 5)
    }
}

// ヘイストサンバ
exports.SambaHaste = function () {
    if (this.n_equipset == 0) {
        return 0
    } else {
        return 0
    }
}

// 八双のヘイスト
exports.HassoHaste = function () {
    if (this.n_equipset == 0) {
        return 0
    } else {
        return 0
    }
}


// 特性のダメージ上限アップ
exports.DamageLimit = function () {
    return 0.1;
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
    if (this.n_equipset == 0) {
        return 0
    } else {
        return 0
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
        return 0; 
    } else {
        // マント
        return 10;
    }
}

// WSダメージアップ:竜の特性
exports.WS_DamageUp2 = function () {
    return 0;
}

// WSダメージアップ:RMEAやアンバス武器
// 引数のWS毎の対応で返却
exports.WS_DamageUp3 = function (name) {
    return 0;
}

// 使用する可能性のあるWS一覧
exports.WS_list = function () {
    return ["カタクリスム"];
}

// 使用するWS名
exports.WS = function () {
    return ["カタクリスム"];
}

// TPボーナス
// サブでも適用されるものはこちらに加算
exports.TP_Bonus = function () {
    if (this.n_equipset == 0) {
        return 0;
    } else {
        return 250;
    }
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
    return 20;
}
