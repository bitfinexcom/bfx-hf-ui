## 3.2.0

- meta: add doclets in various places.
- meta: normalize eslint config to match other repos
- meta: rm unused deps (typescript, electron-store, react-diagrams)
- meta: extract utility configs from manifest into rc files
- refactor: begin breaking up core electorn app logic
- refactor: break up logic in `evalSectionContent` [StrategyEditor]
- refactor: mv `Backtester` component out of wrapper div
- refactor: rm debug message from core runSaga()
- refactor: revise to support v2 of `bfx-hf-strategy`
- refactor: revise strategy teplates for v2 compatibility
- refactor: apply minor tweaks to styles (user settings page, etc)
- refactor: switch to docs including only runtime methods in  straetegy editor
  help
- feature: add redux logic to recv strategy exec data and active status
- feature: add strategy executions page, with historical & active
- feature: add ability to start/stop strategy executions, with option to
  enable/disable background execution.
- fix: renamem `tabTitle` togit `tabtitle` due to react warnings.
- fix: compare new `strategyContent` with updated state value instead of from
  prevProps in `componentWillReceiveProps`
- fix: pass props through to superp in `Backtest` comp constructor
- fix: store only active tab ID in `Panel` state to resolve it when rendering;
  storing the tab itself is async & new props did not share the original prop
  ref.

## 3.1.1

- meta: CHANGELOG.md started
- meta: rm vestigial deps
- meta: extract configs from manifest into dedicated files (babel, jest, etc)
- fix: manifest project URLs
- fix: linter config (rm dup eslintrc + update settings)
- refactor: rm react-diagrams
- refactor: tweak ExchangeInfoBar style
- refactor: tweak Navbar/NavbarButton style
- refactor: tweak pages/Settings style
- refactor: tweak pages/MarketData style
- refactor: prefix ws error notifications with 'Server error:'
- feature: update for bfx-hf-strategy v2
- feature: add strategy execution support
