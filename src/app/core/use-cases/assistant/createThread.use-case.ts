import { environment } from 'environments/environment';

export const createThreadUseCase = async () => {
  try {
    const response = await fetch(`${environment.backendUrl}/create-thread`, {
      method: 'POST',
    });

    if (!response.ok) throw new Error('Error al crear el asistente');
    console.log({ response });

    const data = (await response.json()) as { id: string };

    return data.id;
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear el ThreadId');
  }
};
