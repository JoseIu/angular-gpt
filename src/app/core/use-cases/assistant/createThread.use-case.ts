export const createThreadUseCase = async () => {
  try {
    const response = await fetch(`http://localhost:3000/gpt/create-thread`, {
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
