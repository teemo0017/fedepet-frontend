import { DatesResponse, Doctor, petsResponseByUser, GenericResponseSave, DateResponseDoctor } from '../../features/services/models/users';

/**
 * Mock data para simular respuestas del backend
 */
export class MockData {
  
  // Mock de mascotas
  static pets: petsResponseByUser[] = [
    {
      id: 1,
      name: 'Max',
      species: 'Perro',
      breed: 'Golden Retriever',
      dateBirth: '2021-03-15',
      weight: 30,
      photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamés',
      dateBirth: '2022-06-20',
      weight: 4,
      photo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'
    },
    {
      id: 3,
      name: 'Rocky',
      species: 'Perro',
      breed: 'Bulldog',
      dateBirth: '2019-11-10',
      weight: 25,
      photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'
    }
  ];

  // Mock de doctores
  static doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Carlos Méndez',
      specialty: 'Medicina General',
      email: 'carlos.mendez@fedepet.com',
      phone: '555-0101',
      available: true,
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      description: 'Veterinario con 10 años de experiencia en medicina general y preventiva.'
    },
    {
      id: 2,
      name: 'Dra. María González',
      specialty: 'Cirugía',
      email: 'maria.gonzalez@fedepet.com',
      phone: '555-0102',
      available: true,
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      description: 'Especialista en cirugía veterinaria con certificación internacional.'
    },
    {
      id: 3,
      name: 'Dr. Juan Pérez',
      specialty: 'Dermatología',
      email: 'juan.perez@fedepet.com',
      phone: '555-0103',
      available: false,
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      description: 'Experto en enfermedades de la piel y alergias en mascotas.'
    },
    {
      id: 4,
      name: 'Dra. Ana Rodríguez',
      specialty: 'Cardiología',
      email: 'ana.rodriguez@fedepet.com',
      phone: '555-0104',
      available: true,
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
      description: 'Cardióloga veterinaria especializada en diagnóstico y tratamiento.'
    }
  ];

  // Mock de citas
  static dates: DatesResponse[] = [
    {
      id: 1,
      dateTime: new Date('2024-02-15T10:00:00').toISOString(),
      motive: 'Chequeo general y vacunación',
      type: 'Consulta',
      state: 'confirmada',
      doctor: 'Dr. Carlos Méndez',
      client: 'Juan Pérez',
      pet: 'Max',
      doctorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
      petImg: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'
    },
    {
      id: 2,
      dateTime: new Date('2024-02-20T14:30:00').toISOString(),
      motive: 'Control post-operatorio',
      type: 'Control',
      state: 'pendiente',
      doctor: 'Dra. María González',
      client: 'María García',
      pet: 'Luna',
      doctorImg: 'https://randomuser.me/api/portraits/women/2.jpg',
      petImg: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'
    },
    {
      id: 3,
      dateTime: new Date('2024-01-10T09:00:00').toISOString(),
      motive: 'Vacunación antirrábica',
      type: 'Vacunación',
      state: 'finalizada',
      doctor: 'Dr. Carlos Méndez',
      client: 'Juan Pérez',
      pet: 'Max',
      doctorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
      petImg: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'
    },
    {
      id: 4,
      dateTime: new Date('2024-02-25T16:00:00').toISOString(),
      motive: 'Consulta cardiológica de rutina',
      type: 'Consulta',
      state: 'pendiente',
      doctor: 'Dra. Ana Rodríguez',
      client: 'Pedro López',
      pet: 'Rocky',
      doctorImg: 'https://randomuser.me/api/portraits/women/4.jpg',
      petImg: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'
    }
  ];

  // Mock de citas por doctor
  static datesByDoctor: DateResponseDoctor = {
    datesIncoming: [
      {
        id: 1,
        dateTime: new Date('2024-02-15T10:00:00').toISOString(),
        motive: 'Chequeo general y vacunación',
        type: 'Consulta',
        state: 'confirmada',
        doctor: 'Dr. Carlos Méndez',
        client: 'Juan Pérez',
        pet: 'Max',
        doctorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
        petImg: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'
      },
      {
        id: 2,
        dateTime: new Date('2024-02-20T14:30:00').toISOString(),
        motive: 'Control post-operatorio',
        type: 'Control',
        state: 'pendiente',
        doctor: 'Dr. Carlos Méndez',
        client: 'María García',
        pet: 'Luna',
        doctorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
        petImg: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'
      }
    ],
    datesDone: [
      {
        id: 3,
        dateTime: new Date('2024-01-10T09:00:00').toISOString(),
        motive: 'Vacunación antirrábica',
        type: 'Vacunación',
        state: 'finalizada',
        doctor: 'Dr. Carlos Méndez',
        client: 'Juan Pérez',
        pet: 'Max',
        doctorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
        petImg: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'
      }
    ]
  };

  // Respuesta genérica de éxito
  static genericSuccess: GenericResponseSave = {
    status: 'success'
  };

  // Mock de clínicas (uso de SUPER_ADMIN)
  static clinics: any[] = [
    {
      id: 'mock-clinic-1',
      slug: 'clinica-demo',
      name: 'Clínica Veterinaria Demo',
      address: 'Calle Falsa 123',
      phone: '555-0000',
      email: 'contacto@fedepet.com',
      logo: '',
      primaryColor: '#ffa420',
      active: true
    }
  ];
}
