import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MockData } from './mock-data';

/**
 * Interceptor para simular respuestas del backend con datos mock
 * Solo se activa cuando useMocks está en true en el environment
 *
 * Las respuestas se envuelven en { status, body } para replicar el
 * contrato real de ApiResponse<T> del backend.
 */

function wrap<T>(body: T) {
  return { status: 'B0000', body };
}

export const mockInterceptor: HttpInterceptorFn = (req, next) => {

  // Solo interceptar si los mocks están activados
  if (!environment.useMocks) {
    return next(req);
  }

  const url = req.url;
  const method = req.method;
  const body = req.body as any;

  console.log('%c🎭 Mock Interceptor', 'color: #ff6b6b; font-weight: bold', method, url);

  // Simular delay de red (500ms - 1500ms)
  const networkDelay = Math.floor(Math.random() * 1000) + 500;

  // ==================== PETS ====================

  // GET/POST /api/pets/findbyuser
  if (url.includes('/api/pets/findbyuser')) {
    return of(new HttpResponse({
      status: 200,
      body: wrap(MockData.pets)
    })).pipe(delay(networkDelay));
  }

  // POST /api/pets/create
  if (url.includes('/api/pets/create')) {
    const newPet = {
      id: MockData.pets.length + 1,
      ...body,
      imageUrl: 'assets/imgs/pet1.webp'
    };
    MockData.pets.push(newPet);

    return of(new HttpResponse({
      status: 200,
      body: wrap(undefined)
    })).pipe(delay(networkDelay));
  }

  // ==================== DOCTORS ====================

  // POST /api/doctors/findall
  if (url.includes('/api/doctors/findall')) {
    return of(new HttpResponse({
      status: 200,
      body: wrap(MockData.doctors)
    })).pipe(delay(networkDelay));
  }

  // POST /api/doctors/create
  if (url.includes('/api/doctors/create')) {
    MockData.doctors.push({
      id: MockData.doctors.length + 1,
      name: body?.name,
      specialty: body?.specialty,
      email: body?.email,
      phone: body?.phone,
      available: true,
      photo: body?.photo || 'https://i.pravatar.cc/150',
      description: body?.description
    });

    return of(new HttpResponse({
      status: 200,
      body: wrap(undefined)
    })).pipe(delay(networkDelay));
  }

  // ==================== CLINIC ====================

  // GET /{slug}/public/info
  if (url.includes('/public/info')) {
    const slugMatch = url.match(/\/([^/]+)\/public\/info/);
    const slug = slugMatch ? slugMatch[1] : 'clinica-demo';

    return of(new HttpResponse({
      status: 200,
      body: wrap({
        id: 'mock-clinic-id',
        slug,
        name: 'Clínica Veterinaria Demo',
        address: 'Calle Falsa 123',
        phone: '555-0000',
        email: 'contacto@fedepet.com',
        logo: '',
        primaryColor: '#ffa420',
        active: true
      })
    })).pipe(delay(networkDelay));
  }

  // ==================== SUPER ADMIN / CLINICS ====================

  // GET /api/clinic/all
  if (url.includes('/api/clinic/all')) {
    return of(new HttpResponse({
      status: 200,
      body: wrap(MockData.clinics)
    })).pipe(delay(networkDelay));
  }

  // POST /api/clinic/create
  if (url.includes('/api/clinic/create')) {
    const newClinic = {
      id: `mock-clinic-${MockData.clinics.length + 1}`,
      slug: (body?.clinicSlug || '').toLowerCase().trim().replace(/\s+/g, '-'),
      name: body?.clinicName,
      address: body?.clinicAddress,
      phone: body?.clinicPhone,
      email: body?.clinicEmail,
      logo: '',
      primaryColor: body?.primaryColor || '#ffa420',
      active: true
    };
    MockData.clinics.push(newClinic);

    return of(new HttpResponse({
      status: 200,
      body: wrap(newClinic)
    })).pipe(delay(networkDelay));
  }

  // ==================== DATES ====================

  // POST /api/dates/findbyclient
  if (url.includes('/api/dates/findbyclient')) {
    const userId = body?.id;
    // Filtrar citas por usuario (en este mock devolvemos todas)
    return of(new HttpResponse({
      status: 200,
      body: wrap(MockData.dates)
    })).pipe(delay(networkDelay));
  }

  // POST /api/dates/findbydoctor
  if (url.includes('/api/dates/findbydoctor')) {
    const doctorId = body?.id;
    return of(new HttpResponse({
      status: 200,
      body: wrap(MockData.datesByDoctor)
    })).pipe(delay(networkDelay));
  }

  // POST /api/dates/create
  if (url.includes('/api/dates/create')) {
    const newDate = {
      id: MockData.dates.length + 1,
      ...body,
      state: 'pendiente'
    };
    MockData.dates.push(newDate);

    return of(new HttpResponse({
      status: 200,
      body: wrap({
        ...MockData.genericSuccess,
        id: newDate.id
      })
    })).pipe(delay(networkDelay));
  }

  // POST /api/dates/update
  if (url.includes('/api/dates/update')) {
    const dateId = body?.id;
    const dateIndex = MockData.dates.findIndex(d => d.id === dateId);

    if (dateIndex !== -1) {
      MockData.dates[dateIndex] = {
        ...MockData.dates[dateIndex],
        ...body
      };
    }

    return of(new HttpResponse({
      status: 200,
      body: wrap(MockData.genericSuccess)
    })).pipe(delay(networkDelay));
  }

  // ==================== AUTH ====================

  // POST /super-admin/auth/login
  if (url.includes('/super-admin/auth/login')) {
    const mockUser = {
      id: 0,
      email: body.username || body.email,
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    };

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(mockUser));
    const signature = btoa('mock-signature');

    return of(new HttpResponse({
      status: 200,
      body: wrap({ token: `${header}.${payload}.${signature}` })
    })).pipe(delay(networkDelay));
  }

  // POST /{slug}/auth/login
  if (url.includes('/auth/login')) {
    const mockUser = {
      id: 1,
      email: body.username || body.email,
      name: 'Usuario Mock',
      role: 'CLIENTE'
    };

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(mockUser));
    const signature = btoa('mock-signature');
    const mockToken = `${header}.${payload}.${signature}`;

    return of(new HttpResponse({
      status: 200,
      body: wrap({
        token: mockToken
      })
    })).pipe(delay(networkDelay));
  }

  // POST /{slug}/auth/google
  if (url.includes('/auth/google')) {
    const mockUser = {
      id: 99,
      email: 'google.mock@gmail.com',
      name: 'Usuario Google',
      role: 'CLIENTE'
    };
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(mockUser));
    const signature = btoa('mock-signature');
    return of(new HttpResponse({
      status: 200,
      body: wrap({ token: `${header}.${payload}.${signature}` })
    })).pipe(delay(networkDelay));
  }

  // POST /{slug}/auth/register
  if (url.includes('/auth/register')) {
    const mockUser = {
      id: Math.floor(Math.random() * 1000),
      email: body.email,
      name: body.name,
      role: 'CLIENTE'
    };

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(mockUser));
    const signature = btoa('mock-signature');
    const mockToken = `${header}.${payload}.${signature}`;

    return of(new HttpResponse({
      status: 200,
      body: wrap({
        token: mockToken
      })
    })).pipe(delay(networkDelay));
  }

  // ==================== ERROR SIMULATION ====================

  // Simular error 404 para rutas no encontradas
  if (url.includes('/api/') && !url.includes('/auth/')) {
    console.warn('⚠️ Mock no encontrado para:', url);
  }

  // Si no hay mock definido, pasar al siguiente interceptor
  return next(req);
};
