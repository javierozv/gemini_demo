import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI, Type } from '@google/genai';
import {
  mockDriverSavedFunction,
  mockResponseCreateService,
  mockResponseGetCoordinates,
} from './mocksFunctionsResponses.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_TOKEN });
const creatService = {
  name: 'create_service',
  description: 'Le envía un carro al cliente a las coordenadas subministradas',
  parameters: {
    type: Type.OBJECT,
    properties: {
      coordinates: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
    required: ['coordinates'],
  },
};

const get_coordinates = {
  name: 'get_coordinates',
  description: 'A partir de una dirección obtiene coordenadas',
  parameters: {
    type: Type.OBJECT,
    properties: {
      fullAddress: {
        type: Type.STRING,
      },
    },
    required: ['fullAddress'],
  },
};

const infoDriver = {
  name: 'info_driver',
  description: 'Envía la info para el driver que ha proporcionado el cliente',
  parameters: {
    type: Type.OBJECT,
    properties: {
      infoDriver: {
        type: Type.STRING,
      },
    },
    required: ['infoDriver'],
  },
};

//Mock Chat Gemini pide info para el driver y el cliente la dá
const geminiPideInfo = [
  {
    role: 'model',
    parts: [
      {
        text: '¡Taxi solicitado! Por favor, ¿hay alguna información adicional que le debamos proporcionar al conductor para que lo recoja más fácilmente? (por ejemplo, color del edificio, nombre en el timbre, etc.)',
      },
    ],
  },
  {
    role: 'user',
    parts: [
      {
        text: 'Casa en la esquina roja, primer piso',
      },
    ],
  },
];

const userProvideFullAddress = {
  role: 'user',
  parts: [
    {
      text: 'Cl. 79 Sur #50-152, Yarumito, La Estrella, Antioquia',
    },
  ],
};

const userProvideCoordinates = {
  role: 'user',
  parts: [
    {
      text: 'a 6.152791040294973, -75.63517298365787',
    },
  ],
};

const giveCoordinates = false;

//Mock cliente inicia conversación y pide un taxi
const clientAskForTaxi = [
  {
    role: 'user',
    parts: [
      {
        text: 'Hola, quiero solicitar un taxi',
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: 'Hola, por favor dime tu ubicación para poder enviarte un taxi. Necesito las coordenadas o la dirección.',
      },
    ],
  },
];

const contents = [
  ...clientAskForTaxi, //Mock cliente init chat
  ...(giveCoordinates
    ? [userProvideCoordinates]
    : [userProvideFullAddress, ...mockResponseGetCoordinates]),
  ...mockResponseCreateService,
  ...geminiPideInfo, //Mock Chat Gemini pide info para el driver y el cliente la dá
  ...mockDriverSavedFunction,
];
//Example 1
async function main() {
  console.time('prueba');
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents,
    config: {
      systemInstruction:
        'Tu eres un agente despachador de taxi que asiste clientes que quieren pedir servicios de taxi,' +
        ' cuando recibe las coordenadas o números que se podrían interpretar como coordenadas del cliente' +
        ' creas un servicio llamando la functionCalls de crear servicio, si en vez de recibir coordenadas' +
        ' recibes un nombre de un lugar, buscas las coordenadas de ese lugar llamando la función get_coordinates' +
        '  cuando ya tienes las coordenadas pides una info adicional para el driver y la guardas en llamando a la function call info_driver',
      maxOutputTokens: 100,
      tools: [
        {
          functionDeclarations: [creatService, infoDriver, get_coordinates],
        },
      ],
    },
  });
  for (let content of contents) {
    if (content.parts[0].text) {
      console.log(content.role, ': ', content.parts[0].text);
    }
  }
  console.log('last response:');
  console.log('text:', response.text);

  console.log('function:', response.functionCalls);
  console.timeEnd('prueba');
}

main();
