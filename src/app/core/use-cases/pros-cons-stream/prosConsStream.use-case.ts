import { environment } from 'environments/environment';

export async function* prosConsStreamUseCase(
  prompt: string,
  abortSignal: AbortSignal,
) {
  try {
    const resp = await fetch(
      `${environment.backendUrl}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      },
    );

    if (!resp.ok) throw new Error('No se pudo realizar la comparación');

    const reader = resp.body?.getReader();
    if (!reader) throw new Error('No se pudo generar el reader');

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decoderChunk = decoder.decode(value, { stream: true });
      text += decoderChunk;

      yield text;
    }

    return text;
  } catch (error) {
    console.log(error);
    return null;
  }
}
