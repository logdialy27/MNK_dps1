
const tsv = {};

exports.Load = function (name) {

    const parse = require('csv-parse/lib/sync');
    const fs = require('fs');

    var text = fs.readFileSync("./input1.csv", 'utf8');
     
    var records = parse(text, {
        delimiter: ',',
        rowDelimiter: 'auto',
        quote: '"',
        escape: '"',
        columns: null,
        comment: null,
        skip_empty_line: false,
        trim: true,
        bom: true
    });

    for (var y = 0; y < records.length; ++y) {
        var k = records[y][2];
        tsv[k] = {};
        for (var x = 3; x < records[y].length; ++x) {
            tsv[k][x] = records[y][x];
        }
    }
       
    return;
}

exports.Name = function () {
    if (tsv.Name && tsv.Name[this.n_equipset]) {
        return tsv.Name[this.n_equipset];
    } else {
        return "XXX/XXX";
    }
}

// 装備セット番号
// この番号を参照し装備に対応する返却値を調節する
exports.n_equipset = 0;

exports.STR = function () {
    if (tsv.STR && tsv.STR[this.n_equipset]) {
        return tsv.STR[this.n_equipset];
    } else {
        return 1;
    }
}

exports.DEX = function () {
    if (tsv.DEX && tsv.DEX[this.n_equipset]) {
        return tsv.DEX[this.n_equipset];
    } else {
        return 1;
    }
}

exports.VIT = function () {
    if (tsv.VIT && tsv.VIT[this.n_equipset]) {
        return tsv.VIT[this.n_equipset];
    } else {
        return 1;
    }
}

exports.AGI = function () {
    if (tsv.AGI && tsv.AGI[this.n_equipset]) {
        return tsv.AGI[this.n_equipset];
    } else {
        return 1;
    }
}

exports.INT = function () {
    if (tsv.INT && tsv.INT[this.n_equipset]) {
        return tsv.INT[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MND = function () {
    if (tsv.MND && tsv.MND[this.n_equipset]) {
        return tsv.MND[this.n_equipset];
    } else {
        return 1;
    }
}

exports.CHR = function () {
    if (tsv.CHR && tsv.CHR[this.n_equipset]) {
        return tsv.CHR[this.n_equipset];
    } else {
        return 1;
    }
}

exports.HP = function () {
    if (tsv.HP && tsv.HP[this.n_equipset]) {
        return tsv.HP[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MP = function () {
    if (tsv.MP && tsv.MP[this.n_equipset]) {
        return tsv.MP[this.n_equipset];
    } else {
        return 1;
    }
}

exports.D = function () {
    if (tsv.D && tsv.D[this.n_equipset]) {
        return tsv.D[this.n_equipset];
    } else {
        return 1;
    }
}

exports.AttackSpeed = function () {
    if (tsv.AttackSpeed && tsv.AttackSpeed[this.n_equipset]) {
        return tsv.AttackSpeed[this.n_equipset];
    } else {
        return 1;
    }
}

exports.SubD = function () {
    if (tsv.SubD && tsv.SubD[this.n_equipset]) {
        return tsv.SubD[this.n_equipset];
    } else {
        return 1;
    }
}

exports.素手D = function () {
    if (tsv.素手D && tsv.素手D[this.n_equipset]) {
        return tsv.素手D[this.n_equipset];
    } else {
        return 1;
    }
}

exports.KickD = function () {
    if (tsv.KickD && tsv.KickD[this.n_equipset]) {
        return tsv.KickD[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Attack = function () {
    if (tsv.Attack && tsv.Attack[this.n_equipset]) {
        return tsv.Attack[this.n_equipset];
    } else {
        return 1;
    }
}

exports.SubAttack = function () {
    if (tsv.SubAttack && tsv.SubAttack[this.n_equipset]) {
        return tsv.SubAttack[this.n_equipset];
    } else {
        return 1;
    }
}

exports.RangedAttack = function () {
    if (tsv.RangedAttack && tsv.RangedAttack[this.n_equipset]) {
        return tsv.RangedAttack[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Defense = function () {
    if (tsv.Defense && tsv.Defense[this.n_equipset]) {
        return tsv.Defense[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Accuracy = function () {
    if (tsv.Accuracy && tsv.Accuracy[this.n_equipset]) {
        return tsv.Accuracy[this.n_equipset];
    } else {
        return 1;
    }
}

exports.SubAccuracy = function () {
    if (tsv.SubAccuracy && tsv.SubAccuracy[this.n_equipset]) {
        return tsv.SubAccuracy[this.n_equipset];
    } else {
        return 1;
    }
}

exports.RangedAccuracy = function () {
    if (tsv.RangedAccuracy && tsv.RangedAccuracy[this.n_equipset]) {
        return tsv.RangedAccuracy[this.n_equipset];
    } else {
        return 1;
    }
}

exports.RangedD = function () {
    if (tsv.RangedD && tsv.RangedD[this.n_equipset]) {
        return tsv.RangedD[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MagicAttack = function () {
    if (tsv.MagicAttack && tsv.MagicAttack[this.n_equipset]) {
        return tsv.MagicAttack[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MagicAccuracy = function () {
    if (tsv.MagicAccuracy && tsv.MagicAccuracy[this.n_equipset]) {
        return tsv.MagicAccuracy[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MagicDefense = function () {
    if (tsv.MagicDefense && tsv.MagicDefense[this.n_equipset]) {
        return tsv.MagicDefense[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Evasion = function () {
    if (tsv.Evasion && tsv.Evasion[this.n_equipset]) {
        return tsv.Evasion[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MagicEvasion = function () {
    if (tsv.MagicEvasion && tsv.MagicEvasion[this.n_equipset]) {
        return tsv.MagicEvasion[this.n_equipset];
    } else {
        return 1;
    }
}

// ストアTP
exports.STP = function () {
    if (tsv.STP && tsv.STP[this.n_equipset]) {
        return tsv.STP[this.n_equipset];
    } else {
        return 1;
    }
}

exports.DA = function () {
    if (tsv.DA && tsv.DA[this.n_equipset]) {
        return tsv.DA[this.n_equipset];
    } else {
        return 1;
    }
}

exports.TA = function () {
    if (tsv.TA && tsv.TA[this.n_equipset]) {
        return tsv.TA[this.n_equipset];
    } else {
        return 1;
    }
}

exports.QA = function () {
    if (tsv.QA && tsv.QA[this.n_equipset]) {
        return tsv.QA[this.n_equipset];
    } else {
        return 1;
    }
}

// ミシックのAM3
// 状態をtrue or falseで返却
exports.MythicAM3 = function () {
    if (tsv.MythicAM3 && tsv.MythicAM3[this.n_equipset]) {
        return tsv.MythicAM3[this.n_equipset];
    } else {
        return 1;
    }
}

exports.複数回攻撃 = function () {
    if (tsv.複数回攻撃 && tsv.複数回攻撃[this.n_equipset]) {
        return tsv.複数回攻撃[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Sub複数回攻撃 = function () {
    if (tsv.Sub複数回攻撃 && tsv.Sub複数回攻撃[this.n_equipset]) {
        return tsv.Sub複数回攻撃[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Pursuit = function () {
    if (tsv.Pursuit && tsv.Pursuit[this.n_equipset]) {
        return tsv.Pursuit[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Daken = function () {
    if (tsv.Daken && tsv.Daken[this.n_equipset]) {
        return tsv.Daken[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Kick = function () {
    if (tsv.Kick && tsv.Kick[this.n_equipset]) {
        return tsv.Kick[this.n_equipset];
    } else {
        return 1;
    }
}

exports.Critical = function () {
    if (tsv.Critical && tsv.Critical[this.n_equipset]) {
        return tsv.Critical[this.n_equipset];
    } else {
        return 1;
    }
}

exports.SubCritical = function () {
    if (tsv.SubCritical && tsv.SubCritical[this.n_equipset]) {
        return tsv.SubCritical[this.n_equipset];
    } else {
        return 1;
    }
}

exports.RangedCritical = function () {
    if (tsv.RangedCritical && tsv.RangedCritical[this.n_equipset]) {
        return tsv.RangedCritical[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MagicCritical = function () {
    if (tsv.MagicCritical && tsv.MagicCritical[this.n_equipset]) {
        return tsv.MagicCritical[this.n_equipset];
    } else {
        return 1;
    }
}

exports.MagicCriticalDamage = function () {
    if (tsv.MagicCriticalDamage && tsv.MagicCriticalDamage[this.n_equipset]) {
        return tsv.MagicCriticalDamage[this.n_equipset];
    } else {
        return 1;
    }
}

exports.CriticalDown = function () {
    if (tsv.CriticalDown && tsv.CriticalDown[this.n_equipset]) {
        return tsv.CriticalDown[this.n_equipset];
    } else {
        return 1;
    }
}

exports.CriticalDamage = function () {
    if (tsv.CriticalDamage && tsv.CriticalDamage[this.n_equipset]) {
        return tsv.CriticalDamage[this.n_equipset];
    } else {
        return 1;
    }
}

exports.SkillchainBonus = function () {
    if (tsv.SkillchainBonus && tsv.SkillchainBonus[this.n_equipset]) {
        return tsv.SkillchainBonus[this.n_equipset];
    } else {
        return 1;
    }
}

exports.魔法ダメージ = function () {
    if (tsv.魔法ダメージ && tsv.魔法ダメージ[this.n_equipset]) {
        return tsv.魔法ダメージ[this.n_equipset];
    } else {
        return 1;
    }
}

function getElementIdx(n) {
    // TODO:
    return 0;
}

exports.Affinity = function (element) {
    if (tsv.Affinity && tsv.Affinity[this.n_equipset]) {
        return tsv.Affinity[this.n_equipset][getElementIdx(element)];
    } else {
        return 1;
    }
}

exports.天候曜日 = function (element) {
    if (tsv.天候曜日 && tsv.天候曜日[this.n_equipset]) {
        return tsv.天候曜日[this.n_equipset][getElementIdx(element)];
    } else {
        return 1;
    }
}

exports.属性杖 = function (element) {
    if (tsv.属性杖 && tsv.属性杖[this.n_equipset]) {
        return tsv.属性杖[this.n_equipset][getElementIdx(element)];
    } else {
        return 1;
    }
}

exports.虚誘 = function (element) {
    if (tsv.虚誘 && tsv.虚誘[this.n_equipset]) {
        return tsv.虚誘[this.n_equipset][getElementIdx(element)];
    } else {
        return 1;
    }
}

exports.WeaponType = function () {
    if (tsv.WeaponType && tsv.WeaponType[this.n_equipset]) {
        return tsv.WeaponType[this.n_equipset];
    } else {
        return "片手剣";
    }
}

exports.SubWeaponType = function () {
    if (tsv.SubWeaponType && tsv.SubWeaponType[this.n_equipset]) {
        return tsv.SubWeaponType[this.n_equipset];
    } else {
        return "片手剣";
    }
}

exports.DualWield = function () {
    // 特性と装備
    return (1.00 - this.DualWield_特性()) * 100 + this.DualWield_装備();
}

exports.DualWield_特性 = function () {
    if (tsv.DualWield_特性 && tsv.DualWield_特性[this.n_equipset]) {
        return tsv.DualWield_特性[this.n_equipset];
    } else {
        return 1.00;
    }
}

exports.DualWield_装備 = function () {
    if (tsv.DualWield_装備 && tsv.DualWield_装備[this.n_equipset]) {
        return tsv.DualWield_装備[this.n_equipset];
    } else {
        return 0;
    }
}

exports.MagicHaste = function () {
    if (tsv.MagicHaste && tsv.MagicHaste[this.n_equipset]) {
        return tsv.MagicHaste[this.n_equipset];
    } else {
        return 0;
    }
}

exports.EquipHaste = function () {
    if (tsv.EquipHaste && tsv.EquipHaste[this.n_equipset]) {
        return tsv.EquipHaste[this.n_equipset];
    } else {
        return 0;
    }
}

exports.SambaHaste = function () {
    if (tsv.SambaHaste && tsv.SambaHaste[this.n_equipset]) {
        return tsv.SambaHaste[this.n_equipset];
    } else {
        return 0;
    }
}

exports.HassoHaste = function () {
    if (tsv.HassoHaste && tsv.HassoHaste[this.n_equipset]) {
        return tsv.HassoHaste[this.n_equipset];
    } else {
        return 0;
    }
}

exports.LastResortHaste = function () {
    if (tsv.LastResortHaste && tsv.LastResortHaste[this.n_equipset]) {
        return tsv.LastResortHaste[this.n_equipset];
    } else {
        return 0;
    }
}

exports.MartialArts = function () {
    if (tsv.MartialArts && tsv.MartialArts[this.n_equipset]) {
        return tsv.MartialArts[this.n_equipset];
    } else {
        return 0;
    }
}

exports.BlitzersRoll = function () {
    if (tsv.BlitzersRoll && tsv.BlitzersRoll[this.n_equipset]) {
        return tsv.BlitzersRoll[this.n_equipset];
    } else {
        return 0;
    }
}

exports.Regist = function (n) {
    if (tsv.Regist && tsv.Regist[this.n_equipset]) {
        return tsv.Regist[this.n_equipset][getElementIdx(n)];
    } else {
        return 0;
    }
}

exports.DamageLimit = function () {
    if (tsv.Regist && tsv.DamageLimit[this.n_equipset]) {
        return tsv.DamageLimit[this.n_equipset];
    } else {
        return 0;
    }
}

exports.PhysicalDamageLimit = function () {
    if (tsv.PhysicalDamageLimit && tsv.PhysicalDamageLimit[this.n_equipset]) {
        return tsv.PhysicalDamageLimit[this.n_equipset];
    } else {
        return 0;
    }
}

exports.xN_Relic = function () {
    if (tsv.xN_Relic && tsv.xN_Relic[this.n_equipset]) {
        return tsv.xN_Relic[this.n_equipset];
    } else {
        return 0;
    }
}

exports.xN_Empyrean = function () {
    if (tsv.xN_Empyrean && tsv.xN_Empyrean[this.n_equipset]) {
        return tsv.xN_Empyrean[this.n_equipset];
    } else {
        return 0;
    }
}

exports.xN_SU5 = function () {
    if (tsv.xN_SU5 && tsv.xN_SU5[this.n_equipset]) {
        return tsv.xN_SU5[this.n_equipset];
    } else {
        return 0;
    }
}

exports.DA_DamageUp = function () {
    if (tsv.DA_DamageUp && tsv.DA_DamageUp[this.n_equipset]) {
        return tsv.DA_DamageUp[this.n_equipset];
    } else {
        return 0;
    }
}

exports.TA_DamageUp = function () {
    if (tsv.TA_DamageUp && tsv.TA_DamageUp[this.n_equipset]) {
        return tsv.TA_DamageUp[this.n_equipset];
    } else {
        return 0;
    }
}

exports.WS_DamageUp0 = function () {
    if (tsv.WS_DamageUp0 && tsv.WS_DamageUp0[this.n_equipset]) {
        return tsv.WS_DamageUp0[this.n_equipset];
    } else {
        return 0;
    }
}

exports.WS_DamageUp1 = function () {
    if (tsv.WS_DamageUp1 && tsv.WS_DamageUp1[this.n_equipset]) {
        return tsv.WS_DamageUp1[this.n_equipset];
    } else {
        return 0;
    }
}

exports.WS_DamageUp2 = function () {
    if (tsv.WS_DamageUp2 && tsv.WS_DamageUp2[this.n_equipset]) {
        return tsv.WS_DamageUp2[this.n_equipset];
    } else {
        return 0;
    }
}

exports.WS_DamageUp3 = function (name) {
    if (tsv.WS_DamageUp3 && tsv.WS_DamageUp3[this.n_equipset]) {
        return tsv.WS_DamageUp3[this.n_equipset];
    } else {
        return 0;
    }
}

exports.WS_list = function () {
    if (tsv.WS_list && tsv.WS_list[this.n_equipset]) {
        return [tsv.WS_list[this.n_equipset]];
    } else {
        return [];
    }
}

exports.WS = function () {
    if (tsv.WS && tsv.WS[this.n_equipset]) {
        return tsv.WS[this.n_equipset];
    } else {
        return "ビクトリースマイト";
    }
}

exports.TP_Bonus = function () {
    if (tsv.TP_Bonus && tsv.TP_Bonus[this.n_equipset]) {
        return tsv.TP_Bonus[this.n_equipset];
    } else {
        return 0;
    }
}

exports.RangedTP_Bonus = function () {
    if (tsv.RangedTP_Bonus && tsv.RangedTP_Bonus[this.n_equipset]) {
        return tsv.RangedTP_Bonus[this.n_equipset];
    } else {
        return 0;
    }
}

exports.エン = function () {
    if (tsv.エン && tsv.エン[this.n_equipset]) {
        return tsv.エン[this.n_equipset];
    } else {
        return 0;
    }
}

exports.Subエン = function () {
    if (tsv.Subエン && tsv.Subエン[this.n_equipset]) {
        return tsv.Subエン[this.n_equipset];
    } else {
        return 0;
    }
}

exports.エンII = function () {
    if (tsv.エンII && tsv.エンII[this.n_equipset]) {
        return tsv.エンII[this.n_equipset];
    } else {
        return 0;
    }
}

exports.エン属性 = function () {
    if (tsv.エン属性 && tsv.エン属性[this.n_equipset]) {
        return tsv.エン属性[this.n_equipset];
    } else {
        return ["火", "氷", "風", "土", "雷", "水", "光", "闇"];
    }
}

exports.エン仮レジスト = function () {
    if (tsv.エン仮レジスト && tsv.エン仮レジスト[this.n_equipset]) {
        return tsv.エン仮レジスト[this.n_equipset];
    } else {
        return [100, 0, 0, 0];
    }
}

exports.EnspellDamageUp = function () {
    if (tsv.EnspellDamageUp && tsv.EnspellDamageUp[this.n_equipset]) {
        return tsv.EnspellDamageUp[this.n_equipset];
    } else {
        return 0;
    }
}

exports.SubEnspellDamageUp = function () {
    if (tsv.SubEnspellDamageUp && tsv.SubEnspellDamageUp[this.n_equipset]) {
        return tsv.EnspellDamageUp[this.n_equipset];
    } else {
        return 0;
    }
}

exports.ウェポンスキル使用時TPを消費しない = function () {
    if (tsv.ウェポンスキル使用時TPを消費しない && tsv.ウェポンスキル使用時TPを消費しない[this.n_equipset]) {
        return tsv.ウェポンスキル使用時TPを消費しない[this.n_equipset];
    } else {
        return 0;
    }
}

exports.モクシャ = function () {
    if (tsv.モクシャ && tsv.モクシャ[this.n_equipset]) {
        return tsv.モクシャ[this.n_equipset];
    } else {
        return 0;
    }
}

exports.セーブTP = function () {
    if (tsv.セーブTP && tsv.セーブTP[this.n_equipset]) {
        return tsv.セーブTP[this.n_equipset];
    } else {
        return 0;
    }
}

exports.コンサーブTP = function () {
    if (tsv.コンサーブTP && tsv.コンサーブTP[this.n_equipset]) {
        return tsv.コンサーブTP[this.n_equipset];
    } else {
        return 0;
    }
}

exports.buff_インピタス = function () {
    if (tsv.buff_インピタス && tsv.buff_インピタス[this.n_equipset]) {
        return tsv.buff_インピタス[this.n_equipset];
    } else {
        return 0;
    }
}

exports.equip_インピタス性能アップ = function () {
    if (tsv.equip_インピタス性能アップ && tsv.equip_インピタス性能アップ[this.n_equipset]) {
        return tsv.equip_インピタス性能アップ[this.n_equipset];
    } else {
        return 0;
    }
}

exports.equip_クリティカルヒット時TP = function () {
    if (tsv.equip_クリティカルヒット時TP) {
        return tsv.equip_クリティカルヒット時TP();
    } else {
        return 0;
    }
}

exports.equip_クリティカルヒット時ストアTP = function () {
    if (tsv.equip_クリティカルヒット時ストアTP) {
        return tsv.equip_クリティカルヒット時ストアTP();
    } else {
        return 0;
    }
}
