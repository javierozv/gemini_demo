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

export const mockResponseGetCoordinates = [
  {
    role: 'model',
    parts: [
      {
        functionCall: {
          name: 'get_coordinates',
          args: { fullAddress: 'Cl. 79 Sur #50-152, Yarumito, La Estrella, Antioquia' },
        },
      },
    ],
  },
  {
    role: 'tool',
    parts: [
      {
        functionResponse: {
          name: 'get_coordinates',
          response: {
            result: { success: true, coordinates: ['6.155620200399214', '-75.62910136108707'] }, // El resultado de la función
          },
        },
      },
    ],
  },
];
