const logic = require("./logic");
const enemy = require("./enemy");
const setting = require("./setting");


const table_ws = {
    "シャンデュシニュ": ws_シャンデュシニュ,
    "ビクトリースマイト": ws_ビクトリースマイト,
    "ウッコフューリー": ws_ウッコフューリー,
    "トアクリーバー": ws_トアクリーバー,

};

exports.ws = function (name,player,line) {

    if (table_ws[name]) {
        return table_ws[name](player, line);
    } else {
        return [0,0];
    }
}

//  WSのシャンデュシニュのTPクリティカル修正のテーブル
const table_TP_シャンデュシニュ =
[
    { min: 1000, max: 2000, v: function (tp) { return 15 + 10 * (tp - 1000)/1000; } },
    { min: 2000, max: 3000, v: function (tp) { return 25 + 15 * (tp - 2000)/1000; } },
    { min: 3000, max: 3000, v : function (tp) { return 40; } },
];

// WSのシャンデュシニュ
function ws_シャンデュシニュ(player, line_p) {

    // ヒット数を確定
    // 多段WSのマルチ判定は初段と2段目のみ

    // シャンデュシニュ
    // 3回攻撃
    // 1.625(全段)
    // DEX80 %
    // 属性ゴルゲ全段適用

    // ヒット数は3回が確定
    // 二刀流で+1も確定
    // 1と2でマルチ判定
    // WSはマルチ追加分は別リストにしておいて、末尾に追加する。
    // これは8回でふるい落とされるのはマルチ分になるようにするため
    var line = line_p;

    var list = [];

    // 作業用リスト
    var list1 = []; // WSの固定分とサブ
    var list2 = []; // マルチ

    // WS実行のTP計算
    var execTP = logic.addTP(player.n_TP, player.TP_Bonus());
    // クリティカルヒット率修正
    var C_add = 15;

    for (var i = 0; i < table_TP_シャンデュシニュ.length; ++i) {
        var t = table_TP_シャンデュシニュ[i];

        if (logic.contains(execTP, t.min, t.max)) {
            C_add = t.v(execTP);
            break;
        }
    }

    // [1] [サブ] [2] [3] + マルチの順

    // [1] マルチ判定実施
    {
        var attack = player.Attack();
        var acc = player.Accuracy();
        var D = player.D();
        var wt = player.WeaponType();
        var critcal = player.Critical() + C_add;

        // シャンデュシニュは全段1.625で属性ゴルゲも全段適用なので最初に計算
        var xN = 1.625;
        xN += player.WS_DamageUp0();

        if (logic.rand(player.QA())) {
            // QA判定
            

            list1.push({
                "QA": true, // QA
                "C": critcal, 
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 4; ++i) {
                list2.push({
                    "QA": true, // QA
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            list1.push({
                "TA": true, // TA・・TAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 3; ++i) {
                list2.push({
                    "TA": true, // TA・・TAダメージアップのために必要
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            list1.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 2; ++i) {
                list2.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (player.MythicAM3()) {
            // ミシックAM3
            var count = logic.MythicAM3(player, line);
            list1.push({
                "MythicAM3": true,
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < count; ++i) {
                list2.push({
                    "MythicAM3": true,
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            list1.push({
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    }

    // [サブ] サブウェポン
    // サブの場合は攻撃,命中,Dがサブの値を取得
    if (player.SubWeaponType() != "") {
        var critcal = player.SubCritical() + C_add;

        list1.push({
            "C": critcal,
            "xN": xN,
            "attack": player.SubAttack(),
            "acc": player.SubAccuracy(),
            "D": player.SubD(),
            "wt": wt,
            "sub": true, // サブウェポン
        });
    }

    // [2] マルチ判定実施
    {
        var attack = player.Attack();
        var acc = player.Accuracy();
        var D = player.D();
        var wt = player.WeaponType();
        var critcal = player.Critical() + C_add;

        if (logic.rand(player.QA())) {
            // QA判定
            

            list1.push({
                "QA": true, // QA
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 4; ++i) {
                list2.push({
                    "QA": true, // QA
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            list1.push({
                "TA": true, // TA・・・TAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 3; ++i) {
                list2.push({
                    "TA": true, // TA・・・TAダメージアップのために必要
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            list1.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 2; ++i) {
                list2.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (setting.MythicAM3のWS適用x2() && player.MythicAM3()) {
            // 二段目にもミシックAM3を適用する場合
            var count = logic.MythicAM3(player, line);

            list1.push({
                "MythicAM3": true,
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < count; ++i) {
                list2.push({
                    "MythicAM3": true,
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            list1.push({
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    }

    // [3] マルチ判定なし
    {
        var critcal = player.Critical() + C_add;

        list1.push({
            "C": critcal,
            "xN": xN,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });
    }

    // リストを結合[0]～[7]までが有効
    list = list1.concat(list2);

    // 修正項目
    // 修正項目は全段適用なので最初に計算
    var BP_D = Math.floor(player.DEX() * 80 / 100);

    // 得TP
    var gain_TP = logic.get_得TP(player, line);

    // 得TPの合計
    var TP = 0;

    // ダメージ合計
    var dmg = 0;

    line["WS"] = [];

    for (i = 0; i < list.length && i < 8; ++i) {
        var line = {};
        var t = list[i];

        // 命中判定
        var hit = logic.命中判定(t.wt, t.sub, t.acc, player,enemy, line);

        if (!hit) {
            // ミス
            line["ミス"] = true;
        } else {
            // ヒット毎のダメージ計算
            var d = logic.WS_ダメージ計算(i, BP_D, t, player, enemy, line);
            dmg += d[0];
            if (i == 0) {
                TP += gain_TP;
            } else if (t.sub) {
                TP += gain_TP;
            } else {
                TP += logic.STP(10, player, line);
            }

            line["ダメージ"] = d[0];
            line["TP合計"] = gain_TP;

        }

        line_p["WS"].push(line);
    }

    // 得TPとダメージを返却する
    return [dmg,TP];

}

// WSのビクトリースマイトのTPクリティカル修正のテーブル
const table_TP_ビクトリースマイト =
    [
        { min: 1000, max: 2000, v: function (tp) { return 10 + 15 * (tp - 1000) / 1000; } },
        { min: 2000, max: 3000, v: function (tp) { return 25 + 20 * (tp - 2000) / 1000; } },
        { min: 3000, max: 3000, v: function (tp) { return 45; } },
    ];

function ws_ビクトリースマイト(player, line_p) {

    // ヒット数を確定
    // 多段WSのマルチ判定は初段と2段目のみ

    // ビクトリースマイト
    // 4回攻撃
    // 1.5(全段)
    // STR80 %
    // 属性ゴルゲ全段適用

    // 格闘は数え方が二刀流とは違っている
    // 4ヒット=メイン3+1
    // 1と2でマルチ判定
    // WSはマルチ追加分は別リストにしておいて末尾に追加する。
    // これは8回でふるい落とされるのはマルチ分になるようにするため

    var line = line_p;
    var list = [];

    // 作業用リスト
    var list1 = []; // WSの固定分
    var list2 = []; // マルチ

    // WS実行のTP計算
    var execTP = logic.addTP(player.n_TP, player.TP_Bonus()); 
    // クリティカルヒット率修正
    var C_add = 10;
    for (var i = 0; i < table_TP_ビクトリースマイト.length; ++i) {
        var t = table_TP_ビクトリースマイト[i];

        if (logic.contains(execTP, t.min, t.max)) {
            C_add = t.v(execTP);
            break;
        }
    }

    // [1] [格闘の片手] [2] [3] + マルチの順
    var attack = player.Attack();
    var acc = player.Accuracy();
    var D = player.D();
    var wt = player.WeaponType();
    var critcal = player.Critical() + C_add;

    // テスト
    if (player.buff_インピタス() && player.equip_インピタス性能アップ()) {
        // 50
        var c = 5 + critcal + Math.min(50, player.n_hit_count_インピタス);

        if (c >= 100) {
            player.result_count("ビクスマ100");
        }
    }

    // [1] マルチ判定実施
    {
        // ビクトリースマイトは全段1.5で属性ゴルゲも全段適用なので最初に計算
        var xN = 1.5;
        xN += player.WS_DamageUp0();

        if (logic.rand(player.QA())) {
            // QA判定

            list1.push({
                "QA": true, // QA
                "C": critcal, // クリティカル発生
                "xN": xN,// WS倍率
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 4; ++i) {
                list2.push({
                    "QA": true, // QA
                    "C": critcal, // クリティカル発生
                    "xN": xN,// WS倍率
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            list1.push({
                "TA": true, // TA・・TAダメージアップのために必要
                "C": critcal, // クリティカル
                "xN": xN,// WS倍率
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 3; ++i) {
                list2.push({
                    "TA": true, // TA・・TAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// WS倍率
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            list1.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 2; ++i) {
                list2.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (player.MythicAM3()) {
            // ミシックAM3
            var count = logic.MythicAM3(player, line);

            list1.push({
                "MythicAM3": true,
                "C": critcal, // クリティカル
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < count; ++i) {
                list2.push({
                    "MythicAM3": true,
                    "C": critcal, // クリティカル
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            list1.push({
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    }

    // [格闘の片手] 
    {
        list1.push({
            "C": critcal, // クリティカル
            "xN": xN,// WS倍率
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
            "sub": true, // サブ扱い(TP計算のために必要)
        });
    }

    // [2] マルチ判定実施
    {
        if (logic.rand(player.QA())) {
            // QA判定
            list1.push({
                "QA": true, // QA
                "C": critcal, // クリティカル発生
                "xN": xN,// WS倍率
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 4; ++i) {
                list2.push({
                    "QA": true, // QA
                    "C": critcal, // クリティカル発生
                    "xN": xN,// WS倍率
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            list1.push({
                "TA": true, // TA・・・TAダメージアップのために必要
                "C": critcal, // クリティカル
                "xN": xN,// WS倍率
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 3; ++i) {
                list2.push({
                    "TA": true, // TA・・・TAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// WS倍率
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            list1.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 2; ++i) {
                list2.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (setting.MythicAM3のWS適用x2() && player.MythicAM3()) {
            // 二段目にもミシックAM3を適用する場合
            var count = logic.MythicAM3(player, line);
            list1.push({
                "MythicAM3": true,
                "C": critcal, // クリティカル
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < count; ++i) {
                list2.push({
                    "MythicAM3": true,
                    "C": critcal, // クリティカル
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            list1.push({
                "C": critcal, // クリティカル
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    }

    // [3] マルチ判定なし
    {
        list1.push({
            "C": critcal,
            "xN": xN,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });
    }

    // リストを結合[0]～[7]までが有効
    list = list1.concat(list2);

    // 修正項目
    // 修正項目は全段適用なので最初に計算
    var BP_D = Math.floor(player.STR() * 80 / 100);

    // 得TP
    var gain_TP = logic.get_得TP(player, line);

    // 得TPの合計
    var TP = 0;

    // ダメージ合計
    var dmg = 0;

    line["WS"] = [];

    for (i = 0; i < list.length && i < 8; ++i) {
        var line = {};
        var t = list[i];

        // 命中判定
        var hit = logic.命中判定(t.wt, t.sub, t.acc, player,enemy, line);

        if (!hit) {
            // ミス
            line["ミス"] = true;
        } else {
            // ヒット毎のダメージ計算
            var d = logic.WS_ダメージ計算(i, BP_D, t, player, enemy, line);
            dmg += d[0];

            if (i == 0) {
                TP += gain_TP;
            } else if (t.sub) {
                TP += gain_TP;
            } else {
                TP += logic.STP(10, player, line);
            }

            line["ダメージ"] = d[0];
            line["TP合計"] = gain_TP;

        }

        line_p["WS"].push(line);
    }

    // 得TPとダメージを返却する
    return [dmg, TP];

}

// ウッコフューリーのTPクリティカル修正のテーブル
const table_TP_ウッコフューリー =
    [
        { min: 1000, max: 2000, v: function (tp) { return 20 + 10 * (tp - 1000) / 1000; } },
        { min: 2000, max: 3000, v: function (tp) { return 35 + 20 * (tp - 2000) / 1000; } },
        { min: 3000, max: 3000, v: function (tp) { return 55; } },
    ];

// WSのウッコフューリー
function ws_ウッコフューリー(player, line_p) {

    // ヒット数を確定
    // 多段WSのマルチ判定は初段と2段目のみ

    // ウッコフューリー
    // 2回攻撃
    // 2.0(初段)
    // STR80 %
    // 属性ゴルゲ初段適用

    // ヒット数は2回が確定
    // 1と2でマルチ判定
    // WSはマルチ追加分は別リストにしておいて、末尾に追加する。
    var line = line_p;

    var list = [];

    // 作業用リスト
    var list1 = []; // WSの固定分とサブ
    var list2 = []; // マルチ

    // WS実行のTP計算
    var execTP = logic.addTP(player.n_TP, player.TP_Bonus()); 
    // クリティカルヒット率修正
    var C_add = 15;
    for (var i = 0; i < table_TP_ウッコフューリー.length; ++i) {
        var t = table_TP_ウッコフューリー[i];

        if (logic.contains(execTP, t.min, t.max)) {
            C_add = t.v(execTP);
            break;
        }
    }

    var attack = player.Attack();
    var acc = player.Accuracy();
    var D = player.D();
    var wt = player.WeaponType();
    var critcal = logic.critical(player.Critical() + C_add, player, enemy, line);

    // [1] [2] + マルチの順

    // [1] マルチ判定実施
    {
        // ウッコフューリーは初段2.0
        var xN = 2.0;
        xN += player.WS_DamageUp0();

        if (logic.rand(player.QA())) {
            // QA判定
            
            list1.push({
                "QA": true, // QA
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 4; ++i) {
                list2.push({
                    "QA": true, // QA
                    "C": critcal,
                    "xN": 1.0,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            list1.push({
                "TA": true, // TA・・TAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 3; ++i) {
                list2.push({
                    "TA": true, // TA・・TAダメージアップのために必要
                    "C": critcal,
                    "xN": 1.0,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            list1.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 2; ++i) {
                list2.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal,
                    "xN": 1.0,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (player.MythicAM3()) {
            // ミシックAM3
            var count = logic.MythicAM3(player, line);

            list1.push({
                "MythicAM3": true,
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < count; ++i) {
                list2.push({
                    "MythicAM3": true,
                    "C": critcal,
                    "xN": 1.0,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            list1.push({
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    }

    // [2] マルチ判定実施
    {
        var xN = 1.0;

        if (logic.rand(player.QA())) {
            // QA判定
            list1.push({
                "QA": true, // QA
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 4; ++i) {
                list2.push({
                    "QA": true, // QA
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            list1.push({
                "TA": true, // TA・・・TAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 3; ++i) {
                list2.push({
                    "TA": true, // TA・・・TAダメージアップのために必要
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            list1.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < 2; ++i) {
                list2.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (setting.MythicAM3のWS適用x2() && player.MythicAM3()) {
            // 二段目にもミシックAM3を適用する場合
            var count = logic.MythicAM3(player, line);
            list1.push({
                "MythicAM3": true,
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });

            for (i = 1; i < count; ++i) {
                list2.push({
                    "MythicAM3": true,
                    "C": critcal,
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            list1.push({
                "C": critcal,
                "xN": xN,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    }

    // リストを結合[0]～[7]までが有効
    list = list1.concat(list2);

    // 修正項目
    // 修正項目は全段適用なので最初に計算
    var BP_D = Math.floor(player.STR() * 80 / 100);

    // 得TP
    var gain_TP = logic.get_得TP(player, line);

    // 得TPの合計
    var TP = 0;

    // ダメージ合計
    var dmg = 0;

    line["WS"] = [];

    for (i = 0; i < list.length && i < 8; ++i) {
        var line = {};
        var t = list[i];

        // 命中判定
        var hit = logic.命中判定(t.wt, t.sub, t.acc, player,enemy, line);

        if (!hit) {
            // ミス
            line["ミス"] = true;
        } else {
            // ヒット毎のダメージ計算
            var d = logic.WS_ダメージ計算(i, BP_D, t, player, enemy, line);
            dmg += d[0];

            if (i == 0) {
                TP += gain_TP;
            } else {
                TP += logic.STP(10, player, line);
            }

            line["ダメージ"] = d[0];
            line["TP合計"] = gain_TP;
        }

        line_p["WS"].push(line);
    }

    // 得TPとダメージを返却する
    return [dmg, TP];
}

function ws_トアクリーバー() {
    return [0,0];
}