# FedePet — Frontend

App móvil y web de gestión veterinaria multi-tenant construida con **Angular 17+ (standalone) + Ionic + Capacitor**. Se vende como SaaS a distintas clínicas veterinarias; cada clínica tiene su propia URL, datos aislados y color de marca.

## Stack
- Angular 17+ (componentes standalone, sin NgModules — la migración a standalone ya se completó en todos los features)
- Ionic Framework (UI components)
- Capacitor (compilación Android)
- TypeScript
- SCSS

## Estructura de carpetas (`src/app/`)
```
core/
  auth.service.ts          # Login/registro/logout, slug de clínica, JWT en Preferences
  clinic.service.ts        # CRUD de clínicas (crear, listar) — uso exclusivo de SUPER_ADMIN
  theme.service.ts         # Aplica el color de marca + logo de la clínica activa (runtime CSS vars)
  app.interceptor.ts       # Interceptor HTTP (adjunta JWT a requests)
  mocks/                   # Mock interceptor + datos de prueba para desarrollo sin backend
  models/
    auth.ts                # Login, Register, DecodedUser, ClinicPublicInfo
    clinic.ts               # Clinic (= ClinicPublicInfo), CreateClinicRequest
    api-response.ts        # ApiResponse<T> = { status, body } — envelope real del backend

features/
  authentication/
    clinic-gate/           # Primera pantalla ('/'): redirige al slug guardado o pide el código de clínica
    login/                 # Página de login, ruta :slug/login
    register/              # Página de registro, ruta :slug/register
  super-admin/              # Onboarding de clínicas — sin slug, login propio (rol SUPER_ADMIN)
    login/                 # Login del propietario de la plataforma, ruta super-admin/login
    clinics/               # Listado de clínicas + enlace de acceso listo para compartir, ruta super-admin/clinics
    create-clinic/         # Alta de clínica + admin inicial, ruta super-admin/clinics/create
  user/
    dashboard/             # Dashboard del CLIENTE (dueño de mascota)
    pets/                  # Lista de mascotas
    add-pet/               # Formulario agregar mascota
    appointment/           # Crear cita
    dates/                 # Ver citas del usuario
    doctors/               # Ver doctores de la clínica
  doctor/
    doctor-dashboard/      # Dashboard del DOCTOR (ruta doctor/dashboard)
    doctor-dates/          # Citas asignadas al doctor (ruta doctor/dates)
  admin-dashboard/         # Dashboard del ADMIN (ruta admin/dashboard) — lista real de doctores
  admin/
    add-doctor/            # Agregar doctor (conectado a POST /api/doctors/create)
    add-product/           # Agregar producto — solo mock, el backend no tiene ProductController todavía
  shop/                    # Tienda de productos — solo mock, sin backend real

shared/
  interfaces/interfaces.ts # Interfaces TypeScript compartidas (SquareSlideInfo)
  components/
    round-slide/           # Carrusel circular (mascotas)
    square-slide/          # Carrusel cuadrado (doctores)
    skeleton/               # Skeleton loader con animación lottie
    tab-var/                # Tab bar del rol CLIENTE
```

## Arquitectura multi-tenant por slug
Cada clínica tiene un slug único, capturado en la URL de login/registro:
```
/:slug/login
/:slug/register
```
- `ClinicGatePage` (ruta `''`) es el primer punto de entrada: si hay un slug guardado en Preferences (`clinicSlug`), redirige directo a `/{slug}/login`; si no, pide el código de la clínica.
- `AuthService.setSlug()/getSlug()` persisten el slug en Capacitor Preferences. `login()`, `register()`, `loginWithGoogle()` y `getPublicInfo()` reciben el slug como parámetro y arman la URL `/{slug}/auth/...` — así llama el backend real (ver `backend-fedepet/CLAUDE.md`).
- El logout (en dashboard y doctor-dashboard) limpia solo token+user, **no** el slug, para que el próximo login no tenga que volver a pedirlo.
- `SUPER_ADMIN` no usa slug: `AuthService.loginSuperAdmin()` pega directo a `/super-admin/auth/login`, ruta de frontend `super-admin/login` (fuera del patrón `:slug/...`, registrada **antes** que `:slug/login` en `app.routes.ts` para que no colisione con el wildcard).

## Onboarding de clínicas (`features/super-admin/`)
Flujo para que el dueño de la plataforma (SUPER_ADMIN) dé de alta clínicas nuevas sin tocar la base de datos:
1. `super-admin/login` — login con el usuario `SUPER_ADMIN` que crea `DataSeeder` en el backend (variables `SUPER_ADMIN_EMAIL`/`SUPER_ADMIN_PASSWORD` del `.env`).
2. `super-admin/clinics` — lista todas las clínicas (`GET /api/clinic/all`) con estado activa/inactiva y un botón "Copiar enlace" por clínica que arma `{origin}/{slug}/login` con `navigator.clipboard` — es el link que se le comparte al cliente.
3. `super-admin/clinics/create` — formulario con los datos de la clínica + la cuenta ADMIN inicial (`POST /api/clinic/create`, `ClinicService.createClinic()`), con auto-generación del slug a partir del nombre (editable a mano) y selector de `primaryColor` para el theming de esa clínica desde el día uno.
- No hay pantalla de edición de clínica todavía — el backend no expone un endpoint de update.
- Sin guard de ruta: como el resto de la app, la protección real vive en el backend (`@PreAuthorize`); estas rutas no verifican el rol en el cliente antes de renderizar.

## Envelope de respuesta del backend
El backend envuelve **todas** las respuestas en `ApiResponse<T> { status, body }` (ver `common/ApiResponse.java` en el backend). Todos los servicios HTTP (`auth.service.ts`, `user.service.ts`) hacen `.pipe(map(resp => resp.body))` para desenvolverlo — los componentes consumen tipos "planos" (`T`), nunca el envelope directamente. El mock interceptor replica el mismo contrato (`{status:'B0000', body}`) para que mocks y backend real sean intercambiables sin tocar componentes.

## Theming dinámico por clínica
`ThemeService.applyClinicTheme(info: ClinicPublicInfo)` sobreescribe en runtime las CSS custom properties `--app-color-primary` y `--app-color-orange` (alias de compatibilidad) con el `primaryColor` que devuelve `GET /{slug}/public/info`, y persiste el tema en Preferences para reaplicarlo al arrancar (`AppComponent` llama `themeService.restoreTheme()`). **Cualquier acento "de marca" nuevo (botón primario, foco, ícono activo) debe usar `var(--app-color-primary)`**, nunca un hex fijo, o rompe el theming por clínica.

## Sistema de diseño
- `src/styles/variables.scss`: escala de espaciado `--app-spacing-{2..188}` y colores `--app-color-{orange,yellow,clay-green,green,blue,background,primary}`.
- `src/global.scss`: utilidades `.app-bg-*`, `.app-text-*`, `.p-N/.m-N/.px-N/...` y tipografías (`--font-title` = Poppins para títulos, `--ion-font-family` = Nunito para cuerpo).
- Look consciente de no parecer "genérico de IA": sin gradientes violeta/rosa, sin glassmorphism, sin blobs decorativos, sin relleno de emoji, sin sombras en capas ni border-radius uniforme en todo. En su lugar: canvas `var(--app-color-background)`, tarjetas blancas con un borde de 1px (`#e9efec`-ish) en vez de sombra, radios variados con intención (más grande en tarjetas, más chico en inputs/botones), jerarquía tipográfica real, y **un solo acento de marca por pantalla** siempre vía `var(--app-color-primary)` — nunca un hex fijo, porque `ThemeService` lo sobreescribe por clínica en runtime.
- Pantallas CLIENTE (dueño de mascota): tono cálido, `<component-skeleton>` para estados de carga, chips de estado suaves (fondo tintado + texto oscuro, no badges sólidos llamativos).
- Pantallas DOCTOR/ADMIN (staff de la clínica): mismo sistema pero más denso/utilitario — filas escaneables, columnas alineadas, prioridad a la claridad sobre la decoración (uso diario, no pantalla de marketing).
- **Todas** las pantallas de la app (auth, dashboard cliente, mascotas, citas, doctores, tienda, dashboard doctor, panel admin, altas de doctor/producto) ya siguen este sistema — no queda ninguna pantalla con el look anterior.

## Roles y navegación post-login
- `SUPER_ADMIN` — entra por `/super-admin/login` (no por `LoginPage`), va a `/super-admin/clinics`
- `ADMIN` — `/admin/dashboard`, gestión de doctores (`/admin/add-doctor`) y productos (mock)
- `DOCTOR` — `/doctor/dashboard`, `/doctor/dates`
- `CLIENTE` — `/user/dashboard`, mascotas, citas

(`LoginPage.navigateByRole` solo cubre ADMIN/DOCTOR/CLIENTE — un SUPER_ADMIN nunca pasa por ahí porque `AuthService.login()` con slug exige que el usuario pertenezca a esa clínica, y SUPER_ADMIN no tiene clínica.)

## Convenciones
- Todos los features son componentes standalone (`imports: [...]` en `@Component`), sin NgModules ni routing modules — las rutas viven en `src/app/app.routes.ts` con `loadComponent`.
- Mocks disponibles para desarrollo sin backend activo (ver `core/mocks/`, activar con `useMocks: true` en `src/environments/environment.ts`).
- Variables de entorno en `src/environments/`.

## Comandos comunes
```bash
npm start                        # Dev server web
npm run start:mock               # Dev server con mocks activados (sin backend)
ionic serve                      # Dev server con Ionic DevTools
ionic capacitor run android      # Correr en Android
npm run build                    # Build producción
npx tsc --noEmit                 # Type-check rápido
```

## Gaps conocidos (no implementados a propósito)
- No hay `ProductController` en el backend — `shop` y `admin/add-product` son solo UI mock.
- No hay endpoint para editar doctor ni cambiar disponibilidad — esos botones en `admin-dashboard` muestran un toast informativo en vez de fallar.
- `pets.page.ts`: ver detalle de mascota es un toast "disponible pronto" — no hay pantalla de detalle. El backend sí tiene `PUT`/`DELETE /api/pets/{id}` pero el frontend no los consume todavía (no hay UI de editar/eliminar mascota).
- No hay refresh token — el JWT dura 1 hora (ver backend) y el usuario debe volver a loguearse; puede pasar en medio de una sesión de trabajo real.
- No hay edición de clínica (nombre, color, logo) después de creada — solo alta. El backend no expone un endpoint de update.
