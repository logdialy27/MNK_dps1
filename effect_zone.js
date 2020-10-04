// エリアの効果
// イオニス、サンクション、神符等

// 攻撃力にはバーサクやスマイト枠の補正が必要だが未対応

// イオニス=1
var zone_no = 0

exports.set = function (name) {
    if (name == "イオニス") {
        zone_no = 1;
    } else {
        zone_no = 0;
    }
}

exports.STR = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.DEX = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.VIT = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.AGI = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.INT = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.MND = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.CHR = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.HP = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.MP = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.Attack = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.SubAttack = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.RangedAttack = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.Defense = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.Accuracy = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.SubAccuracy = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.RangedAccuracy = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.MagicAttack = function () {
    switch (zone_no) {
        case 1:
            return 5;
    }
    return 0;
}

exports.MagicAccuracy = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.Evasion = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.MagicEvasion = function () {
    switch (zone_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.Critical = function () {
    switch (zone_no) {
        case 1:
            return 3;
    }
    return 0;
}

exports.SubCritical = function () {
    switch (zone_no) {
        case 1:
            return 3;
    }
    return 0;
}

exports.RangedCritical = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.被ダメージ = function () {
    switch (zone_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.セーブTP = function () {
    switch (zone_no) {
        case 1:
            return 100;
    }
    return 0;
}