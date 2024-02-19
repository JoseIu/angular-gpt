import { environment } from 'environments/environment';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(`${environment.backendUrl}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la conversión 😢');

    //The DATA
    const audioFile = await response.blob();

    const audioUrl = URL.createObjectURL(audioFile);

    console.log(audioUrl);

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo realizar la conversión 😢',
      audioUrl: '',
    };
  }
};
