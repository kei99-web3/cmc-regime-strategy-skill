---
type: repositioning_review
target: BNB HACK / CMC Regime Strategy Skill
updated: 2026-06-06
status: revised_after_user_feedback
---

# BNB HACK 再ポジショニング

## 結論

「戦略仕様書を生成するプロジェクト」という表現は弱い。

提出時は、次のように見せるべき。

> CMCの市場データとシグナルから、AIエージェント向けの Strategy Capsule と、意思決定者向けの Human Strategy Report を同時生成する CMC Skill。

このSkillの出力は二層構成にする。

1. Strategy Capsule: 次の処理系が読める構造化パッケージ。
2. Human Strategy Report: 意思決定者がブラウザで読み、判断根拠を確認できるHTMLレポート。

Strategy Capsuleに含めるもの:

- market regime
- data provenance
- selected universe
- signal rationale
- entry / exit / invalidation rules
- risk budget
- replay window
- scoring metrics
- rule adherence constraints
- handoff boundary for future execution agents

Human Strategy Reportに含めるもの:

- 市場レジームの説明
- 採用/除外した銘柄と理由
- 主要シグナルの読み解き
- リスク上限と無効化条件
- バックテスト/リプレイ評価の見方
- 意思決定者向けのGo / Caution / No-Go判断

## 主催者の意図

BNB HACKは「AIエージェント時代の取引スタック」を見せたい企画。

Track 2は、その中でも実行前の知能部分に絞っている。つまり、主催者が欲しいのは単なる分析UIやbotではなく、CMC Data / Agent Hub / Data API / Data MCP / Skills Marketplaceを使って、戦略生成とバックテスト評価に耐えるSkill。

## 今回の独自性

### 1. Signal-to-Decision Pack

ただCMC APIを呼ぶだけではなく、CMCの複数シグナルを Strategy Capsule と Human Strategy Report の二層出力に変換する。

### 2. Regime-first

銘柄を先に選ぶのではなく、まず市場レジームを判定する。相場が弱いときはポジション数とリスクを落とす。

### 3. Replay contract

held-out replay windowを意識し、return / drawdown / risk-adjusted performance / rule adherence を最初から出力スキーマに含める。

### 4. Dual audience output

AIエージェントや評価器にはStrategy Capsuleを渡し、人間の意思決定者にはHuman Strategy Reportを渡す。これにより、機械可読性と説明可能性を両立する。

### 5. Execution-agent handoff

Track 2では実行しないが、将来的にTrust WalletやBNB Chain実行エージェントへ渡せる構造にしている。つまり、実行の前段にある意思決定Skillとして見せる。

### 6. Fixture + live CMC proof

デモ安定性のためのfixtureと、CMC Keyless Public APIによる実データ証拠の二段構えにする。さらに、無料Basic API/MCPを使えるなら、よりCMC-nativeなSkillに見える。

## CMC Basic API / MCP 判断

Keyless Public APIだけでも提出証拠にはなる。

ただし、勝率を上げるなら、無料Basic APIキーまたはMCPを使う価値はある。理由は、主催が明示している「CMC Agent Hub / Data API / Data MCP / Skills Marketplace」により近づくため。

推奨:

1. まずKeyless Public API版を維持する。
2. 無料Basic APIキーを取得できるなら、Basic API版を追加する。
3. MCP接続までできるなら、動画内で「CMC MCP-compatible skill path」として見せる。
4. x402は支払いが絡むため今回は不要。

## 短い説明の修正方針

「しないこと」は短い説明に入れない。

短い説明は魅力だけを伝える。

> CMC Regime Strategy Skillは、CoinMarketCapの市場データから、AIエージェント向けのStrategy Capsuleと、意思決定者向けのHuman Strategy Reportを同時生成する、BNBエコシステム向けの戦略生成Skillです。

安全境界は本文の後半またはFAQに移す。

## 長い説明の修正方針

「主催者はこれを求めている」という書き方から始めない。

プロジェクトの価値から始める。

1. 何を作ったか。
2. なぜagent-nativeなのか。
3. CMCデータをどう価値に変えているか。
4. Strategy CapsuleとHuman Strategy Reportの二層出力がなぜ強いか。
5. 他応募者より何が強いか。
6. どう評価・バックテストできるか。
7. 将来どこへ接続できるか。

## 動画構成の修正方針

否定から入らない。

「ライブ売買botではない」は安全説明として最後に短く触れるだけでよい。

動画では以下を見せる。

1. CMC signals become both an agent-readable Strategy Capsule and a decision-maker-readable Human Strategy Report.
2. Regime changes risk budget and selected universe.
3. The capsule can be replayed and scored.
4. The report explains why the capsule made those choices.
5. Keyless / Basic / MCP path makes it CMC-native.
6. It can become the decision layer before execution agents.
