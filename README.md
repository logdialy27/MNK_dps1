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

## CSVからのバッチ実行

* 設定はinput1.csvの内容を変更する。
* 結果はresult_batchRun2.tsv.txtにサマリーをまとめて出力される。
* 個別の実行結果はbatchRun2/以下に出力される。

```
# mkdir -p batchRun2/
# node app_batch.js batchRun2
```

* 手順例:input1.csvを一回xlsxで成形してよさそうな設定になったらinput1.csvに名前を変えて保存する。
* 結果はresult_batchRun2.tsv.txtエクセルに張り付ける。

## 個別実行

* 設定はplayer_MNK6.jsを使用する。
* パラメータ設定はplayer_MNK6.jsを参照
* 結果はout/mnk6_result_all_tsv.txtにサマリーを出力する。

```
# mkdir -p out/
# node app.js MNK6 0 1 out/mnk6 
```

## 個別実行(CSV)

* 設定はplayer_CSV1.jsを経由しinput1.tsvを使用する。
* パラメータ設定はinput1.tsvを参照
* 結果はout/csv1_0_1_result_all_tsv.txtにサマリーを出力する。
* input1.tsvの0をAA装備、1をWS装備

```
# mkdir -p out/
# node app.js CSV1 0 1 out/csv1_0_1
```

## バッチ実行1

* 設定はplayer_MNKxとbatchRun1.jsonを使用する。
* 結果はresult_batchRun1.tsv.txtにサマリーをまとめて出力される。
* 個別の実行結果はbatchRun1/以下に出力される。

```
# mkdir -p batchRun1/
# node app_batch.js batchRun1
```

<hr>

# 実行方法詳細「個別実行」

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

# node app.js MNK2 0 1 out/mnk2 1440 E1 # E1/回避1/防御1/VIT187/AGI1
# node app.js MNK2 0 1 out/mnk2 1440 E2 # E2/回避1/防御1/VIT9999/AGI9999
# node app.js MNK2 0 1 out/mnk2 1440 E3 # E3/回避1/防御1/VIT388/AGI353
# node app.js MNK2 0 1 out/mnk2 1440 E4 # E4/回避1/防御884/VIT187/AGI1/ディアIII
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
* MNK7・・・モンク/グランツファウストR15/ビクスマ/WS装備調整
* MNK8・・・モンク/スファライR15/ビクスマ/WS装備調整
* MNK9・・・モンク/ゴッドハンドR15/ビクスマ/WS装備調整
* BLU1・・・青のアルマスのマルチ装備
* CSV1・・・CSVファイルに設定されたテーブルと列番号から各プロパティを取得

※設定項目はそれぞれ独立した値で自動では影響は反映されない。<br>
STR+したら攻撃は別途攻撃も+を加算する。<br>

# enemyの一覧

* E1 ・・・ 防御1,VIT1,AGI1 / 回避1 / 攻防関数キャップ / SV関数キャップ / DEX-AGIキャップ
* E2 ・・・ 防御1,VIT999,AGI9999 / 回避1 / 攻防関数キャップ / SV関数ボトム  / DEX-AGIボトム 
* E3 ・・・ 防御1,VIT388,AGI353 / 回避1 / 攻防関数キャップ / VIT388 / AGI353
* E4 ・・・ 防御884,VIT187,AGI1 / 回避1 / 攻防関数非キャップ / VIT187 / DEX-AGIボトム / ディアIIIが入っている状態

※AGIは回避とは独立した設定で影響しない<br>
※VITは防御とは独立した設定で影響しない<br>

# TODO

## ロジック

* モ青以外のジョブの対応
* WSの種類の追加
* 属性WS
* 遠隔WS
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
* インヒビットTP
* 意気衝天効果アップ(クリティカル+)
* 残心の複数回攻撃
* WSの命中

## その他

* ElectronでUIを作成

## 結果ファイル1 (JSON形式) / result_all.txt 

```
{
    "Player": "MNK6",
    "Enemy": "E1",
    "Desctiption": "ウルス/調整装備",
    "VERSION": "AFbcsKg8sct4",
    "計算時間(秒)": 5.175,
    "target_player": "MNK6",
    "equipset_aa": 0,
    "equipset_ws": 1,
    "Enemy_Desctiption": "\"{\\\"Name\\\":\\\"回避1/防御1/VIT1/AGI1\\\",\\\"STR\\\":1,\\\"DEX\\\":1,\\\"VIT\\\":187,\\\"AGI\\\":1,\\\"INT\\\":1,\\\"MND\\\":1,\\\"CHR\\\":1,\\\"防御\\\":1,\\\"回避\\\":1,\\\"属性耐性2\\\":100}\"",
    "Note": "イオニス/ブドウ大福",
    "経過時間(秒)": 864000,
    "回数:攻撃": 260510,
    "回数:ミス": 14785,
    "回数:クリティカル": 1190224,
    "回数:WS": 101262,
    "回数:ビクトリースマイト": 101262,
    "回数:連携": 49797,
    "合計:攻撃": 361783856,
    "合計:クリティカル": 3033217776,
    "合計:WS": 4220223571,
    "合計:ビクトリースマイト": 4220223571,
    "合計:連携": 2328226960,
    "合計:AA": 3395001632,
    "合計:AA+WS": 7615225203,
    "合計:AA+WS+連携": 9943452163,
    "合計:TP": 100100646,
    "合計:与TP": 18163761,
    "最大:攻撃": 3769,
    "最大:クリティカル": 7285,
    "最大:ビクトリースマイト": 68766,
    "最小:攻撃": 1134,
    "最小:クリティカル": 1489,
    "最小:ビクトリースマイト": 9968,
    "平均:攻撃": "1389",
    "平均:クリティカル": "2548",
    "平均:ビクトリースマイト": "41676",
    "TP:WS実行TP平均": "1152.20",
    "TP:WS得TP平均": "163.67",
    "TP:AA得TP平均": "287.38",
    "TP:与TP平均": "11.00",
    "間隔:AA間隔(秒)": "1.866",
    "間隔:WS間隔(秒)": "8.532",
    "間隔:AA攻撃回数平均": "4.16",
    "間隔:WSターン数": "3.44",
    "命中率": "98.99",
    "クリティカル率": "82.04",
    "クリティカルダメージ割合": "39.83",
    "WSダメージ割合": "55.42",
    "DPS:AA": "3929",
    "DPS:AA+WS": "8814",
    "DPS:AA+WS+連携": "11509"
}
```

## 結果ファイル (TSV形式) / result_all.tsv.txt 

```
Player	MNK6
Enemy	E1
Desctiption	ウルス/調整装備
VERSION	AFbcsKg8sct4
計算時間(秒)	5.175
target_player	MNK6
equipset_aa	0
equipset_ws	1
Enemy_Desctiption	"{\"Name\":\"回避1/防御1/VIT1/AGI1\",\"STR\":1,\"DEX\":1,\"VIT\":187,\"AGI\":1,\"INT\":1,\"MND\":1,\"CHR\":1,\"防御\":1,\"回避\":1,\"属性耐性2\":100}"
Note	イオニス/ブドウ大福
経過時間(秒)	864000
回数:攻撃	260510
回数:ミス	14785
回数:クリティカル	1190224
回数:WS	101262
回数:ビクトリースマイト	101262
回数:連携	49797
合計:攻撃	361783856
合計:ミス	
合計:クリティカル	3033217776
合計:WS	4220223571
合計:ビクトリースマイト	4220223571
合計:連携	2328226960
合計:AA	3395001632
合計:AA+WS	7615225203
合計:AA+WS+連携	9943452163
合計:TP	100100646
合計:与TP	18163761
最大:攻撃	3769
最大:クリティカル	7285
最大:ビクトリースマイト	68766
最小:攻撃	1134
最小:クリティカル	1489
最小:ビクトリースマイト	9968
平均:攻撃	1389
平均:クリティカル	2548
平均:ビクトリースマイト	41676
TP:WS実行TP平均	1152.20
TP:WS得TP平均	163.67
TP:AA得TP平均	287.38
TP:与TP平均	11.00
間隔:AA間隔(秒)	1.866
間隔:WS間隔(秒)	8.532
間隔:AA攻撃回数平均	4.16
間隔:WSターン数	3.44
命中率	98.99
クリティカル率	82.04
クリティカルダメージ割合	39.83
WSダメージ割合	55.42
DPS:AA	3929
DPS:AA+WS	8814
DPS:AA+WS+連携	11509

```

## 結果ファイル / result_sum.txt 

* elasped_timeの単位はミリ秒

```
{
    "elasped_time": 864000000,
    "sum": {
        "TP": 100071114,
        "攻撃": 359971967,
        "与TP": 18157766,
        "クリティカル": 3037843293,
        "WS実行前TP": 116625177,
        "ビクトリースマイト": 4214049964,
        "ビクトリースマイト/得TP": 16554765,
        "ビクトリースマイト/コンサーブTP": 0,
        "WS実行後TP": 16554765,
        "連携": 2324601125,
        "光": 2324601125
    },
    "count": {
        "攻撃": 259289,
        "与TP": 1650706,
        "クリティカル": 1191017,
        "ビクトリースマイト": 101230,
        "連携": 49750,
        "光": 49750,
        "ミス": 14613
    },
    "min": {
        "攻撃": 1134,
        "与TP": 11,
        "クリティカル": 1489,
        "ビクトリースマイト": 8600,
        "連携": 9632,
        "光": 9632
    },
    "max": {
        "攻撃": 3769,
        "与TP": 11,
        "クリティカル": 7285,
        "ビクトリースマイト": 68823,
        "連携": 77081,
        "光": 77081
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

<hr>

# 実行方法詳細「バッチ実行」

コマンドライン
```
# node app_batch.js [name] [input.json]
```

* name・・・実行名
* input.json・・・設定JSONファイル名（省略可）<br>省略時は実行名.json.txtとする。

```
# mkdir batchRun1
# node app_batch.js batchRun1
```

# input_jsonの内容例

* [input.json]の省略時は、[name].json.txtを対象ファイルとする
* player_MNKx.jsを使用した例
* MNK4,5,6,7,8,9をE1で実行する。
* 作業ディレクトリは自動で作成しないので事前に作成する。

batchRun1.json.txt
```
[
{ "target": "BLU1", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/BLU1_E1", "end_time": 86400000, "enemy_target": "E1" },
{ "target": "BLU1", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/BLU1_E2", "end_time": 86400000, "enemy_target": "E2" },
{ "target": "BLU1", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/BLU1_E3", "end_time": 86400000, "enemy_target": "E3" },
{ "target": "BLU1", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/BLU1_E4", "end_time": 86400000, "enemy_target": "E4" },

{ "target": "MNK4", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/MNK4_E1", "end_time": 86400000, "enemy_target": "E1" },
{ "target": "MNK4", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/MNK4_E2", "end_time": 86400000, "enemy_target": "E2" },
{ "target": "MNK4", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/MNK4_E3", "end_time": 86400000, "enemy_target": "E3" },
{ "target": "MNK4", "equipset_aa": 0, "equipset_ws": 1, "result_file_prefix": "batchRun1/MNK4_E4", "end_time": 86400000, "enemy_target": "E4" },
]

```

* player_CSV1.jsを使用した例
* CSV1からAAとWS設定を取得して、E1～E4に対して実行する。

```
# mkdir batchRun2
# node app_batch.js batchRun2
```

batchRun2.json.txt
```
[
{ "target": "CSV1", "equipset_aa": 10, "equipset_ws": 11, "result_file_prefix": "batchRun2/CSV1_10-11_E1", "end_time": 86400000, "enemy_target": "E1" },
{ "target": "CSV1", "equipset_aa": 10, "equipset_ws": 11, "result_file_prefix": "batchRun2/CSV1_10-11_E2", "end_time": 86400000, "enemy_target": "E2" },
{ "target": "CSV1", "equipset_aa": 10, "equipset_ws": 11, "result_file_prefix": "batchRun2/CSV1_10-11_E3", "end_time": 86400000, "enemy_target": "E3" },
{ "target": "CSV1", "equipset_aa": 10, "equipset_ws": 11, "result_file_prefix": "batchRun2/CSV1_10-11_E4", "end_time": 86400000, "enemy_target": "E4" },

{ "target": "CSV1", "equipset_aa": 12, "equipset_ws": 13, "result_file_prefix": "batchRun2/CSV1_12-13_E1", "end_time": 86400000, "enemy_target": "E1" },
{ "target": "CSV1", "equipset_aa": 12, "equipset_ws": 13, "result_file_prefix": "batchRun2/CSV1_12-13_E2", "end_time": 86400000, "enemy_target": "E2" },
{ "target": "CSV1", "equipset_aa": 12, "equipset_ws": 13, "result_file_prefix": "batchRun2/CSV1_12-13_E3", "end_time": 86400000, "enemy_target": "E3" },
{ "target": "CSV1", "equipset_aa": 12, "equipset_ws": 13, "result_file_prefix": "batchRun2/CSV1_12-13_E4", "end_time": 86400000, "enemy_target": "E4" }
]
```

# デバッグ

* setting.jsのDEBUGをtrueにするとdebug.txtに実行中の過程を出力する。
