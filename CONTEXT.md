# FedePet — Contexto completo del proyecto

> Este archivo es el punto de partida para entender **qué es FedePet, para quién es, en qué estado está y qué sigue** — tanto para Claude como para cualquiera que retome el proyecto. Para el detalle técnico de este repo ver `CLAUDE.md`; para el plan de negocio original (precios, guión de ventas, objeciones) ver `backend-fedepet/ROADMAP.md` — pero ojo: **ese pricing todavía no está validado con datos reales del mercado** (ver sección "Negocio" más abajo).

## Qué es FedePet

Un SaaS de gestión veterinaria multi-tenant: cada clínica tiene su propia URL (slug), sus propios datos aislados, su propio color de marca, y gestiona mascotas, citas y doctores desde una app móvil + web en español. Pensado para clínicas pequeñas (1-4 veterinarios) que hoy llevan el control en papel, WhatsApp o Excel.

**Quién lo construye:** un único founder/developer que hace el desarrollo, la venta y el soporte él solo, sin equipo. Esto condiciona todas las decisiones de alcance: priorizar lo que un solo humano puede sostener (soporte, onboarding, infraestructura) por encima de features vistosas.

## Arquitectura (resumen — detalle completo en `CLAUDE.md`)

- **Frontend** (este repo): Angular 17+ standalone (sin NgModules) + Ionic + Capacitor. Pensado para web y Android.
- **Backend**: Spring Boot, repo separado `backend-fedepet`, corriendo en EC2. Base de datos Postgres en Supabase (free tier).
- Multi-tenant por slug: rutas `/:slug/login`, `/:slug/register`; el resto de la app usa el JWT para resolver la clínica.
- Roles y sus pantallas: `SUPER_ADMIN` (`super-admin/clinics`, onboarding de clínicas nuevas) → `ADMIN` (`admin/dashboard`) → `DOCTOR` (`doctor/dashboard`) → `CLIENTE` (`user/dashboard`, el dueño de la mascota).
- Sistema de diseño propio (ver `CLAUDE.md`): deliberadamente minimalista, sin gradientes/glassmorphism/blobs — con un acento de marca dinámico por clínica vía `ThemeService`.

## Negocio — modelo y mercado (⚠️ parcialmente sin validar)

- **Pricing borrador**: Básico $75/mes (≤2 doctores), Estándar $130/mes (≤5 doctores + historial + fotos), Premium $200/mes (ilimitado + estadísticas), Onboarding $150 pago único.
- **Mercado objetivo**: clínicas veterinarias pequeñas en Panamá, zonas de clase media-alta (San Francisco, Marbella, Costa del Este, Albrook, Clayton).
- **Estado de la validación**: se intentó validar este pricing y el tamaño de mercado con una investigación real (cantidad de clínicas, competencia local, poder de compra, Yappy, ITBMS), pero la mayoría de las búsquedas fallaron por errores de infraestructura — **no hay un TAM confiable todavía**. Lo único verificado: un comparable español (GVET) arranca en $20/mes (muy por debajo del borrador), e ITBMS es 7% plano en Panamá. Repetir esa investigación con fuentes específicas de Panamá antes de cerrar el precio final.
- Sin integración de pagos (ni Stripe ni Yappy Comercial) — si el plan es cobrar recurrente, es un bloqueante de negocio real, no solo técnico.

## Prioridades antes de producción (detalle y razones en `CLAUDE.md` → "Gaps conocidos")

1. **Backend**: `ddl-auto=create-drop` recrea el esquema completo en cada reinicio — si corre así en el EC2 real, cualquier reinicio borra la base de datos real. Prioridad máxima, no es cosa del frontend pero bloquea todo.
2. CORS abierto a cualquier origen en el backend.
3. Sin rate limiting en login (fuerza bruta sin freno).
4. Sin validación de inputs en el backend.
5. Sin refresh token — el JWT dura 1h, usuarios reales se desloguean a mitad de jornada.
6. Sin ambientes dev/prod separados — plan decidido (ver `backend-fedepet/CONTEXT.md`), no implementado.
7. Integración de pagos — inexistente.

## Huecos de producto conocidos en este frontend (honestos: hoy muestran un toast en vez de fallar)

- `pets.page.ts`: detalle/edición/borrado de mascota — el backend tiene `PUT`/`DELETE /api/pets/{id}`, el frontend no los usa todavía.
- `admin-dashboard.page.ts`: editar doctor / cambiar disponibilidad — no hay endpoint en el backend.
- `shop` / `admin/add-product`: 100% mock, no existe `ProductController` en el backend.
- `super-admin/clinics`: no hay edición de clínica después de creada, solo alta y listado (el backend no expone update).

## Qué falta para poder vender (no técnico)

Contrato simple de 1 página, WhatsApp Business dedicado, dominio propio, clínica demo cargada con datos realistas (ver `backend-fedepet/ROADMAP.md`). Nada de esto está hecho todavía.

## Dónde mirar para más detalle

- `CLAUDE.md` — estructura de carpetas, arquitectura multi-tenant, sistema de diseño, convenciones de este frontend.
- `backend-fedepet/CLAUDE.md` y `backend-fedepet/CONTEXT.md` — mismo contexto de negocio, versión con el detalle técnico del backend.
- `backend-fedepet/ROADMAP.md` — plan de negocio original completo (guión de ventas, objeciones, metas mensuales) — estructura útil, pricing sin validar.
