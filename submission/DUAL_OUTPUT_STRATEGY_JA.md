---
type: dual_output_strategy
target: BNB HACK / CMC Regime Strategy Skill
updated: 2026-06-06
status: approved_direction
---

# 二層出力方針

## 方針

CMC Regime Strategy Skillは、CMCの市場データから次の2つを同時生成するSkillとして見せる。

1. AIエージェント向け Strategy Capsule
2. 意思決定者向け Human Strategy Report

## なぜ強いか

Track 2はbacktestable specを求めているため、機械可読のStrategy Capsuleは必須。

一方で、実際のプロダクトでは、運用責任者やポートフォリオ管理者などの人間の意思決定者が、なぜその戦略を採るのかを理解できる必要がある。

そのため、同じCMCシグナルから機械向けと人間向けの2つの成果物を出すことが、実用性と審査上の分かりやすさを両立する。

## Strategy Capsule

AIエージェント、評価器、将来の実行エージェントが読む構造化データ。

含めるもの:

- data provenance
- market regime
- selected universe
- signal rationale
- entry rules
- exit rules
- invalidation rules
- risk budget
- replay window
- scoring metrics
- rule adherence constraints
- future execution handoff boundary

## Human Strategy Report

意思決定者がブラウザで読むHTMLレポート。

含めるもの:

- この相場レジームと判断した理由
- 採用銘柄と除外銘柄
- CMCシグナルの読み解き
- リスク上限
- 無効化条件
- リプレイ評価の見方
- Go / Caution / No-Goの判断
- Strategy Capsuleへの参照

## 提出時の表現

短い説明:

> CMC Regime Strategy Skillは、CoinMarketCapの市場データから、AIエージェント向けのStrategy Capsuleと、意思決定者向けのHuman Strategy Reportを同時生成する、BNBエコシステム向けの戦略生成Skillです。

## 動画での見せ方

1. CMCデータを取得する。
2. Regime-firstで市場状態を判定する。
3. Strategy Capsuleを生成する。
4. 同じ判断からHuman Strategy Reportを生成する。
5. Capsuleはバックテスト評価、Reportは人間の判断に使えることを見せる。
6. 最後に安全境界を短く補足する。

## 実装状況

実装済み:

- `npm run report`
- `prototype/human_strategy_report_fixture.html`
- `prototype/human_strategy_report_keyless.html`
- `prototype/src/generate_human_strategy_report.js`

Basic APIキー取得後の実装も完了。

- `prototype/cmc_basic_snapshot.json`
- `prototype/cmc_basic_strategy_fixture.json`
- `prototype/cmc_basic_replay_result.json`
- `prototype/human_strategy_report_basic.html`

`npm run basic` の後に `npm run report` を実行すると、Basic API版のHuman Strategy Reportも生成される。
