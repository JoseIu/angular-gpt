import { ProsConsResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.backendUrl}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      },
    );

    if (!response.ok) throw new Error('No se pudo realizar la comparación.');

    const data: ProsConsResponse = await response.json();

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la comparación.',
    };
  }
};
