const combat = require("./combat");
const version_info = require("./version_info");

const logic = require("./logic");
const fs = require('fs');

exports.run = function (result_file_prefix, p_target, equipset_aa, equipset_ws,end_time,e_target,byBatch,debug_file) {

    var player = require("./player");
    var enemy = require("./enemy");

    const setting = require("./setting");

    player.equipset(equipset_aa)
    player.Load(p_target);

    if (!player.exists_equipset()) {
        return false;
    }

    enemy.Load(e_target);

    // デバッグ用ログ出力
    var log_fd = fs.openSync(debug_file, 'w')

    // 時間初期化
    var current_time = 0;
    
    var next_auto_attack_time = 0;
    var next_ws_time = 0;
    var delay_time = 0;

    // 実行時間
    if (end_time <= 0) {
        end_time = setting.end_time();
    }
    var last_ws_time = 0;

    // WS分布の穴埋め
    for (var i = 0; i < 99999; ++i) {
        player.result_dist(player.WS(), i, setting.dist_unit(), 0);
    }

    var startTime = new Date();

    // シミュレーション開始
    while (current_time < end_time) {
        var line = {};

        current_time += setting.interval();
        line["current_time"] = current_time;

        if (delay_time > current_time) {
            // 行動不可能遅延時間
            line["delay_time"] = delay_time;
         } else {
            if (next_ws_time > 0) {
                // WS実行予約中
                if (current_time >= next_ws_time) {
                    next_ws_time = 0;

                    // WS装備に変更
                    player.equipset(equipset_ws);
                    // WS実施
                    var ws_hit = combat.on_ws(player, enemy,line);

                    if (last_ws_time == 0) {
                        last_ws_time = current_time;
                    } else {
                        player.result_list("WS実行間隔", (current_time - last_ws_time));
                        last_ws_time = current_time
                    }

                    // WSの終了
                    player.on_ws_done();

                    // 連携判定
                    if (ws_hit) {
                        combat.on_skillchain(player, enemy, line);
                    } else {
                        // ミスの場合は判定除外
                        // 連携の状態は維持
                    }



                    // オートアタック装備に変更
                    player.equipset(equipset_aa);
                    // WSの実施後のAAの遅延
                    next_auto_attack_time += setting.WS_AA_delay();

                    // 行動不可能時間
                    delay_time = current_time + setting.WS_noaction_delay();
                }
            } else {
                // TPが1000を超えていた場合
                if (player.tryWS()) {
                    // WSの実行予約
                    // TPがたまってからWSを実行するまでの認識遅延時間
                    // トータルで考えるとこれは差にはならない
                    next_ws_time = current_time + setting.WS_wait();
                    line["WS実行予約:next_ws_time"] = next_ws_time;
                }
            }
        }

        // オートアタック時間を超えていた場合
        if (current_time >= next_auto_attack_time) {
            // オートアタックの実施
            combat.on_auto_attack(player,enemy,line);
            // 次の時間の予約
            next_auto_attack_time = current_time + get_attack_speed(player, line);

            player.result_list("AA実行間隔", (next_auto_attack_time - current_time));
        }

        // ログ出力
        if (setting.DEBUG()) {
            fs.writeSync(log_fd, JSON.stringify(line)+"\n");
        }
    }

    fs.closeSync(log_fd);

    var elaspedTime = new Date() - startTime;

    {
        // 合計出力
        var result = {};

        result["elasped_time"] = current_time;
        result["sum"] = player.r_sum;
        result["count"] = player.r_count;
        result["min"] = player.r_min;
        result["max"] = player.r_max;

        output_to_json(result_file_prefix + "_sum.txt", result,true);
    }

    {
        // リスト出力
        var result = {};
        result["list"] = player.r_list;
        output_to_json(result_file_prefix + "_list.txt", result);
    }

    {
        // 分布出力
        var result = {};
        result["dist"] = player.r_dist;

        output_to_json(result_file_prefix + "_dist.txt", result);
    }

    // バッチ実行の場合にはWSは個別に集計しない
    batch = byBatch

    {
        // 集計結果出力
        var result = {}
        result["Player"] = player.Name();
        result["Enemy"] = e_target;
        result["Desctiption"] = player.Description();
        result["VERSION"] = version_info.VERSION();
        result["計算時間(秒)"] = elaspedTime / 1000;
        result["target_player"] = p_target;
        result["equipset_aa"] = equipset_aa;
        result["equipset_ws"] = equipset_ws;
        result["Enemy_Desctiption"] = enemy.toString();
        result["Note"] = player.zone() + "/" + player.food();

        result["経過時間(秒)"] = Math.floor(current_time / 1000);

        // 回数
        result["回数:攻撃"] = player.r_count["攻撃"];
        result["回数:ミス"] = player.r_count["ミス"];
        result["回数:クリティカル"] = player.r_count["クリティカル"];

        // WSは一覧をまとめる
        for (var w of player.WS_list()) {
            if (!result["回数:WS"]) {
                result["回数:WS"] = 0;
            }
            result["回数:WS"] += player.r_count[w];
            if (batch) {

            } else {
                result["回数:" + w] = player.r_count[w];
            }
        }
        result["回数:連携"] = player.r_count["連携"];

        // 合計
        result["合計:攻撃"] = player.r_sum["攻撃"];
        result["合計:ミス"] = player.r_sum["ミス"];
        result["合計:クリティカル"] = player.r_sum["クリティカル"];

        for (var w of player.WS_list()) {
            if (!result["合計:WS"]) {
                result["合計:WS"] = 0;
            }
            result["合計:WS"] += player.r_sum[w];
            if (batch) {

            } else {
                result["合計:" + w] = player.r_sum[w];
            }
        }
        result["合計:連携"] = player.r_sum["連携"];

        result["合計:AA"] = player.r_sum["攻撃"] + player.r_sum["クリティカル"];
        result["合計:AA+WS"] = result["合計:AA"] + result["合計:WS"];
        result["合計:AA+WS+連携"] = result["合計:AA+WS"] + player.r_sum["連携"];

        result["合計:TP"] = player.r_sum["TP"];

        result["合計:与TP"] = player.r_sum["与TP"];

        result["最大:攻撃"] = player.r_max["攻撃"];
        result["最大:クリティカル"] = player.r_max["クリティカル"];
        for (var w of player.WS_list()) {
            if (batch) {
                result["最大:WS"] = player.r_max[w];
            } else {
                result["最大:" + w] = player.r_max[w];
            }
        }

        result["最小:攻撃"] = player.r_min["攻撃"];
        result["最小:クリティカル"] = player.r_min["クリティカル"];
        for (var w of player.WS_list()) {
            if (batch) {
                result["最小:WS"] = player.r_min[w];
            } else {
                result["最小:" + w] = player.r_min[w];
            }
        }

        result["平均:攻撃"] = (player.r_sum["攻撃"] / player.r_count["攻撃"]).toFixed(0);
        result["平均:クリティカル"] = (player.r_sum["クリティカル"] / player.r_count["クリティカル"]).toFixed(0);
        for (var w of player.WS_list()) {
            if (batch) {
                result["平均:WS"] = (player.r_sum[w] / player.r_count[w]).toFixed(0);
            } else {
                result["平均:" + w] = (player.r_sum[w] / player.r_count[w]).toFixed(0);
            }
        }

        result["TP:WS実行TP平均"] = (player.r_sum["WS実行前TP"] / result["回数:WS"]).toFixed(2) ;
        result["TP:WS得TP平均"] = (player.r_sum["WS実行後TP"] / result["回数:WS"]).toFixed(2) ;
        result["TP:AA得TP平均"] = average(player.r_list["TP"]).toFixed(2);
        result["TP:与TP平均"] = average(player.r_list["与TP"]).toFixed(2);

        result["間隔:AA間隔(秒)"] = (average(player.r_list["AA実行間隔"]) / 1000).toFixed(3);
        result["間隔:WS間隔(秒)"] = (average(player.r_list["WS実行間隔"]) / 1000).toFixed(3);
        result["間隔:AA攻撃回数平均"] = (average(get_AA攻撃回数(player.r_list["history"]))).toFixed(2);
        result["間隔:WSターン数"] = (average(get_WSターン数(player.r_list["history"]))).toFixed(2);

        // 再計算項目
        result["命中率"] = (100 * (player.r_count["クリティカル"] + player.r_count["攻撃"]) /
            (player.r_count["クリティカル"] + player.r_count["攻撃"] + player.r_count["ミス"])).toFixed(2);

        result["クリティカル率"] = (100 * (result["回数:クリティカル"] / (result["回数:クリティカル"] + result["回数:攻撃"]))).toFixed(2);
        result["クリティカルダメージ割合"] = (100 * (result["合計:クリティカル"] / result["合計:AA+WS"])).toFixed(2);
        result["WSダメージ割合"] = (100 * ((result["合計:AA+WS"] - result["合計:AA"]) / result["合計:AA+WS"])).toFixed(2);

        // DPS計測      
        result["DPS:AA"] = ((result["合計:AA"]) / result["経過時間(秒)"]).toFixed(0);
        result["DPS:AA+WS"] = ((result["合計:AA+WS"]) / result["経過時間(秒)"]).toFixed(0);
        result["DPS:AA+WS+連携"] = ((result["合計:AA+WS+連携"]) / result["経過時間(秒)"]).toFixed(0);

        // エンダメージでない場合は未出力
        if (player.r_sum["エンダメージ"]) {
            result["回数:エンダメージ"] = (player.r_count["エンダメージ"] ? player.r_count["エンダメージ"] : 0);
            result["合計:エンダメージ"] = (player.r_sum["エンダメージ"] ? player.r_sum["エンダメージ"] : 0);
            result["合計:AA+エン"] = player.r_sum["攻撃"] + (player.r_sum["エンダメージ"] ? player.r_sum["エンダメージ"] : 0) + player.r_sum["クリティカル"];
            result["合計:AA+エン+WS"] = result["合計:AA+エン"] + result["合計:WS"];
            result["合計:AA+エン+WS+連携"] = result["合計:AA+エン+WS"] + player.r_sum["連携"];
            result["最小:エンダメージ"] = (player.r_min["エンダメージ"] ? player.r_min["エンダメージ"] : 0);
            result["最大:エンダメージ"] = (player.r_max["エンダメージ"] ? player.r_max["エンダメージ"] : 0);
            result["DPS:エンダメージ"] = ((result["合計:エンダメージ"]) / result["経過時間(秒)"]).toFixed(0);
            result["DPS:AA+エン"] = ((result["合計:AA+エン"]) / result["経過時間(秒)"]).toFixed(0);
            result["DPS:AA+エン+WS"] = ((result["合計:AA+エン+WS"]) / result["経過時間(秒)"]).toFixed(0);
            result["DPS:AA+エン+WS+連携"] = ((result["合計:AA+エン+WS+連携"]) / result["経過時間(秒)"]).toFixed(0);
        }
        // JSON出力
        output_to_json(result_file_prefix + "_all.txt", result, true);

        // TSVも出力
        output_to_tsv(result_file_prefix + "_all_tsv.txt",result);
    }

    return true;
}

exports.end = function (player) {
}

function get_attack_speed(player, line) {
    return logic.AA_間隔(player, line);
}

// TSV形式出力
function output_to_tsv(output_file, result)
{
    // 実行結果ファイル出力
    var result_fd = fs.openSync(output_file, 'w');

    for (var i in result) {
        if (result[i] == undefined || result[i] == null) {
            fs.writeSync(result_fd, i + "\t\n");
        } else if (typeof result[i] == "string") {
            fs.writeSync(result_fd, i + "\t" + result[i] + "\n");
        } else if (!isNaN(result[i])) {
            fs.writeSync(result_fd, i + "\t" + result[i] + "\n");
        } else {
            fs.writeSync(result_fd, i + "\t\n");
        }
    }

    fs.closeSync(result_fd);
}

// JSON形式出力
function output_to_json(output_file, result,format) {
    // 実行結果ファイル出力
    var result_fd = fs.openSync(output_file, 'w');

    if (format) {
        fs.writeSync(result_fd, JSON.stringify(result, null, 4));
    } else {
        fs.writeSync(result_fd, JSON.stringify(result));
    }

    fs.closeSync(result_fd);
}

// 平均値の計算
function average(in_list) {
    if (in_list) {
        var v = 0;
        for (var i = 0; i < in_list.length; ++i) {
            v += in_list[i];
        }
        return v / in_list.length;
    }
    else {
        return 0;
    }
}

// 
function get_AA攻撃回数(in_list) {
    if (in_list) {
        var ret = [];
        for (var i = 0; i < in_list.length; ++i) {
            if (in_list[i] >= 0) {
                ret.push(in_list[i]);
            }
        }
        return ret;
    }
    else {
        return [];
    }
}

function get_WSターン数(in_list) {
    if (in_list) {
        var ret = [];
        var r = 0;
        for (var i = 0; i < in_list.length; ++i) {
            if (in_list[i] >= 0) {
                r += 1;
            } else {
                ret.push(r);
                r = 0;
            }
        }
        return ret;
    }
    else {
        return [];
    }
}
