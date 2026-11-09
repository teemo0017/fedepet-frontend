# 🎭 Sistema de Mocks - FedePet

Sistema de mocks integrado para desarrollo sin necesidad de levantar el backend.

## 📋 ¿Qué es esto?

Un interceptor HTTP que simula las respuestas del backend con datos de prueba. Perfecto para:
- ✅ Desarrollar sin depender del backend
- ✅ Hacer demos sin conexión
- ✅ Testing rápido de UI
- ✅ Trabajar en el avión/sin internet

## 🚀 Cómo usar

### Activar/Desactivar Mocks

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:4000',
  useMocks: true  // ← Cambiar a false para usar backend real
};
```

### Estados disponibles

- `useMocks: true` → Usa datos mock (no necesitas backend)
- `useMocks: false` → Usa backend real en localhost:4000

## 📦 Datos Mock Disponibles

### Mascotas (Pets)
- 3 mascotas de ejemplo (Max, Luna, Rocky)
- Diferentes especies y razas
- Con imágenes

### Doctores
- 4 doctores con diferentes especialidades
- Estados de disponibilidad
- Información de contacto

### Citas (Dates)
- 4 citas de ejemplo
- Diferentes estados: pendiente, confirmada, finalizada
- Fechas variadas

## 🔧 Endpoints Mockeados

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/pets/findbyuser` | POST | Obtener mascotas del usuario |
| `/api/pets/create` | POST | Crear nueva mascota |
| `/api/doctors/findall` | POST | Listar todos los doctores |
| `/api/dates/findbyclient` | POST | Obtener citas del cliente |
| `/api/dates/findbydoctor` | POST | Obtener citas del doctor |
| `/api/dates/create` | POST | Crear nueva cita |
| `/api/dates/update` | POST | Actualizar estado de cita |
| `/api/auth/login` | POST | Login de usuario |
| `/api/auth/register` | POST | Registro de usuario |

## 🎨 Personalizar Datos Mock

Edita el archivo `src/app/core/mocks/mock-data.ts`:

```typescript
export class MockData {
  static pets: petsResponseByUser[] = [
    {
      id: 1,
      name: 'Tu Mascota',
      species: 'Perro',
      // ... más datos
    }
  ];
  
  // Agrega más datos aquí
}
```

## 🐛 Debugging

El interceptor muestra logs en consola:

```
🎭 Mock Interceptor: POST /api/pets/findbyuser
```

Si ves este emoji, los mocks están activos.

## ⚡ Características

- **Delay realista**: Simula latencia de red (500ms - 1500ms)
- **Sin dependencias**: Usa solo Angular nativo
- **Fácil toggle**: Activa/desactiva con un flag
- **Datos persistentes**: Los cambios se mantienen durante la sesión
- **Compatible**: Funciona con tu código existente sin cambios

## 🚨 Importante

- ⚠️ **NUNCA** dejes `useMocks: true` en producción
- ⚠️ El archivo `environment.prod.ts` ya tiene `useMocks: false`
- ⚠️ Los datos mock se resetean al recargar la app

## 📝 Ejemplo de Uso

```typescript
// Tu código NO cambia, solo activa los mocks en environment.ts
async callService(): Promise<void> {
  this.loading.set(true);
  
  try {
    const request: requestId = { id: this.infoUser.id };
    
    // Esto usará mocks si useMocks: true
    this.dateList = await firstValueFrom(
      this.userService.getDatesByUser(request)
    );
  } catch (err) {
    console.error('Error:', err);
  } finally {
    this.loading.set(false);
  }
}
```

## 🔄 Flujo de Trabajo Recomendado

1. **Desarrollo inicial**: `useMocks: true`
2. **Testing con backend**: `useMocks: false`
3. **Producción**: Siempre `useMocks: false`

## 🆘 Troubleshooting

### Los mocks no funcionan
- ✅ Verifica que `useMocks: true` en environment.ts
- ✅ Recarga la app completamente
- ✅ Revisa la consola por el emoji 🎭

### Necesito más datos mock
- Edita `mock-data.ts`
- Agrega más objetos a los arrays

### Quiero simular errores
- Edita `mock.interceptor.ts`
- Usa `throwError()` en lugar de `of()`

---

**Creado para facilitar el desarrollo de FedePet** 🐾
