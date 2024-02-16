import { OrthoResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(`${environment.backendUrl}/orthography`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la correción.');

    const data = (await response.json()) as OrthoResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    //Return a object with the same structure as the response
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección',
    };
  }
};
