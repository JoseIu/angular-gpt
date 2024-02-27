import { Translate } from '@interfaces/fetch/translate.interface';
import { environment } from 'environments/environment';

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${environment.backendUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) throw new Error('NO se pudo realizar la tradcución');

    const { message }: Translate = await response.json();

    console.log(message);

    // console.log({ data });

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Problemas en la tradcución');
  }
};
