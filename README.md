# MNK_dps1

FFXIのモンクのDPSシミュレータ

# バージョン

WqXG786Xivqb

バージョンは数値ではなく文字列で管理予定

# 開発言語

* Node.js

# 実行環境

* Node.jsが動作する環境
* Window/Linux/Mac

# 実行方法

## Linux(CentOS7)

### 環境準備

```
# curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
# sudo yum install gcc-c++ make
# sudo yum install nodejs
# sudo yum install git
````

### ファイルの取得

```
# git clone https://github.com/logdialy27/MNK_dps1.git
# cd MNK_dps1
# npm install
```

<hr> 
# 簡単な使用例

## 個別実行

* 設定はMNK6.jsを使用する。
* 結果はout/result_all_tsv.txtがサマリー出力する。

```
# mkdir -p out/
# node app.js MNK6 0 1 out/mnk6 
```

## バッチ実行

* 設定はinput1.csvとbatch1.jsonを使用する。
* 結果はbatch1_all_tsv.txtがサマリー出力される。
* 個別の実行結果はbatch1/以下に出力される。

```
# mkdir -p batch1/
# node app_batch.js batch1.json batch1
```

<hr>

# 実行方法詳細「個別実行」

バッチ実行(一括実行については後述)

コマンドライン
```
# node app.js [player] [equipset_aa] [equipset_ws] [output_prefix] [end_time] [enemy]
```

* player・・・実行対象で、player_XXX.jsのXXX部分、BLU1,MNK1,MNK2,CSV1のいずれかを指定
* equipset_aa・・・オートアタック時のequipset番号、主にCSV1の場合に指定それ以外の場合は0を指定
* equipset_ws・・・WS時のequipset番号、主にCSV1の場合に指定それ以外の場合は0を指定
* output_prefix・・・結果出力ファイルの先頭部で、ディレクトリを含むと出力ディレクトリを指定できる。
* end_time・・・シミュレーションの仮想実行時間で分単位で指定、未指定時はsetting.jsの値で10分
* enemy・・・モンスター側の対象でenemy_XXX.jsのXXXの部分を指定する.

### 実行例

```
# mkdir -p out/

# node app.js MNK1 
# node app.js MNK2 

# node app.js BLU1 0 1 out/blu1 
# node app.js MNK2 0 1 out/mnk2 

# node app.js MNK2 0 1 out/mnk2 60 # 1時間
# node app.js MNK2 0 1 out/mnk2 1440 # 24時間
# node app.js MNK2 0 1 out/mnk2 43200 # 30日

# node app.js MNK2 0 1 out/mnk2 1440 E1 # 回避1,防御1,VIT1,AGI1
# node app.js MNK2 0 1 out/mnk2 1440 E2 # 回避1,防御1,VIT1,AGI9999
# node app.js MNK2 0 1 out/mnk2 1440 E3 # 回避1,防御884,VIT187,AGI1
# node app.js MNK2 0 1 out/mnk2 1440 E4 # 回避1,防御884,VIT187,AGI9999
```

CSV1の5列目をAA設定、6列目をWS設定で実行<br>
防御1,DEX-AGIキャップ<br>
```
# node app.js CSV1 5 6 out/CSV1-aa5-ws6 1440 E1
```

CSV1の7列目をAA設定、8列目をWS設定で実行<br>
防御1,DEX-AGIキャップ<br>
```
# node app.js CSV1 7 8 out/CSV1-aa7-ws8 1440 E1
```

## Windowsの場合

node.jsのインストール

https://nodejs.org/ja/

# 結果

カレントディレクトリにファイルを出力

* result_all.txt ・・・実行結果のまとめ(JSON)
* result_sum.txt ・・・各種合計値(JSON)
* result_list.txt ・・・各種値の履歴(JSON)、WSならWSの実行結果が全部
* result_dist.txt・・・分布、WSの実行結果を対象でWSダメージ値/100単位で発生数を集計

既にファイルがある場合は上書きされる<br>
resultの部分は、引数で変更可能<br>

# playerの一覧

* MNK1・・・モンクのWSマルチ装備
* MNK2・・・モンクのWSクリティカル装備
* MNK3・・・モンク/ウルスラグナR15/ビクスマ/WS装備テスト用
* MNK4・・・モンク/カランビット/ビクスマ/WS装備調整
* MNK5・・・モンク/サギッタA/ビクスマ/WS装備調整
* MNK6・・・モンク/ウルスラグナR15/ビクスマ/WS装備調整
* BLU1・・・青のアルマスのマルチ装備
* CSV1・・・(作業中)CSVファイルに設定されたテーブルと列番号から各プロパティを取得,「CSV1について」を参照

# enemyの一覧

* E1 ・・・ 防御1,VIT1,AGI1 / 回避1 / 攻防関数キャップ / SV関数キャップ / DEX-AGIキャップ
* E2 ・・・ 防御1,VIT999,AGI9999 / 回避1 / 攻防関数キャップ / SV関数ボトム  / DEX-AGIボトム 
* E3 ・・・ 防御1,VIT388,AGI353 / 回避1 / 攻防関数キャップ / VIT388 / AGI353
* E4 ・・・ 防御884,VIT187,AGI1 / 回避1 / 攻防関数非キャップ / VIT187 / DEX-AGIボトム / ディアIIIが入っている状態

※AGIは回避とは独立した設定で影響しない
※VITは回避とは独立した設定で影響しない

# TODO

## ロジック

* DPSの測定値(テスト中)
* モ青以外のジョブの対応
* WSの種類の追加
* 与TP
* 属性WS
* 遠隔WS
* 残心
* 猫足
* アンバスの武器のプロパティ対応
* ジャンプなどの与ダメージのアビリティ
* モンスターのガード、盾、受け流し
* エン魔法の魔命判定
* 累積魔法耐性
* モンスターのカット率(物理、魔法、武器種類)
* イナンデーション
* 究極連携
* イオニックのAM
* 不意打ち/だまし討ち

## その他

* ElectronでUIを作成

## 結果ファイル / result_all.txt 

```
{
    "VERSION": "GBBunEBV7WwP",
    "target_player": "MNK2",
    "equipset_aa": 0,
    "equipset_ws": 1,
    "target_enemy": "E3",
    "Enemy": "\"{\\\"Name\\\":\\\"回避1/防御884/VIT1/AGI1/ディアIII\\\",\\\"STR\\\":1,\\\"DEX\\\":1,\\\"VIT\\\":1,\\\"AGI\\\":1,\\\"INT\\\":1,\\\"MND\\\":1,\\\"CHR\\\":1,\\\"防御\\\":707.2,\\\"回避\\\":1}\"",
    "Player": "MNK/WAR/ビクスマ/クリティカル",
    "経過時間(秒)": 3600,
    "回数:攻撃": 1493,
    "回数:ミス": 62,
    "回数:クリティカル": 4590,
    "回数:WS": 411,
    "回数:ビクトリースマイト": 411,
    "回数:連携": 199,
    "合計:攻撃": 1155052,
    "合計:クリティカル": 7733970,
    "合計:WS": 10448219,
    "合計:ビクトリースマイト": 10448219,
    "合計:連携": 5688924,
    "合計:AA": 8889022,
    "合計:AA+WS": 19337241,
    "合計:AA+WS+連携": 25026165,
    "合計:AA+エン": null,
    "合計:AA+エン+WS": null,
    "合計:AA+エン+WS+連携": null,
    "合計:TP": 419727,
    "合計:与TP": 0,
    "最大:攻撃": 2495,
    "最大:クリティカル": 5302,
    "最大:ビクトリースマイト": 44601,
    "最小:攻撃": 502,
    "最小:クリティカル": 839,
    "最小:ビクトリースマイト": 7496,
    "平均:攻撃": 773.6450100468854,
    "平均:クリティカル": 1684.9607843137255,
    "平均:ビクトリースマイト": 25421.457420924573,
    "TP:WS実行TP平均": 1171.9367396593675,
    "TP:WS得TP平均": 152.12895377128953,
    "TP:AA得TP平均": 286.69877049180326,
    "TP:与TP平均": 0,
    "間隔:WS実行間隔": 8749.90243902439,
    "命中率": 98.99104963384866,
    "クリティカル率": 75.45618938024002,
    "クリティカルダメージ割合": 39.99520924417294,
    "WSダメージ割合": 54.03159116649577,
    "(テスト中)DPS:AA": 2469.172777777778,
    "(テスト中)DPS:AA+WS": 5371.455833333333,
    "(テスト中)DPS:AA+WS+連携": 6951.7125,
    "(テスト中)DPS:AA+エン": null,
    "(テスト中)DPS:AA+エン+WS": null,
    "(テスト中)DPS:AA+エン+WS+連携": null
}
```

## 結果ファイル / result_sum.txt 

* elasped_timeの単位はミリ秒

```
{
    "elasped_time": 5184000000,
    "sum": {
        "TP": 600800595,
        "攻撃": 4832766451,
        "クリティカル": 13465523455,
        "WS実行前TP": 695445622,
        "ビクトリースマイト": 24315098619,
        "ビクトリースマイト/得TP": 94645802,
        "WS実行後TP": 94645802,
        "連携": 13290176684,
        "光": 13290176684
    },
    "count": {
        "攻撃": 3475388,
        "クリティカル": 5231867,
        "ビクトリースマイト": 597268,
        "連携": 291185,
        "光": 291185,
        "ミス": 88159
    },
    "min": {
        "攻撃": 1134,
        "クリティカル": 1489,
        "ビクトリースマイト": 6377,
        "連携": 7142,
        "光": 7142
    },
    "max": {
        "攻撃": 3769,
        "クリティカル": 7285,
        "ビクトリースマイト": 68731,
        "連携": 76978,
        "光": 76978
    }
}
```

### 結果ファイル / result_dist.txt 

WSのダメージ分布でダメージ値/100単位で発生回数を集計

```
{"dist":{"ビクトリースマイト":{... "459":1480,"460":2285,"461":3356,"462":4328,"463":5059,"464":5174,  ... }}
```

### 結果ファイル / result_list.txt

* historyは+がターン毎のヒット数で、-1がWSの実施で「5,3,5,4,-1」なら、5振り、3振り、5振り、4振りでTPがたまってWS実行
* 連携詳細は[連携ダメージ,WSダメージ,連携LV,連携数,連携倍率,耐性]

```
{"list":{"攻撃":[1211, ... ,2346,2411,2299],"history":[5,3,5,4,-1,5,4,2,6,-1,7,5,6,-1,6,3,5,-1,5,4,3,2,-1,3,4,3,4,-1,3,4,3,6,-1,3,5,4,3,-1,2,6,2,3,-1,5,5,2,5,-1,4,6,6,-1,8,4,5,-1,3,3,4,5,-1,3,3,4,4,-1,4,4,2,3,-1,5,3,6,-1,4,3,4,4,-1,5,3,2,4,-1,6,4,5,-1,3,3,5,4,-1],"TP":[345,207,345, ... ,345,207,207,345,276],"ビクトリースマイト":[32503,34598,63201, ... ,9580,7710,9580],"連携":[38749,23800,45492,38016,56796,51845,37821,36718,36495,37493],"光":[38749,23800,45492,38016,56796,51845,37821,36718,36495,37493],"連携詳細:光":[[38749,34598,3,1,1,100],[23800,21250,3,1,1,100],[45492,40618,3,1,1,100],[38016,33943,3,1,1,100],[56796,50711,3,1,1,100],[51845,46291,3,1,1,100],[37821,33769,3,1,1,100],[36718,32784,3,1,1,100],[36495,32585,3,1,1,100],[37493,33476,3,1,1,100]]}}
```

# デバッグ

* setting.jsのDEBUGをtrueにするとdebug.txtに実行中の過程を出力する。

<hr>

# 実行方法詳細「バッチ実行」

コマンドライン
```
# node app_batch.js [input_json] [name]
```

* input_json・・・バッチ実行の設定ファイルJSON 
* name・・・実行名

```
# node app_batch.js MNKb1_input.json MNKb1

```

# input_jsonの内容

player_MNKx.jsを使用した例
MNK4,5,6,7,8をE3で実行する。
```
[
        { target: "MNK8", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "MNK8", end_time: 0, enemy_target: "E3" },
        { target: "MNK7", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "MNK7", end_time: 0, enemy_target: "E3", },
        { target: "MNK6", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "MNK6", end_time :0, enemy_target: "E3", },
        { target: "MNK5", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "MNK5", end_time :0, enemy_target: "E3", },
        { target: "MNK4", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "MNK4", end_time: 0, enemy_target: "E3", },
];
```

player_CSV1.jsを使用した例
CSV1からAAとWS設定を取得して、E1～E4に対して実行する。
```
[
        { target: "CSV1", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "CSV1_0_1_E1", end_time: 0, enemy_target: "E1", },
        { target: "CSV1", equipset_aa: 2, equipset_ws: 3, result_file_prefix: "CSV1_2_3_E1", end_time: 0, enemy_target: "E1", },
        { target: "CSV1", equipset_aa: 4, equipset_ws: 5, result_file_prefix: "CSV1_4_5_E1", end_time :0, enemy_target: "E1", },
        { target: "CSV1", equipset_aa: 6, equipset_ws: 7, result_file_prefix: "CSV1_6_7_E1", end_time :0, enemy_target: "E1", },
        { target: "CSV1", equipset_aa: 8, equipset_ws: 9, result_file_prefix: "CSV1_7_9_E1", end_time: 0, enemy_target: "E1", },

        { target: "CSV1", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "CSV1_0_1_E2", end_time: 0, enemy_target: "E2", },
        { target: "CSV1", equipset_aa: 2, equipset_ws: 3, result_file_prefix: "CSV1_2_3_E2", end_time: 0, enemy_target: "E2", },
        { target: "CSV1", equipset_aa: 4, equipset_ws: 5, result_file_prefix: "CSV1_4_5_E2", end_time :0, enemy_target: "E2", },
        { target: "CSV1", equipset_aa: 6, equipset_ws: 7, result_file_prefix: "CSV1_6_7_E2", end_time :0, enemy_target: "E2", },
        { target: "CSV1", equipset_aa: 8, equipset_ws: 9, result_file_prefix: "CSV1_7_9_E2", end_time: 0, enemy_target: "E2", },

        { target: "CSV1", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "CSV1_0_1_E3", end_time: 0, enemy_target: "E3", },
        { target: "CSV1", equipset_aa: 2, equipset_ws: 3, result_file_prefix: "CSV1_2_3_E3", end_time: 0, enemy_target: "E3", },
        { target: "CSV1", equipset_aa: 4, equipset_ws: 5, result_file_prefix: "CSV1_4_5_E3", end_time :0, enemy_target: "E3", },
        { target: "CSV1", equipset_aa: 6, equipset_ws: 7, result_file_prefix: "CSV1_6_7_E3", end_time :0, enemy_target: "E3", },
        { target: "CSV1", equipset_aa: 8, equipset_ws: 9, result_file_prefix: "CSV1_7_9_E3", end_time: 0, enemy_target: "E3", },

        { target: "CSV1", equipset_aa: 0, equipset_ws: 1, result_file_prefix: "CSV1_0_1_E4", end_time: 0, enemy_target: "E4", },
        { target: "CSV1", equipset_aa: 2, equipset_ws: 3, result_file_prefix: "CSV1_2_3_E4", end_time: 0, enemy_target: "E4", },
        { target: "CSV1", equipset_aa: 4, equipset_ws: 5, result_file_prefix: "CSV1_4_5_E4", end_time :0, enemy_target: "E4", },
        { target: "CSV1", equipset_aa: 6, equipset_ws: 7, result_file_prefix: "CSV1_6_7_E4", end_time :0, enemy_target: "E4", },
        { target: "CSV1", equipset_aa: 8, equipset_ws: 9, result_file_prefix: "CSV1_7_9_E4", end_time: 0, enemy_target: "E4", },
        
];
```
