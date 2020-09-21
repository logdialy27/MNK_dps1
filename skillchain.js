
// WSの履歴
var history_ws = [];
// { time: 0 , dmg : 0 , name : "" , player : ""}

// 連携の履歴
var history_chain = [];
// { time: 0 , ws_dmg : 0 , lv : 1 , name : "" , player : ""}

// 連携の受付時間のテーブル
const table_sc_timelimit = [
    10, 9, 8, 7, 6, 5,
];

// WSの連携属性
const table_ws_element = {
    "シャンデュシニュ": ["光", "湾曲"],
    "ビクトリースマイト": ["光", "分解"],
    "四神円舞":["核熱","振動"],
    "ウッコフューリー": ["光", "分解"],
    "サベッジブレード": ["分解","切断"],
    "トアクリーバー": ["光", "湾曲"],
    "祖之太刀・不動": ["光", "湾曲"],
}

// イオニックのAM状態の連携属性
const table_ws_element_AM = {
    "四神円舞": ["光","核熱", "振動"],
}

// 連携毎の属性一覧
const table_skillchain_element = {
    "溶解": ["火"],
    "硬化": ["氷"],
    "炸裂": ["風"],
    "切断": ["土"],
    "衝撃": ["雷"],
    "振動": ["水"],
    "貫通": ["光"],
    "収縮": ["闇"],
    "核熱": ["火", "光"],
    "重力": ["土", "闇"],
    "分解": ["風", "雷"],
    "湾曲": ["氷", "水"],
    "光": ["火", "風", "雷", "光"],
    "闇": ["氷", "土", "水", "闇"],
    "極光": ["火", "風", "雷", "光"],
    "黒闇": ["氷", "土", "水", "闇"],
};

exports.push_ws = function (current_time, name, dmg,player) {

    var t = {
        "time": current_time,
        "name": name,
        "dmg": dmg,
        "player": player.Name(),
        "wt": player.WeaponType()
    };

    history_ws.push(t);
}

// 連携の発生状態
exports.last = function (player, line) {

    if (history_chain.length == 0) {
        // 連携は発動していない
        // WSの状態を確認
        if (history_ws.length <= 1) {
            // WS未実施 or 最初の一回目
            history_chain = [];
            return false;
        }

        // この配列は二個でいいのでシフトがいいかも？
        var w2 = history_ws[history_ws.length - 2];
        var w1 = history_ws[history_ws.length - 1];

        // WS→WS→連携は特別処理
        if ((w1.time - w2.time) > table_sc_timelimit[0] * 1000) {
            // N秒経過しているため連携未発生
            line["連携判定:時間超過"] = w1.time - w2.time;
        } else {
            line["連携判定:時間有効"] = w1.time - w2.time;

            var t2_list = table_ws_element[w2.name];
            if (t2_list == null) {
                line["連携判定:WS名未定義"] = w1.name;
            } else {
                // WS2->WS1の場合はWS2の属性
                for (var i = 0; i < t2_list.length; ++i) {
                    // WSの連携属性
                    var t = t2_list[i];
                    // 
                    var ret = test(t, table_ws_element[w1.name]);

                    if (ret == null) {
                        // 連携未発生
                    } else {
                        // 連携発生
                        // ret[0] = 連携名
                        // ret[1] = 発生した連携LV
                        // ret[2] = 発生されたWSの連携LV

                        history_chain.push({
                            "time": line["current_time"],
                            "ws_dmg": w1.dmg,
                            "ws_lv": ret[2],
                            "name": ret[0],
                            "lv": ret[1],
                            "player": player.Name()
                        });

                        return true;
                    }
                }
            }
        }
        // 連携未発生
        history_chain = [];
        return false;
    } else {
        // 連携の末尾取得
        var last_sc = history_chain[history_chain.length - 1];

        // WSの末尾取得
        var w1 = history_ws[history_ws.length - 1];

        var timelimit = 0;
        if (history_chain.length < table_sc_timelimit.length) {
            timelimit = table_sc_timelimit[history_chain.length];
        } else {
            timelimit = table_sc_timelimit[table_sc_timelimit.length - 1]
        }

        if ((w1.time - last_sc.time) > timelimit * 1000) {
            // N秒経過しているため連携未発生
            line["連携判定:時間超過"] = w1.time - last_sc.time;
        } else {
            line["連携判定:時間有効"] = w1.time - last_sc.time;

            // 連携とWSで発動連携を取得
            var ret = test(last_sc.name, table_ws_element[w1.name]);

            // 光or闇の場合は、3(3)→3なのか、3(2)→3かを判定()の中が採用したWSの連携属性のLV
            if (ret == null) {
                // 連携未発生
            } else {
                if (ret[1] == 3) {
                    // 発動連携がLV3の場合
                    if (last_sc.ws_lv == 3) {
                        // ビクスマ→ビクスマ→ビクスマは発生しない
                        // 連携未発生
                        line["連携:光(ws_lv=3)→光(3) or 闇(ws_lv=3)→闇(3)"] = "発生なし";
                    } else {
                        // 連携発生
                        history_chain.push({
                            "time": line["current_time"],
                            "ws_dmg": w1.dmg,
                            "ws_lv": ret[2], // 適用したWSの連携LV
                            "name": ret[0],
                            "lv": ret[1],
                            "player": player.Name()
                        });
                        return true;
                    }
                } else {
                    // 連携発生
                    history_chain.push({
                        "time": line["current_time"],
                        "ws_dmg": w1.dmg,
                        "ws_lv": ret[2], // 適用したWSの連携LV
                        "name": ret[0],
                        "lv": ret[1],
                        "player": player.Name()
                    });
                    return true;
                }
            }
        }
    }

    history_chain = [];
    return false;
}

// 最後のWSダメージ
exports.get_last_ws_dmg = function () {
    if (history_ws.length != 0) {
        return history_ws[history_ws.length - 1].dmg;
    } else {
        return 0;
    }
}

// 連携回数の返却
// WSの回数ではなく発動した連携の回数
exports.get_last_count = function () {
    return history_chain.length;
}

// 発動した連携LV
exports.get_last_lv = function () {
    if (history_chain.length != 0) {
        return history_chain[history_chain.length - 1].lv;
    } else {
        return 0;
    }
}

// 発生した連携名
exports.get_last_name = function () {
    if (history_chain.length != 0) {
        return history_chain[history_chain.length - 1].name;
    } else {
        return null;
    }
}

// 発生した連携の属性一覧
exports.get_last_element = function () {
    var name = this.get_last_name()
    if (name == null) {
        return ["火", "氷", "風", "土", "雷", "水", "光", "闇"];
    } else {
        return table_skillchain_element[name];
    }
}

// LVと段数毎の連携倍率取得
// 究極連携は4
exports.連携倍率=function(count,lv){
    const table = {
        1: [50, 60, 70, 80 ], 
        2: [60, 75,100,125], 
        3: [100, 150, 175, 200, 225, 250], 
        4: [150, 180, 210, 240, 270, 300], 
    }

    if (table[lv])
    {
        if (count < table[lv].length) {
            return table[lv][count - 1];
        } else {
            // テーブル範囲外は末尾の値を採用
            return table[lv][table[lv].length - 1];
        }
    }

    // テーブル外の場合は100%
    return 100;
}

// from to の発生条件
// LV2+LV2光→LV3光→光のチェックは別にしないといけない
// ws(2),3,[3]の場合は発動,ws(3),3,[3]は発動できない
function test(last, ws) {
    // last = "連携名"
    // ws = ["光","湾曲"]
    // ret = ["発生連携",発生した連携LV,適用したWSの連携属性LV]
    // ret = nullの場合は連携発生しない

    // テーブルでも可能そうだが制御で実装
    if (last == "溶解") {
        if (ws.includes("切断")) {
            return ["切断",1,1];
        }
        if (ws.includes("衝撃")) {
            return ["核熱", 2, 1];
        }
    } else if (last == "硬化") {
        if (ws.includes("衝撃")) {
            return ["衝撃", 1, 1];
        }
        if (ws.includes("収縮")) {
            return ["収縮", 1, 1];
        }
        if (ws.includes("振動")) {
            return ["分解", 2, 1];
        }
    } else if (last == "切断") {
        if (ws.includes("溶解")) {
            return ["溶解", 1, 1];
        }
        if (ws.includes("炸裂")) {
            return ["炸裂", 1, 1];
        }
        if (ws.includes("振動")) {
            return ["振動", 1, 1];
        }
    } else if (last == "衝撃") {
        if (ws.includes("溶解")) {
            return ["溶解", 1, 1];
        }
        if (ws.includes("炸裂")) {
            return ["炸裂", 1, 1];
        }
    } else if (last == "振動") {
        if (ws.includes("硬化")) {
            return ["硬化", 1, 1];
        }
        if (ws.includes("衝撃")) {
            return ["衝撃", 1, 1];
        }
    } else if (last == "貫通") {
        if (ws.includes("振動")) {
            return ["振動", 1, 1];
        }
        if (ws.includes("収縮")) {
            return ["収縮", 1, 1];
        }
        if (ws.includes("切断")) {
            return ["湾曲", 2, 1];
        }
    } else if (last == "収縮") {
        if (ws.includes("炸裂")) {
            return ["炸裂", 1, 1];
        }
        if (ws.includes("貫通")) {
            return ["貫通", 1, 1];
        }
    // LV2
    } else if (last == "核熱") {
        if (ws.includes("分解")) {
            return ["光", 3, 2];
        }
        if (ws.includes("重力")) {
            return ["重力", 2, 2];
        }
    } else if (last == "湾曲") {
        if (ws.includes("重力")) {
            return ["闇", 3, 2];
        }
        if (ws.includes("核熱")) {
            return ["核熱", 2, 2];
        }
    } else if (last == "分解") {
        if (ws.includes("核熱")) {
            return ["光", 3, 2];
        }
        if (ws.includes("湾曲")) {
            return ["湾曲", 2, 2];
        }
    } else if (last == "重力") {
        if (ws.includes("湾曲")) {
            return ["闇", 3, 2];
        }
        if (ws.includes("分解")) {
            return ["分解", 2, 2];
        }
    // LV3
    } else if (last == "光") {
        if (ws.includes("光")) {
            return ["光", 3, 3];
        }
    } else if (last == "闇") {
        if (ws.includes("闇")) {
            return ["闇", 3, 3];
        }
    }
    // TODO:LV4判定は別途アフマス状態で判定

    return null;
}

// 連携の適用属性決定
exports.連携の適用属性 = function (count,element_all, enemy, line) {

    if (element_all.length == 0) {
        // 連携属性定義誤り
        return "光";
    }

    var e_ret = null;
    var e_max = 0;
    for (var i = 0; i < element_all.length; ++i) {
        var e = element_all[i];
        var e_v = enemy.属性耐性2(e);

        // 耐性ダウンの段数を取得
        var e_down = enemy.debuff_耐性ダウン(e,(count > 1));

        // 耐性ダウン適用
        e_v = test2(e_v, e_down, line);

        if (e_v > e_max) {
            e_max = e_v;
            e_ret = e;
        }
    }
    if (e_ret == null) {
        e_ret = element_all[0];
    }

    line["連携:適用属性"] = e_ret;
    line["連携:適用属性値"] = e_max;
    return e_ret;
}

// 耐性ダウン後の耐性値の取得
function test2(e_v, e_down,line) {

    const t = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 85, 100, 115, 130, 150];

    line["耐性ダウン:value"] = e_v;
    line["耐性ダウン:down"] = e_down;

    for (var i = 0; i < t.length; ++i) {
        if (t[i] == e_v) {

            if (t[i + e_down]) {
                e_v = t[i + e_down];
            } else {
                e_v = t[t.length - 1];
            }

            line["耐性ダウン:r"] = e_v;
            return e_v;
        }
    }

    line["耐性ダウン:r0"] = e_v;
    return e_v;
}