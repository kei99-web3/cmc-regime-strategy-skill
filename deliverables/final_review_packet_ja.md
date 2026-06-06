---
type: final_review_packet
target: BNB HACK / CMC Regime Strategy Skill
updated: 2026-06-06
status: user_review_required_before_external_submission
---

# BNB HACK 最終レビュー用パケット

## 先に結論

提出まで進める価値はあります。

理由は、Track 2 の募集意図にかなり素直に合っているからです。主催者は「ライブ売買bot」ではなく「市場データから backtestable spec を生成する CMC Skill」を求めています。この企画はその中心に CMC Data & Signal を置いており、さらに無料・APIキー不要の CMC Keyless Public API で実データ証拠も作れています。

## 企画名

CMC Regime Strategy Skill

## 一言説明

CoinMarketCapの市場データを読み、BNBエコシステムの相場レジームを判定し、売買実行ではなく backtestable な戦略仕様書を生成する Track 2 向け CMC Skill。

## 審査員に伝える勝ち筋

1. CMCデータが主役である。
2. 出力が曖昧なアイデアではなく、entry / exit / invalidation / risk / replay metrics を持つ機械可読specである。
3. ライブ売買、ウォレット接続、取引、x402支払いをしないので Track 2 の「not a live agent」に合っている。
4. fixture版で安定した説明を見せ、keyless実データ版で sponsor capability の実利用を見せる。
5. 実データが弱い相場のときは `selective_rotation` に落としてリスクを下げるので、都合の良いシグナル生成ではない。

## 現在の実データ版出力

`npm run keyless` により、CMC Keyless Public APIから `BNB / CAKE / TWT` とglobal/fear-greed系のデータを取得済み。

- regime: `selective_rotation`
- selected universe: `BNB`, `CAKE`
- max portfolio risk: `1%`
- max open positions: `2`
- replay projected return: `4.41%`
- replay max drawdown: `1.8%`
- rule adherence: `1`

## CMC API / MCP について

有料プランは今すぐ不要です。

- CMC Keyless Public API: 無料、APIキー不要、サインアップ不要。今回の提出証拠に使う。
- CMC Basic API: 無料だが、アカウント作成とAPIキー管理が必要。
- CMC MCP: APIキーが必要。無料Basicキーでいける可能性はあるが、資格情報を扱うので承認ゲート。
- x402: APIキー不要だが、0.01 USDC/call の支払いが発生するので今回は使わない。

## あなたにレビューしてほしい点

1. 企画名と説明がしっくりくるか。
2. 「fixture + keyless実データ」の二段構えで十分か。
3. CMC Basic APIキー/MCPまで使うべきか、それともkeylessで提出するか。
4. public GitHub repoとして公開して問題ない内容か。
5. デモ動画の見せ方で、もっと強調したい視点があるか。

## 私の推奨

まずは CMC Keyless Public API 版で提出準備を進めるのが良いです。

CMC Basic API/MCPは、時間に余裕があり、ユーザーがAPIキー管理を許可する場合だけ追加するのが安全です。x402は支払い・ウォレットが絡むため、今回は使わない方がよいです。

## 未実行の外部アクション

- public GitHub repo 作成・push
- DoraHacks 登録・提出
- CMC Basic APIキー取得
- CMC MCP設定
- x402支払い
- Trust Wallet / BNB Chain実行
- 動画アップロード

## 次の承認後アクション

ユーザーがこの内容をレビューしてOKなら、次は以下を実行します。

1. sanitized public repo を作成・公開
2. demo video を作成・アップロード
3. DoraHacks submission fields を最終入力
4. 送信直前に最終確認
