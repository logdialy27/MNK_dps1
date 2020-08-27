'use strict';

const fs = require('fs');

exports.start = function () {
    // バッチ実行

    var batchName = null;
    var args_list = null;

    if (process.argv[2]) {
        batchName = process.argv[2];

        var input_file = batchName + ".json.txt";
        if (process.argv[3]) {
            input_file = process.argv[3];
        }

        args_list = readJsonFromFile(input_file);
    }
    else
    {
        batchName = "batchRun0";
        const in_end_time = 1 * 15 * 60 * 1000;
        const in_enemy_target = "E1";

        args_list = [
            { target: "MNK9", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK9", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK8", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK8", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK7", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK7", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK6", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK6", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK5", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK5", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK4", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK4", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK3", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK3", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK2", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK2", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "MNK1", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/MNK1", end_time: in_end_time, enemy_target: in_enemy_target, },
            { target: "BLU1", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "batchRun0/BLU1", end_time: in_end_time, enemy_target: in_enemy_target, },
        ];
    }

    function run(args) {
        var main = require("./main");

        var debug_file = "debug.txt";
        var r = main.run(
            args.result_file_prefix,
            args.target,
            args.equipset_aa,
            args.equipset_ws,
            args.end_time,
            args.enemy_target,
            debug_file)
    }

    for (var i = 0; i < args_list.length; ++i) {
        run(args_list[i]);
    }

    var r = {};
    // allのマージ
    for (var i = 0; i < args_list.length; ++i) {
        var prefix = args_list[i].result_file_prefix;

        var jsonData = readJsonFromFile(prefix + "_all.txt");

        for (const k in jsonData) { 
            if (r[k] ) {
                r[k].push(jsonData[k]);
            }else {
                r[k] =[];
                r[k].push(jsonData[k]);
            }
        }
    }

    // マージ結果の出力
    output_to_json("result_" + batchName + ".json.txt",r, true);
    output_to_tsv("result_" + batchName + ".tsv.txt", r);
    return;
}

// JSON
function readJsonFromFile(file) {
    var text = fs.readFileSync(file, 'utf8');

    return JSON.parse(text);
}

// TSV形式出力
function output_to_tsv(output_file, result) {
    // 実行結果ファイル出力
    var result_fd = fs.openSync(output_file, 'w');

    for (var i in result) {
        fs.writeSync(result_fd, i);
        if (result[i]) {
            for (var j = 0; j < result[i].length; ++j) {
                if (result[i][j] == undefined || result[i][j] == null) {
                    fs.writeSync(result_fd, "\t");
                } else if (typeof result[i][j] == "string") {
                    fs.writeSync(result_fd, "\t" + result[i][j]);
                } else if (!isNaN(result[i][j])) {
                    fs.writeSync(result_fd, "\t" + result[i][j]);
                } else {
                    fs.writeSync(result_fd, "\t" + result[i][j]);
                }
            }
        } else {
            fs.writeSync(result_fd, "\t");
        }
        fs.writeSync(result_fd,"\n");
    }

    fs.closeSync(result_fd);
}

// JSON形式出力
function output_to_json(output_file, result, format) {
    // 実行結果ファイル出力
    var result_fd = fs.openSync(output_file, 'w');

    if (format) {
        fs.writeSync(result_fd, JSON.stringify(result, null, 4));
    } else {
        fs.writeSync(result_fd, JSON.stringify(result));
    }

    fs.closeSync(result_fd);
}
