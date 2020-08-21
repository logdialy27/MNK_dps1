// 食事の効果

// 攻撃力にはバーサクやスマイト枠の補正が必要だが未対応
// STRやDEXによる攻撃、命中も反映されないので攻撃や命中自体に加算する必要がある
// この設定では誤差の範囲なので未加算

// ブドウ大福=1
var food_no = 0;

exports.set = function (name) {
    if (name == "ブドウ大福") {
        food_no = 1;
    } else {
        food_no = 0;
    }
}

exports.STR = function () {
    switch (food_no) {
        case 1:
            return 2;
    }
    return 0;
}

exports.DEX = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.VIT = function () {
    switch (food_no) {
        case 1:
            return 3;
    }
    return 0;
}

exports.AGI = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.INT = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.MND = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.CHR = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.HP = function () {
    switch (food_no) {
        case 1:
            return 20;
    }
    return 0;
}

exports.MP = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.Attack = function () {
    switch (food_no) {
        case 1:
            return 50;
    }
    return 0;
}

exports.SubAttack = function () {
    switch (food_no) {
        case 1:
            return 50;
    }
    return 0;
}

exports.RangedAttack = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.Defense = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.Accuracy = function () {
    switch (food_no) {
        case 1:
            return 80;
    }
    return 0;
}

exports.SubAccuracy = function () {
    switch (food_no) {
        case 1:
            return 80;
    }
    return 0;
}

exports.RangedAccuracy = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.MagicAttack = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.MagicAccuracy = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.Evasion = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.MagicEvasion = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.STP = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}

exports.DA = function () {
    switch (food_no) {
        case 1:
            return 0;
    }
    return 0;
}