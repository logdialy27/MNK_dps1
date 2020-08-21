
// デバッグ出力
exports.DEBUG = function () {
    return false;
    //return true;
}
// 最大実行時間
// ミリ秒
exports.end_time = function () {
    // return 120 * 10 * 60 * 1000; // 120分
    //return 6 * 10 * 60 * 1000; // 60分
    //return 1 * 60 * 1000; // 10分
    //return 160 * 1000;
    return 10*24*  60 * 60 * 1000; // 1日
    //return 60 * 24 * 60 * 60 * 1000; // 60日
}

// インターバル
// ミリ秒
exports.interval = function () {
    return 10;
}

// TPがたまってからWSを実行するまでの遅延時間
// オートアタック間隔以内であれば理論上は0と変わらない
// ミリ秒
exports.WS_wait = function () {
    return 100;
}

// WS直後の完全硬直時間
// この間は何も行動できない
exports.WS_noaction_delay = function () {
    return 1000;
}

// JA直後の完全硬直時間
// この間は何も行動できない
exports.JA_noaction_delay = function () {
    return 1000;
}

// WS実施後のAA遅延時間
exports.WS_AA_delay = function () {
    return 2100;
}

// ミシックのAM3が多段WSの二段目に適用するかの設定
exports.MythicAM3のWS適用x2 = function () {
    return false;
}

// 分布の単位
// 100の場合は/100毎
// 1000の場合は/1000毎
exports.dist_unit = function () {
    return 100;
}

// listへの詳細出力項目設定
// 
// 連携詳細の出力
exports.連携詳細 = function () {
    return true;
}

// クリティカルの詳細1
exports.クリティカル詳細1 = function () {
    return false;
}

// クリティカルの詳細2
// [クリ率,判定結果(true or false)]
exports.クリティカル詳細2 = function () {
    return false;
}
