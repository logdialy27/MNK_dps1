'use strict';

exports.start = function () {
    // シングル実行
    var main = require("./main");

    // player
    //var target = "MNK1";
    //var target = "BLU1";
    var target = "MNK8";
    //var target = "CSV1";
    // AA時のequipset番号
    var equipset_aa = 0;
    // WS時のequipset番号
    var equipset_ws = 1;
    // 出力ファイルの先頭
    var result_file_prefix = "result";
    // 実行時間(分)
    var end_time = 0;
    // enemy_target
    var enemy_target = "E1";

    if (process.argv[2]) {
        target = process.argv[2];
    }

    if (process.argv[3]) {
        equipset_aa = process.argv[3];
    }

    if (process.argv[4]) {
        equipset_ws = process.argv[4];
    }

    if (process.argv[5]) {
        result_file_prefix = process.argv[5];
    }

    if (process.argv[6]) {
        end_time = process.argv[6] * 60 * 1000;
    }

    if (process.argv[7]) {
        enemy_target = process.argv[7];
    }

    var debug_file = "debug.txt";
    for (var run_idx = 0; run_idx < 1; ++run_idx) {
        var r = main.run(result_file_prefix, target, equipset_aa, equipset_ws, end_time, enemy_target, debug_file)
    }
}