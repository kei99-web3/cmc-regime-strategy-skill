---
type: dorahacks_submission_rewrite_ja
target: BNB HACK / Track 2 Strategy Skills
updated: 2026-06-06
status: japanese_review_draft
---

# DoraHacks 提出文面 改稿版 日本語レビュー

## プロジェクト名

CMC Regime Strategy Skill

## 短い説明

CMC Regime Strategy Skillは、CoinMarketCapの市場データから、AIエージェント向けのStrategy Capsuleと、意思決定者向けのHuman Strategy Reportを同時生成する、BNBエコシステム向けの戦略生成Skillです。

## 長い説明

CMC Regime Strategy Skillは、CoinMarketCapの市場データとシグナルを、AIエージェントが扱えるStrategy Capsuleと、人間の意思決定者が読めるHuman Strategy Reportへ変換します。

Strategy Capsuleは、相場レジーム、データ出所、選定ユニバース、シグナル根拠、エントリー条件、エグジット条件、無効化条件、リスク上限、リプレイ期間、評価指標、ルール遵守条件を含む、バックテスト可能な構造化パッケージです。

Human Strategy Reportは、同じ判断を意思決定者が読める形に変換したHTMLレポートです。なぜそのレジームなのか、なぜその銘柄なのか、どの条件で無効化されるのか、どれくらいのリスクを取るのかをブラウザで確認できます。

このSkillは、まず市場全体の状態をレジームとして判定します。その後、BNBエコシステム内の候補銘柄をランク付けし、現在のレジームに応じてリスク量、最大ポジション数、エントリー条件、無効化条件を調整します。相場が強いときはmomentum expansionとして候補を広げ、相場が不安定なときはselective rotationとしてユニバースとリスクを絞ります。

この設計により、出力は「買う/売る」の単発シグナルではなく、held-out market windowでリプレイ・評価できるStrategy Capsuleと、その判断を人間が理解できるHuman Strategy Reportになります。評価器はreturn、drawdown、risk-adjusted performance、rule adherenceで検証でき、意思決定者はHTMLで判断根拠を確認できます。

デモには3つの実行モードがあります。1つ目は安定した説明のためのfixtureモード。2つ目はCMC Keyless Public APIから実データを取得するlive data proof。3つ目は無料Basic APIキーを使ったCMC Basic API proofです。Basic API版では、公式APIキー付きのCMC Data APIから同じStrategy CapsuleとHuman Strategy Reportを生成できます。

このプロジェクトの狙いは、実行エージェントそのものを作ることではなく、実行前の意思決定レイヤーをSkillとして形にすることです。将来的には、Strategy CapsuleをTrust Wallet Agent KitやBNB Chain上の実行エージェントへ渡し、Human Strategy Reportをポートフォリオ管理者や運用責任者の確認画面として使えます。

## 独自性

- CMC APIを呼ぶだけではなく、複数シグナルをStrategy CapsuleとHuman Strategy Reportへ変換する。
- 市場レジームを先に判定し、リスクとユニバースを動的に変える。
- held-out replay windowを意識した評価項目を出力スキーマに含める。
- AIエージェント向けの機械可読性と、意思決定者向けの説明可能性を両立している。
- fixture安定デモ、Keyless実データ証拠、無料Basic API証拠を持つ。
- Human Strategy Report HTMLを自動生成できる。

## 使用するCMC能力

- CMC Keyless Public API
- CMC Basic API
- CMC market quotes
- global metrics
- fear-and-greed input
- CMC Data API / Data MCP / Agent Hub / Skills Marketplace へ拡張可能なStrategy Capsule schema
- 意思決定者向けHuman Strategy Report出力

## 実行方法

```powershell
cd prototype
npm run fixture
npm run replay
npm run keyless
npm run basic
npm run report
npm test
npm run verify
npm run validate
npm run packcheck
```

生成される主な成果物:

- `demo_strategy_fixture.json`
- `cmc_keyless_strategy_fixture.json`
- `cmc_basic_strategy_fixture.json`
- `human_strategy_report_fixture.html`
- `human_strategy_report_keyless.html`
- `human_strategy_report_basic.html`

## 安全境界

短い説明には入れない。提出本文の後半または補足にだけ書く。

- ウォレット接続なし
- 取引実行なし
- x402支払いなし
- トランザクション署名なし
- APIキーはKeyless版では不要
