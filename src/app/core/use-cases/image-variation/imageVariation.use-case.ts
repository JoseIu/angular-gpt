import { ImageGenertation } from '@interfaces/index';
import { environment } from 'environments/environment';
export const imageVariationUseCase = async (baseImage: string) => {
  try {
    console.log({ baseImage });
    const response = await fetch(`${environment.backendUrl}/image-variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseImage }),
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
