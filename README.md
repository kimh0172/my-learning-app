# Kanban Lite Learning

Web app theo lộ trình 6 tháng (2h/tuần). Kiến trúc SOLID (Domain/Application/Infrastructure/UI), UI CSS thuần.

## Scripts
- `npm run dev` – Dev server
- `npm run build` – Build
- `npm run preview` – Preview build

## Cấu trúc
- `domain/` – entities, ports
- `application/` – use-cases, services
- `infrastructure/` – adapters (LocalStorage, download)
- `ui/` – components, styles
- `data/` – curriculum

## Lưu trữ tiến độ
LocalStorage key: `kanban-lite-learning-progress`. Dùng Export/Import JSON để backup.
