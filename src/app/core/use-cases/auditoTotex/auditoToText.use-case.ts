import { AudioToTextResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const audioToTextUseCase = async (file: File, prompt?: string) => {
  console.log({ prompt, file });

  try {
    const formData = new FormData();
    formData.append('file', file);

    if (prompt) {
      formData.append('prompt', prompt);
    }

    const response = await fetch(`${environment.backendUrl}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('No se pudo realizar la transcripción 😢');
    }

    const data = (await response.json()) as AudioToTextResponse;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
