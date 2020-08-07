
var n_skillchain_elements = null;

exports.down_elements = function (e)
{
    n_skillchain_elements = e.concat();
}

// 定義実態jsのロード
var impl = null;

// 対象名
exports.Load = function (name) {
    try {
        impl = require("./enemy_" + name);
    } catch (err) {
        impl = {};
    }
}

exports.Name = function () {
    if (impl.Name) {
        return impl.Name();
    } else {
        return "回避1/防御1/VIT1/AGI1";
    }
}

// 対象のレベル
exports.LV = function () {
    if (impl.LV) {
        return impl.LV();
    } else {
        return 122;
    }
}

//メインジョブ
exports.job = function () {
    if (impl.job) {
        return impl.job();
    } else {
        return "RDM";
    }
}

// サポートジョブ
exports.sjob = function () {
    if (impl.sjob) {
        return impl.sjob();
    } else {
        return "RDM";
    }
}

exports.Defence = function () {
    if (impl.Defence) {
        return impl.Defence();
    } else {
        return 1;
    }
}

exports.STR = function () {
    if (impl.STR) {
        return impl.STR();
    } else {
        return 1;
    }
}

exports.DEX = function () {
    if (impl.DEX) {
        return impl.DEX();
    } else {
        return 1;
    }
}

exports.VIT = function () {
    if (impl.VIT) {
        return impl.VIT();
    } else {
        return 1;
    }
}

exports.AGI = function () {
    if (impl.AGI) {
        return impl.AGI();
    } else {
        return 9999;
    }
}

exports.INT = function () {
    if (impl.INT) {
        return impl.INT();
    } else {
        return 1;
    }
}

exports.MND = function () {
    if (impl.MND) {
        return impl.MND();
    } else {
        return 1;
    }
}

exports.CHR = function () {
    if (impl.CHR) {
        return impl.CHR();
    } else {
        return 1;
    }
}

// 回避
exports.Evasion = function () {
    if (impl.Evasion) {
        return impl.Evasion();
    } else {
        return 1;
    }
}

// バ系で増加やスレノディで対象となる属性耐性
exports.属性耐性1 = function (e) {
    if (impl.属性耐性1) {
        return impl.属性耐性1(e);
    } else {
        return 0;
    }
}

// 連携や魔法ダメージに関する属性耐性
// レイクや属性耐性低下前の基本値
exports.属性耐性2 = function (e) {
    if (impl.属性耐性2) {
        return impl.属性耐性2(e);
    } else {
        return 100;
    }
}



// ガンビットが入っている属性一覧
// 複数の同じルーンが入っている場合は複数記載
exports.ガンビット = function () {
    if (impl.ガンビット) {
        return impl.ガンビット();
    } else {
        return [];
        //return ["火", "氷", "風", "土", "雷", "水", "光", "闇"];
    }
}

// レイクが入っている属性一覧
exports.レイク = function () {
    if (impl.レイク) {
        return impl.レイク();
    } else {
        return [];
        //return ["火", "氷", "風", "土", "雷", "水", "光", "闇"];
    }
}

// 簡易文字列化
exports.toString = function () {
    var ret = {}

    ret["Name"] = this.Name();
    ret["STR"] = this.STR();
    ret["DEX"] = this.DEX();
    ret["VIT"] = this.VIT();
    ret["AGI"] = this.AGI();
    ret["INT"] = this.INT();
    ret["MND"] = this.MND();
    ret["CHR"] = this.CHR();
    ret["防御"] = this.Defence();
    ret["回避"] = this.Evasion();

    return JSON.stringify(JSON.stringify(ret));
}


exports.debuff_耐性ダウン = function (e, skillchain_done) {
    var down = 0;

    var t1 = this.レイク();
    for (var i = 0; i < t1.length; ++i) {
        if (e = t1[i]) {
            down += 1;
        }
    }

    if (this.n_skillchain_elements) {
        var t2 = this.n_skillchain_elements;
        for (var i = 0; i < t2.length; ++i) {
            if (e = t2[i]) {
                down += 1;
            }
        }
    }

    return down;
}
