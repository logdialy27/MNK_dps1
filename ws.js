const logic = require("./logic");
const setting = require("./setting");

const table_ws = {
    "シャンデュシニュ": ws_シャンデュシニュ,
    "サンギンブレード": ws_サンギンブレード,

    "ウッコフューリー": ws_ウッコフューリー,

    "ビクトリースマイト": ws_ビクトリースマイト,
    "四神円舞": ws_四神円舞,
    "夢想阿修羅拳": ws_夢想阿修羅拳,

    "トアクリーバー": ws_トアクリーバー,
};

exports.ws = function (name, player, enemy,line) {

    if (table_ws[name]) {
        return table_ws[name](player, enemy, line);
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
function ws_シャンデュシニュ(player, enemy, line_p) {

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
                TP += logic.STP(10, player.STP(), line);
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

function ws_ビクトリースマイト(player, enemy, line_p) {

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

    // [格闘の片手] 
    {
        list1.push({
            "C": critcal,
            "xN": xN,
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
                TP += logic.STP(10, player.STP(), line);
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
function ws_ウッコフューリー(player, enemy, line_p) {

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
                TP += logic.STP(10, player.STP(), line);
            }

            line["ダメージ"] = d[0];
            line["TP合計"] = gain_TP;
        }

        line_p["WS"].push(line);
    }

    // 得TPとダメージを返却する
    return [dmg, TP];
}

// WSのマルチが有効な段の共通処理
// xN1:マルチの最初の倍率
// xN2:初段以降の倍率
// attack:攻撃力
// acc:命中率
// D:D
// wt:武器種
// critcal:クリティカル確率

function helper_WSマルチ(player,list1, list2, xN1, xN2, attack, acc, D, wt, critcal) {

    if (logic.rand(player.QA())) {
        // QA判定
        list1.push({
            "QA": true, // QA
            "C": critcal,
            "xN": xN1,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });

        for (i = 1; i < 4; ++i) {
            list2.push({
                "QA": true,
                "C": critcal,
                "xN": xN2,
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
            "xN": xN1,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });

        for (i = 1; i < 3; ++i) {
            list2.push({
                "TA": true, // TA・・TAダメージアップのために必要
                "C": critcal,
                "xN": xN2,
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
            "xN": xN1,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });

        for (i = 1; i < 2; ++i) {
            list2.push({
                "DA": true, // DA・・DAダメージアップのために必要
                "C": critcal,
                "xN": xN2,
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
            "xN": xN1,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });

        for (i = 1; i < count; ++i) {
            list2.push({
                "MythicAM3": true,
                "C": critcal,
                "xN": xN2,
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }
    } else {
        list1.push({
            "C": critcal,
            "xN": xN1,
            "attack": attack,
            "acc": acc,
            "D": D,
            "wt": wt,
        });
    }
}

// WSダメージ計算の共通処理
function helper_WSダメージ計算(list, BP_D, player,enemy,line_p) {

    var line = line_p;
    // 得TP
    var gain_TP = logic.get_得TP(player, line);

    // クリティカル時の得TP計算
    var gain_TP_C = logic.get_得TP_クリティカル(player, false, line);

    // 得TPの合計
    var TP = 0;

    // ダメージ合計
    var dmg = 0;

    line_p["WS"] = [];

    for (i = 0; i < list.length && i < 8; ++i) {
        var line = {};
        var t = list[i];

        // 命中判定
        var hit = logic.命中判定(t.wt, t.sub, t.acc, player, enemy, line);

        if (!hit) {
            // ミス
            line["ミス"] = true;
        } else {
            // ヒット毎のダメージ計算
            var d = logic.WS_ダメージ計算(i, BP_D, t, player, enemy, line);
            dmg += d[0];

            if (i == 0) {
                if (d[1]) {
                    TP += gain_TP_C;
                } else {
                    TP += gain_TP;
                }
            } else if (t.sub) {
                if (d[1]) {
                    TP += gain_TP_C;
                } else {
                    TP += gain_TP;
                }
            } else {
                TP += logic.STP(10, player.STP(), line);
            }

            line["ダメージ"] = d[0];
            line["TP合計"] = gain_TP;
        }

        line_p["WS"].push(line);
    }

    // 得TPとダメージを返却する
    return [dmg, TP];
}

// 格闘:四神円舞
function ws_四神円舞(player, enemy,line_p) {

    // 四神円舞
    // 5回攻撃
    // 1.5(全段)
    // DEX73% - 85%
    // 属性ゴルゲ全段適用
    var line = line_p;
    var list = [];

    // 作業用リスト
    var list1 = []; // WSの固有分
    var list2 = []; // マルチ

    // WS実行のTP計算
    var execTP = logic.addTP(player.n_TP, player.TP_Bonus());
    // TP:追加効果発動確率修正

    // [1] [格闘のオフハンド] [2] [3] [4] + マルチの順
    var attack = player.Attack();
    var acc = player.Accuracy();
    var D = player.D();
    var wt = player.WeaponType();

    // 全段1.5で属性ゴルゲも全段適用なので最初に計算
    var xN = 1.5 + player.WS_DamageUp0();
    var xN2 = xN;

    // [1] マルチ判定実施
    helper_WSマルチ(player, list1, list2, xN, xN2, attack, acc, D, wt, 0);

    // [格闘のオフハンド]
    list1.push({ "C": 0, "xN": xN2, "attack": attack, "acc": acc, "D": D, "wt": wt, "sub": true });

    // [2] マルチ判定実施
    helper_WSマルチ(player, list1, list2, xN2, xN2, attack, acc, D, wt, 0);

    // [3] マルチ判定なし
    list1.push({ "C": 0, "xN": xN2, "attack": attack, "acc": acc, "D": D, "wt": wt });

    // [4] マルチ判定なし
    list1.push({ "C": 0, "xN": xN2, "attack": attack, "acc": acc, "D": D, "wt": wt });

    // リストを結合[0]～[7]までが有効
    list = list1.concat(list2);

    // 修正項目
    var BP_D = Math.floor(player.DEX() * 85 / 100);
    // 得TP
    var gain_TP = logic.get_得TP(player, line);

    return helper_WSダメージ計算(list, BP_D, player, enemy, line);
}

// 格闘:夢想阿修羅拳
function ws_夢想阿修羅拳(player, enemy,line_p) {
    // 8回攻撃。TP: 命中率修正
    // 倍率:1.25
    // STR15% VIT15%
    var line = line_p;
    var list = [];

    // 作業用リスト
    var list1 = []; // WSの固有分
    var list2 = []; // マルチ

    // WS実行のTP計算
    var execTP = logic.addTP(player.n_TP, player.TP_Bonus());
    // TP:命中率修正

    // [1] [格闘のオフハンド] [2] [3] [4] [5] [6] [7]
    var attack = player.Attack();
    var acc = player.Accuracy();
    var D = player.D();
    var wt = player.WeaponType();

    // 全段1.5で属性ゴルゲも全段適用なので最初に計算
    var xN = 1.25 + player.WS_DamageUp0();
    var xN2 = xN;

    // [1] マルチ判定不要
    list1.push({ "C": 0, "xN": xN2, "attack": attack, "acc": acc, "D": D, "wt": wt });

    // [格闘のオフハンド]
    list1.push({ "C": 0, "xN": xN2, "attack": attack, "acc": acc, "D": D, "wt": wt, "sub": true });

    for (var i = 2; i < 8; ++i) {
        // [2] [3] [4] [5] [6] [7]
        list1.push({ "C": 0, "xN": xN2, "attack": attack, "acc": acc, "D": D, "wt": wt });
    }

    // リストを結合[0]～[7]までが有効
    list = list1.concat(list2);

    // 修正項目
    var BP_D = Math.floor(player.STR() * 15 / 100) + Math.floor(player.VIT() * 15 / 100);

    return helper_WSダメージ計算(list, BP_D, player, enemy, line);
}


// 属性WSダメージ計算の共通処理
function helper_属性WSダメージ計算(name,element,base_dmg, xN, BP_D, 系統係数,player, enemy, line)
{
    var 属性WSD = player.属性ウェポンスキルダメージ();
    var 魔法ダメージ = player.魔法ダメージ();

    var d1 = ((base_dmg + BP_D) * (xN + player.WS_DamageUp0()) * (100 + 属性WSD)/100);
    line["属性WSダメージ計算:d1"] = d1;

    d1 = d1 + 魔法ダメージ + 系統係数;
    line["属性WSダメージ計算:d1-b"] = d1;

    var d2 = Math.floor(d1 * (100 + player.WS_DamageUp1()) / 100);
    line["属性WSダメージ計算:d2"] = d2;
    d3 = Math.floor(d2 * (100 + player.Affinity(element)) / 100);
    line["属性WSダメージ計算:d3"] = d3;
    d3 = Math.floor(d3 * (100 + player.天候曜日(element)) / 100);
    line["属性WSダメージ計算:d4"] = d3;
    d3 = Math.floor(d3 * (100 + logic.ガンビット(element, enemy.ガンビット())) / 100);
    line["属性WSダメージ計算:d5"] = d3;
    d3 = Math.floor(d3 * (100 + player.MagicAttack()) / enemy.魔防());
    line["属性WSダメージ計算:d6"] = d3;
    d3 = Math.floor(d3 * (100 + player.WS_DamageUp2()) / 100);
    line["属性WSダメージ計算:d7"] = d3;
    d3 = Math.floor(d3 * (100 + player.WS_DamageUp3(name)) / 100);
    line["属性WSダメージ計算:d8"] = d3;

    var gain_TP = logic.get_得TP(player, line);

    return [d3, gain_TP];
}

// 片手剣:サンギンブレード
function ws_サンギンブレード(player, enemy, line_p) {

    var line = line_p;

    var base_dmg = logic.属性WS基本D(player,line);
    var xN = 2.75;
    var BP_D = Math.floor(player.STR() * 30 / 100) + Math.floor(player.MND() * 50 / 100);
    
    var 系統係数;
    
    if (player.INT() > enemy.INT()) {
        系統係数 = Math.abs(player.INT() - enemy.INT()) * 2;
    } else {
        系統係数 = Math.abs(player.INT() - enemy.INT()) * 1.5;
    }

    return helper_属性WSダメージ計算("サンギンブレード", "闇", base_dmg, xN, BP_D,系統係数,player,enemy,line);
}

// 両手剣:トアクリーバー
function ws_トアクリーバー() {
    return [0, 0];
}