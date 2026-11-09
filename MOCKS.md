# 🎭 Sistema de Mocks - Guía Rápida

## ⚡ Comandos Rápidos

```bash
# Activar mocks (no necesitas backend)
npm run mocks:on

# Desactivar mocks (usar backend real)
npm run mocks:off

# Iniciar con mocks activados
npm run start:mock
```

## 🎯 ¿Cuándo usar qué?

| Situación | Comando | Descripción |
|-----------|---------|-------------|
| 🚀 Desarrollo rápido | `npm run start:mock` | Trabaja sin backend |
| 🔌 Testing con backend | `npm run mocks:off && npm start` | Usa tu backend local |
| ✈️ Sin internet | `npm run mocks:on` | Trabaja offline |
| 🎨 Diseño UI | `npm run start:mock` | Enfócate en la interfaz |

## 📊 Estado Actual

Verifica el estado en `src/environments/environment.ts`:

```typescript
useMocks: true  // ← Mocks activados 🎭
useMocks: false // ← Backend real 🔌
```

## 🎨 Personalizar Datos

Edita: `src/app/core/mocks/mock-data.ts`

```typescript
static pets: petsResponseByUser[] = [
  {
    id: 1,
    name: 'Tu Mascota',
    // ... personaliza aquí
  }
];
```

## 📚 Documentación Completa

Ver: `src/app/core/mocks/README.md`

---

**Tip:** Los mocks simulan delay de red (500-1500ms) para una experiencia realista 🚀
