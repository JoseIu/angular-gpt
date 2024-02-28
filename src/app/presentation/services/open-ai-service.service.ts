import { Injectable } from '@angular/core';
import { audioToTextUseCase } from '@use-cases/auditoTotex/auditoToText.use-case';
import {
  createThreadUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyUseCase,
  postMessageUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiServiceService {
  orthographyCheck(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }
  prosConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }
  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }

  audtioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, originalIamge?: string, maskIamge?: string) {
    return from(imageGenerationUseCase(prompt, originalIamge, maskIamge));
  }

  imageVariation(originalImage: string) {
    return from(imageVariationUseCase(originalImage));
  }

  createThread(): Observable<string> {
    //Verificamos is el threadId esta en storage
    if (localStorage.getItem('threadId')) {
      return of(localStorage.getItem('threadId')!);
    }

    return from(createThreadUseCase()).pipe(
      tap((threadId) => localStorage.setItem('threadId', threadId)),
    );
  }

  postMessage(threadId: string, question: string) {
    return from(postMessageUseCase(threadId, question));
  }
}
