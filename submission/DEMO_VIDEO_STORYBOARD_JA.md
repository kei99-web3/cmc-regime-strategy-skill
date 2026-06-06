---
type: demo_video_storyboard_ja
target: BNB HACK / CMC Regime Strategy Skill
updated: 2026-06-06
status: revised_after_user_feedback
---

# デモ動画構成 改稿版

## 方針

否定から入らない。

動画の主役は「ライブ売買しないこと」ではなく、「CMC signalsがStrategy CapsuleとHuman Strategy Reportに変換され、機械評価と人間の意思決定の両方に使えること」。

## 0:00-0:15 何を作ったか

見せる内容:

- CMC Regime Strategy Skill
- CMC signals → Strategy Capsule + Human Strategy Report
- Backtest-ready / agent-readable / decision-maker-readable

話す内容:

「このSkillは、CoinMarketCapの市場データから、AIエージェント向けのStrategy Capsuleと、意思決定者向けのHuman Strategy Reportを同時生成します。」

## 0:15-0:40 CMCデータ入力

見せる内容:

- Keyless Public APIの実行
- BNB / CAKE / TWT
- global metrics / fear-greed

話す内容:

「デモでは、CMC Keyless Public APIから実データを取得します。APIキーや有料プランなしでも、CMCデータを使った実行証拠を作れます。」

## 0:40-1:10 Regime-firstの独自性

見せる内容:

- `selective_rotation`
- 選定ユニバース: BNB / CAKE
- risk budget: 1%

話す内容:

「このSkillは銘柄を先に選ぶのではなく、まず市場レジームを判定します。現在のデータではselective rotationと判断し、リスクと候補数を落とします。」

## 1:10-1:40 Strategy Capsule

見せる内容:

- entry rules
- exit rules
- invalidation rules
- replay metrics
- rule adherence

話す内容:

「Strategy Capsuleはバックテスト評価できる機械可読パッケージです。評価器や次段エージェントが読めるように、ルール・リスク・評価指標を構造化しています。」

## 1:40-2:05 Human Strategy Report

見せる内容:

- HTML report
- regime explanation
- selected / rejected assets
- risk and invalidation
- decision summary

話す内容:

「同じ判断を、人間の意思決定者が読めるHTMLレポートにも変換します。なぜこの戦略なのか、どこで無効化するのか、どれだけリスクを取るのかをブラウザで確認できます。」

## 2:05-2:25 Replay and scoring

見せる内容:

- replay projected return
- max drawdown
- rule adherence
- `npm run packcheck`

話す内容:

「審査では、リターンだけでなく、ドローダウン、リスク調整、ルール遵守が重要です。このSkillは最初からその評価形式に合わせています。」

## 2:25-2:45 Agent stack handoff

見せる内容:

- CMC Data / MCP / Skills Marketplace
- Future handoff to Trust Wallet / BNB Chain execution agents

話す内容:

「Track 2ではここで止めますが、このStrategy Capsuleは将来、Trust WalletやBNB Chain実行エージェントへ渡す意思決定レイヤーになります。」

## 2:45-2:55 Safety boundary

見せる内容:

- no wallet
- no transaction
- no payment

話す内容:

「このデモでは、ウォレット接続、支払い、取引実行は行いません。Track 2の戦略生成Skillとして提出します。」
