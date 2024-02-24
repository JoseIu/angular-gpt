import { ImageGenertation } from '@interfaces/index';
import { environment } from 'environments/environment';

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskIamge?: string,
) => {
  try {
    const response = await fetch(`${environment.backendUrl}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, originalImage, maskIamge }),
    });
    const data = (await response.json()) as ImageGenertation;

    console.log(data);
    return {
      ok: true,
      imageUrl: data.url,
      openAiUrl: data.urlOpenAi,
    };
  } catch (error) {
    return {
      ok: false,
      imageUrl: '',
      openAiUrl: '',
    };
  }
};
