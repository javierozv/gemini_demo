export const mockDriverSavedFunction = [
  {
    role: 'model',
    parts: [
      {
        functionCall: {
          name: 'info_driver',
          args: { infoDriver: 'Casa en la esquina roja, primer piso' },
        },
      },
    ],
  },
  {
    role: 'tool',
    parts: [
      {
        functionResponse: {
          name: 'info_driver',
          response: {
            result: { success: true }, // El resultado de la función
          },
        },
      },
    ],
  },
];

export const mockResponseCreateService = [
  {
    role: 'model',
    parts: [
      {
        functionCall: {
          name: 'create_service',
          args: { coordinates: ['6.152791040294973', '-75.63517298365787'] },
        },
      },
    ],
  },
  {
    role: 'tool',
    parts: [
      {
        functionResponse: {
          name: 'create_service',
          response: {
            result: { success: true }, // El resultado de la función
          },
        },
      },
    ],
  },
];
