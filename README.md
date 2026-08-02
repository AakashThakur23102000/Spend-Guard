# SpendGuard

A mobile expense tracker built for people juggling multiple credit cards. It's built around two ways of getting a transaction in — manual entry or SMS auto-capture — with every entry organized date-wise so you can always see exactly what happened, and when. Then get warned before you go over budget, not after.

## Why

Credit card spend is easy to lose track of across multiple cards. SpendGuard keeps one running picture of:
- how much you've spent this month, combined and per source, tracked date-wise
- when each card's bill is due
- whether you're on pace to blow your monthly budget — including planned expenses you already know are coming

## Features

- **Manual entry, date-wise** — quick add for one-off or random expenses, logged against the exact date they happened
- **SMS auto-capture (Android), date-wise** — teach the app your bank's SMS format once by tapping the amount in a real message; it then recognizes and logs future transactions automatically, live and via a self-healing catch-up scan, each one timestamped to when the SMS arrived
- **Universal transaction sources** — not just credit cards. Track UPI, wallets, cash, SIPs, or any credit/debit card under one model
- **Planned transactions** — log a known upcoming expense (e.g. a doctor's visit) at the start of the month so it's factored into your forecast before it happens
- **Budget alerts** — set a monthly spending target; get an immediate notification the moment a transaction pushes you over it
- **Dashboard** — combined and per-source monthly totals, category breakdown, upcoming due dates
- **Fully editable** — every transaction, whether manual or auto-captured, can be edited or deleted after the fact

## Tech Stack

- Frontend: React Native (CLI)
- Backend: Node.js + Express
- Database: MongoDB

Full architecture and package details are in [`/docs/design.md`](./docs/design.md).

## Platform Support

- **Android**: full support, including SMS auto-capture
- **iOS**: manual entry only for now. SMS reading is an OS-level restriction with no workaround on iOS; auto-capture on iOS is planned via email/statement parsing in a future release

## Project Structure

- `spendguard-frontend/` — React Native app
- `spendguard-backend/` — Node.js + Express API

## Getting Started

Backend:
```
npm run dev
```

Mobile:
```
npm run android
```

## Roadmap

| Module | Status |
|---|---|
| Design & architecture | ✅ |
| Login | ❌ |
| Splash | ❌ |
| Dashboard | ❌ |
| Transactions | ❌ |
| Sources | ❌ |
| Budget/Planner | ❌ |
| Settings | ❌ |
| SMS auto-capture | ❌ |
| iOS support | ❌ |

## License

MIT — open for anyone to use or build on, with the original copyright notice required to stay attached.
