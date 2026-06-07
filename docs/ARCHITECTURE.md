# MediHelper Frontend Architecture (Phase A)

## Folder structure

```
src/app/
├── core/                    # Singleton services, models, API contracts
│   ├── constants/           # roles.ts, api-endpoints.ts
│   ├── contracts/           # ApiResourceContract (REST shape)
│   ├── models/              # Patient, Doctor, Appointment, …
│   ├── services/            # auth, api-base
│   └── auth/                # login
├── shared/                  # Reusable UI & navigation config
│   ├── components/          # kpi-card, data-table, dynamic-form, …
│   └── config/              # navigation.config.ts (RBAC menus)
├── features/                # Role-based feature areas
│   ├── admin/dashboard/
│   ├── doctor/dashboard/
│   ├── patient/
│   ├── receptionist/
│   ├── staff/
│   └── clinical/            # form schemas, medical-services
├── AdminPages/              # Legacy page components (wired via routes)
├── layout/
└── services/                # Domain services (mock → HTTP later)
```

## Roles & routes

| Role | Base path | Dashboard |
|------|-----------|-----------|
| Admin | `/admin/*` | Full system |
| Doctor | `/doctor/*` | Clinical focus |
| Patient | `/patient/*` | Portal |
| Receptionist | `/receptionist/*` | Front desk |
| Staff | `/staff/*` | Lab / pharmacy / radiology |

Legacy paths (`/patients`, `/adminDashboard`) redirect to `/admin/...`.

## API preparation

Each domain service implements `ApiResourceContract<T>` with:

- `GET /api/v1/{resource}`
- `GET /api/v1/{resource}/:id`
- `POST /api/v1/{resource}`
- `PUT /api/v1/{resource}/:id`
- `DELETE /api/v1/{resource}/:id`

Endpoints are defined in `core/constants/api-endpoints.ts`.  
`ApiBaseService.useMock = true` until NestJS is connected; then inject `HttpClient`.

## Dynamic forms

Form definitions live in `features/clinical/config/*-form.schema.ts` and drive `app-dynamic-form`.

## Next steps (Phase B)

1. Add `provideHttpClient()` + auth interceptor
2. Replace `BehaviorSubject` mocks with HTTP calls
3. Add route guards (`canActivate`) using `AuthService.hasRole()`
4. Gradually move `AdminPages/*` into `features/*/pages`
