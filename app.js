'use strict';


try {
    var main = require("./main");

    // player
    //var target = "MNK1";
    //var target = "BLU1";
    var target = "MNK3";
    //var target = "CSV1";
    if (process.argv[2]) {
        target = process.argv[2];
    }

    // AA時のequipset番号
    var equipset_aa = 0;
    if (process.argv[3]) {
        equipset_aa = process.argv[3];
    }

    // WS時のequipset番号
    var equipset_ws = 1;
    if (process.argv[4]) {
        equipset_ws = process.argv[4];
    }

    // 出力ファイルの先頭
    var result_file_prefix = "result";
    if (process.argv[5]) {
        result_file_prefix = process.argv[5];
    }

    // 実行時間(分)
    var end_time = 0;
    if (process.argv[6]) {
        end_time = process.argv[6] * 60 * 1000;
    }

    // enemy_target
    var enemy_target = "E2";
    if (process.argv[7]) {
        enemy_target = process.argv[7];
    }

    var debug_file = "debug.txt";
    for (var run_idx = 0; run_idx < 1; ++run_idx) {
        var r = main.run(result_file_prefix, target, equipset_aa, equipset_ws, end_time,enemy_target,debug_file)
    }

} catch (err) {
    console.log(err);
    console.log(err.name + ': ' + err.message);
    process.exit(-1);
}

process.on("exit", function () {
    process.exit(1);
});
