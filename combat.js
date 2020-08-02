const skillchain = require("./skillchain");

const logic = require("./logic");
const ws = require("./ws");
const setting = require("./setting");

exports.on_auto_attack = function (player,enemy,line_p) {

    // 二刀流の場合はメインとサブで攻防比が異なるのでそれぞれ実施

    // マルチアタック事にクリティカル発生が変わり、クリが発生すると攻防比が変わるので
    // はじめにマルチアタック計算、次にクリティカル計算、最後に個別の攻撃毎の攻防比と攻防関数計算の順とする。

    // また最大で8回という条件があるので、まずはオートアタックリストを作る。
    var line = line_p;

    var list = [];

    if (player.WeaponType() == "格闘") {
        // 格闘でのマルチリスト作成
        // 取得元はメイン
        var attack = player.Attack();
        var acc = player.Accuracy();
        var D = player.D();
        var wt = player.WeaponType();
        var critcal = player.Critical();
        // 右手
        if (logic.rand(player.QA())) {
            // QA判定
            for (i = 0; i < 4; ++i) {
                
                var xN = logic.xN(player, wt, i, line);

                list.push({
                    "QA": true, // QA
                    "C": critcal, // クリティカル発生
                    "xN": (i == 0) ? xN : 1.0, // 倍撃は初段のみ適用
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            for (i = 0; i < 3; ++i) {
                // 倍撃
                var xN = logic.xN(player, wt, i, line);

                list.push({
                    "TA": true, // TA・・・TAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": (i == 0) ? xN : 1.0, // 倍撃は初段のみ適用
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            for (i = 0; i < 2; ++i) {
                // 倍撃
                var xN = logic.xN(player, wt, i, line);

                list.push({
                    "DA": true, // DA・・・DAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": (i == 0) ? xN : 1.0, // 倍撃は初段のみ適用
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (player.MythicAM3()) {
            // ミシックAM3
            var count = logic.MythicAM3(player, line);
            for (i = 0; i < count; ++i) {
                // 倍撃
                var xN = 1.0;

                list.push({
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
            // 倍撃
            var xN = logic.xN(player, wt, 0, line);

            list.push({
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }

        // 左手
        if (logic.rand(player.QA())) {
            // QA判定
            for (i = 0; i < 4; ++i) {
                var xN = 1;// サブで倍撃はない

                list.push({
                    "QA": true, // QA
                    "C": critcal, // クリティカル発生
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }

        } else if (logic.rand(player.TA())) {
            // TA判定
            for (i = 0; i < 3; ++i) {
                var xN = 1;

                list.push({
                    "TA": true, // TA・・TAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            for (i = 0; i < 2; ++i) {
                var xN = 1;

                list.push({
                    "DA": true, // DA・・DAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else {
            var xN = 1.0;

            list.push({
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }


        if (logic.rand(player.Kick())) {
            // 蹴撃
            var D = player.KickD();
            var attack = player.Attack();
            var acc = player.Accuracy();

            list.push({
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": "格闘",
                "蹴撃": true,
            });
        }

    }
    else
    {
        // メインでのマルチリスト作成
        var attack = player.Attack();
        var acc = player.Accuracy();
        var D = player.D();
        var wt = player.WeaponType();

        if (logic.rand(player.QA())) {
            // QA判定
            for (i = 0; i < 4; ++i) {
                var critcal = logic.critical(player.Critical(), player, enemy, line);
                var xN = logic.xN(player, wt, i, line);

                list.push({
                    "QA": true, // QA
                    "C": critcal, // クリティカル発生
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.TA())) {
            // TA判定
            for (i = 0; i < 3; ++i) {
                var critcal = logic.critical(player.Critical(), player, enemy, line);
                // 倍撃
                var xN = logic.xN(player, wt, i, line);

                list.push({
                    "TA": true, // TA・・・TAダメージアップのために必要
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (logic.rand(player.DA())) {
            // DA判定
            for (i = 0; i < 2; ++i) {
                var critcal = logic.critical(player.Critical(), player, enemy, line);
                // 倍撃
                var xN = logic.xN(player, wt, i, line);

                list.push({
                    "DA": true, // DA・・・DAダメージアップのために必要
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
            for (i = 0; i < count; ++i) {
                var critcal = logic.critical(player.Critical(), player, enemy, line);
                // 倍撃
                var xN = 1.0;

                list.push({
                    "MythicAM3": true,
                    "C": critcal, // クリティカル
                    "xN": xN,
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }
        } else if (player.複数回攻撃() != 0) {
            // 武器の複数回攻撃

            // 攻撃回数を取得
            var count = logic.複数回攻撃判定(player, line);

            for (i = 0; i < count; ++i) {
                var critcal = logic.critical(player.Critical(), player, enemy, line);
                // 倍撃
                var xN = 1.0;

                list.push({
                    "複数回攻撃": true, 
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                });
            }

        } else {
            // 
            var critcal = logic.critical(player.Critical(), player, enemy, line);
            // 倍撃
            var xN = logic.xN(player, wt, 0, line);

            list.push({
                "C": critcal, // クリティカル
                "xN": xN,// 倍撃
                "attack": attack,
                "acc": acc,
                "D": D,
                "wt": wt,
            });
        }

        // サブウェポン
        if (player.SubWeaponType() != "") {
            var attack = player.SubAttack();
            var acc = player.SubAccuracy();
            var D = player.SubD();
            var wt = player.SubWeaponType();
            var critcal = player.SubCritical();

            if (logic.rand(player.QA())) {
                // QA判定
                for (i = 0; i < 4; ++i) {
                    var xN = 1;// サブで倍撃はない

                    list.push({
                        "QA": true, // QA
                        "C": critcal, // クリティカル発生
                        "xN": xN,// 倍撃
                        "attack": attack,
                        "acc": acc,
                        "D": D,
                        "wt": wt,
                        "sub": true,
                    });
                }

            } else if (logic.rand(player.TA())) {
                // TA判定
                for (i = 0; i < 3; ++i) {
                    var xN = 1;// サブで倍撃はない

                    list.push({
                        "TA": true, // TA・・TAダメージアップのために必要
                        "C": critcal, // クリティカル
                        "xN": xN,// 倍撃
                        "attack": attack,
                        "acc": acc,
                        "D": D,
                        "wt": wt,
                        "sub": true,
                    });
                }
            } else if (logic.rand(player.DA())) {
                // DA判定
                for (i = 0; i < 2; ++i) {
                    var xN = 1;// サブで倍撃はない

                    list.push({
                        "DA": true, // DA・・DAダメージアップのために必要
                        "C": critcal, // クリティカル
                        "xN": xN,// 倍撃
                        "attack": attack,
                        "acc": acc,
                        "D": D,
                        "wt": wt,
                        "sub": true,
                    });
                }
            } else if (player.Sub複数回攻撃() != 0) {
                // 武器の複数回攻撃
                // メインとサブはそれぞれ別

                // 攻撃回数を取得
                var count = logic.複数回攻撃判定(player, line);

                for (i = 0; i < count; ++i) {
                    // 倍撃
                    var xN = 1.0;

                    list.push({
                        "複数回攻撃": true,
                        "C": critcal, // クリティカル
                        "xN": xN,// 倍撃
                        "attack": attack,
                        "acc": acc,
                        "D": D,
                        "wt": wt,
                        "sub": true,
                    });
                }

            } else {
                var xN = 1;// サブで倍撃はない

                list.push({
                    "C": critcal, // クリティカル
                    "xN": xN,// 倍撃
                    "attack": attack,
                    "acc": acc,
                    "D": D,
                    "wt": wt,
                    "sub": true,
                });
            }
        }
    }

    // 打剣、追撃の優先順位は未確定、低めにしている。
    if (logic.rand(player.Daken())) {
        // 打剣
        var attack = player.RangedAttack();
        var acc = player.RangedAccuracy();
        var D = player.RangedD();

        var critcal = player.RangedCritical();
        var xN = 1;// 倍撃

        list.push({
            "C": critcal, // クリティカル
            "xN": xN,// 倍撃
            "attack": attack,
            "acc": acc,
            "D": D,
            "打剣": true,
            "wt": "投てき",
        });
    }

    if (logic.rand(player.Pursuit())) {
        // 追撃
        var attack = player.Attack();
        var acc = player.Accuracy();
        var D = player.D();
        var wt = player.WeaponType();

        // TODO:サブの追撃の確認
        var critcal = player.Critical();
        var xN = 1;// 倍撃

        list.push({
            "C": critcal, // クリティカル
            "xN": xN,// 倍撃
            "attack": attack,
            "acc": acc,
            "D": D,
            "追撃":true,
            "wt": wt,
        });
    }

    // 得TPの計算
    var gain_TP = logic.get_得TP(player, line);

    // クリティカル時の得TP計算
    var gain_TP_C = logic.get_得TP_クリティカル(player,true,line);

    // listの先頭から処理を順番に実施
    // オートアタックは最大8回
    // 末尾は判定しないが、切り捨て順序が不明
    line["オートアタック"] = [];

    var TP = 0;
    var hit_count = 0;

    for (i = 0; i < list.length && (i < 8); ++i) {
        var line = {};
        var t = list[i];

        // 命中判定
        var hit = logic.命中判定(t.wt,t.sub,t.acc, player,enemy,line);

        var dmg = logic.AA_ダメージ計算(t, player, enemy, line);

        if (!hit) {
            // ミス
            line["ミス"] = true;
            player.result_count("ミス");

            // インピタスのリセット
            if (player.buff_インピタス()) {
                player.n_hit_count_インピタス = 0;
            }
        } else {
            if (t["打剣"]) {
                // 打剣は得TP対象外
            } else {
                if (!dmg[1]) {
                    TP += gain_TP;
                } else {
                    TP += gain_TP_C;
                }
            }

            hit_count += 1;

            player.result_sum("TP", gain_TP);

            if (!dmg[1]) {
                player.result_all("攻撃", dmg[0]);
            } else {
                player.result_all("クリティカル", dmg[0]);
            }

            // エンダメージ
            if (player.エンII() > 0) {
                var en_dmg = player.エンII();
                // エンIIは初段のみ適用
                if (i == 0) {
                    // エンIIダメージはヒット毎に増加で基本ダメージの倍まで増加
                    // ヒット数増加
                    player.n_hit_count_エンII += 1;

                    // 基本ダメージかヒット数の小さい方を加算
                    en_dmg += Math.min(en_dmg, player.n_hit_count_エンII);

                    // レジスト計算
                    en_dmg = logic.regist_エン(en_dmg, player, enemy, line);

                    // 魔法剣ダメージ+N%の適用
                    // エンIIはメインだけが対象
                    en_dmg = Math.floor(en_dmg * (100 + player.EnspellDamageUp())/100);

                    // アフィニティ計算 
                    en_dmg = Math.floor(en_dmg * (100 + player.Affinity(player.エン属性())) / 100);

                    // 天候曜日計算
                    en_dmg = Math.floor(en_dmg * (100 + player.天候曜日(player.エン属性())) / 100);

                    // ガンビット計算
                    en_dmg = Math.floor(en_dmg * (100 + logic.ガンビット(player.エン属性(), enemy.ガンビット())) / 100);

                    player.result_all("エンダメージ", en_dmg);
                }
            } else if (player.エン() > 0) {
                var en_dmg;

                // エンは全段適用
                if (t.sub) {
                    en_dmg = player.Subエン();
                } else {
                    en_dmg = player.エン();
                }

                // レジスト計算
                en_dmg = logic.regist_エン(en_dmg, player, enemy, line);

                // 魔法剣ダメージ+N%の適用
                // エンはメインとサブで個別
                if (t.sub) {
                    en_dmg = Math.floor(en_dmg * (100 + player.SubEnspellDamageUp()) / 100);
                } else {
                    en_dmg = Math.floor(en_dmg * (100 + player.EnspellDamageUp()) / 100);
                }
                // アフィニティ計算 
                en_dmg = Math.floor(en_dmg * (100 + player.Affinity(player.エン属性())) / 100);

                // 天候曜日計算
                en_dmg = Math.floor(en_dmg * (100 + player.天候曜日(player.エン属性())) / 100);

                // ガンビット計算
                en_dmg = Math.floor(en_dmg * (100 + logic.ガンビット(player.エン属性(),enemy.ガンビット())) / 100);

                player.result_all("エンダメージ", en_dmg);
            }

            // インピタスのカウント
            if (player.buff_インピタス()) {
                player.n_hit_count_インピタス += 1;
            }
        }

        line_p["オートアタック"].push(line);
    }

    // ヒット数履歴
    player.result_list("history", hit_count);

    // 得TP履歴
    player.result_list("TP", TP);

    // 
    player.n_TP = logic.addTP(player.n_TP, TP);

    line_p["TP"] = TP;

    return 0;
}

exports.on_ws = function (player,enemy, line) {
    // WSは全て個別に計算
    line["WS実行前:TP"] = player.n_TP;

    // WS実行履歴
    player.result_list("history", -1);

    // 
    player.result_sum("WS実行前TP", player.n_TP);

    var ret = null;
    var name = player.WS();

    line["WS名:name"] = name;

    // WS計算
    ret = ws.ws(name, player, enemy,line);

    var dmg = ret[0];
    var TP = ret[1];

    // 連携のためのWSの履歴記録
    skillchain.push_ws(line["current_time"], name, dmg, player);

    player.result_all(player.WS(), dmg);

    // 分布の測定
    player.result_dist(player.WS(), dmg, setting.dist_unit(),1);

    // TPの集計
    player.result_sum(player.WS() + "/得TP", TP);

    // TPを得TPに更新
    if (!logic.rand(player.ウェポンスキル使用時TPを消費しない())) {
        player.n_TP = TP;
    } else {
        // 「ウェポンスキル使用時TPを消費しない」の場合
        player.n_TP = logic.addTP(player.n_TP, TP);
        player.result_count("ウェポンスキル使用時TPを消費しない");
    }

    player.result_sum("WS実行後TP", player.n_TP);
    line["WS実行後:TP"] = player.n_TP;

    // TP==0の場合ミス判定

    if (TP != 0) {
        return true;
    } else {
        // WSのミス
        player.result_count(player.WS() + "/ミス");

        // インピタスのリセット
        if (player.buff_インピタス()) {
            player.n_hit_count_インピタス = 0;
        }
        return false;
    }

}

// 連携
exports.on_skillchain = function (player,enemy, line) {

    if (skillchain.last(player, line)) {
        // 連携回数
        var count = skillchain.get_last_count();

        // WSダメージ
        var ws_dmg = skillchain.get_last_ws_dmg();

        // 発生した連携のLV
        var lv = skillchain.get_last_lv();

        // 発生した連携名
        var name = skillchain.get_last_name();

        // 発生した連携の属性一覧
        var element_all = skillchain.get_last_element();

        // 適用する属性の決定
        var element = skillchain.連携の適用属性(element_all,enemy,line);

        // 連携倍率
        var xN = skillchain.連携倍率(count, lv,line) / 100;

        // WSダメージ
        var dmg1 = 0;
        {
            var dmg = ws_dmg;
            line["連携ダメージ1:ws"] = dmg;

            // 属性耐性
            dmg = Math.floor(dmg * (enemy.属性耐性2(element)) / 100);
            line["連携ダメージ1:耐性"] = dmg;

            // アフィニティ枠
            dmg = Math.floor(dmg * (100 + player.Affinity(element)) / 100);
            line["連携ダメージ1:アフィニティ"] = dmg;

            // 属性杖枠
            dmg = Math.floor(dmg * (100 + player.属性杖(element)) / 100);
            line["連携ダメージ1:属性杖"] = dmg;

            // 天候曜日枠
            dmg = Math.floor(dmg * (100 + player.天候曜日(element)) / 100);
            line["連携ダメージ1:天候曜日"] = dmg;

            // 虚誘枠
            dmg = Math.floor(dmg * (100 + player.虚誘(element)) / 100);
            line["連携ダメージ1:虚誘"] = dmg;

            // ガンビット
            dmg = Math.floor(dmg * (100 + logic.ガンビット(element, enemy.ガンビット())) / 100);
            line["連携ダメージ1:ガンビット"] = dmg;

            // 連携倍率
            dmg = Math.floor(dmg * xN);
            line["連携ダメージ1:連携倍率"] = dmg;

            // 連携ダメージ+
            dmg = Math.floor(dmg * (100 + player.SkillchainBonus()) / 100);
            line["連携ダメージ1:連携ダメージ+"] = dmg;

            // イナンデーション
            // TODO:
            dmg1 = dmg;
        }

        // 魔法ダメージ
        var dmg2 = 0;
        {
            var dmg = player.魔法ダメージ();
            line["連携ダメージ2:魔法ダメージ"] = dmg;

            // 連携耐性
            dmg = Math.floor(dmg * (enemy.属性耐性2(element)) / 100);
            line["連携ダメージ2:耐性"] = dmg;

            // アフィニティ枠
            dmg = Math.floor(dmg * (100 + player.Affinity(element)) / 100);
            line["連携ダメージ2:アフィニティ"] = dmg;

            // 属性杖枠
            dmg = Math.floor(dmg * (100 + player.属性杖(element)) / 100);
            line["連携ダメージ2:属性杖"] = dmg;

            // 天候曜日枠
            dmg = Math.floor(dmg * (100 + player.天候曜日(element)) / 100);
            line["連携ダメージ2:天候曜日"] = dmg;

            // 虚誘枠
            dmg = Math.floor(dmg * (100 + player.虚誘(element)) / 100);
            line["連携ダメージ2:虚誘"] = dmg;

            // ガンビット
            dmg = Math.floor(dmg * (100 + logic.ガンビット(element, enemy.ガンビット())) / 100);
            line["連携ダメージ2:ガンビット"] = dmg;

            dmg2 = dmg;
        }

        var dmg3 = dmg1 + dmg2;
        line["連携ダメージ:合計"] = dmg3;

        // 連携での集計
        player.result_all("連携",dmg3);
        // 連携毎の集計
        player.result_all(name, dmg3);

        if (setting.連携詳細()) {
            player.result_list("連携詳細:" + name, [dmg3, ws_dmg, lv, count, xN, enemy.属性耐性2(element)]);
        }
    }

    return 0;
}


exports.on_spell = function (player, enemy,line) {
    // TODO:
    return 0;
}

