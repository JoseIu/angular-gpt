import { AssitantResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const postMessageUseCase = async (
  threadId: string,
  question: string,
) => {
  try {
    const response = await fetch(`${environment.backendUrl}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, question }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la peticion...');

    const data = (await response.json()) as AssitantResponse[];

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener el threadId');
  }
};
