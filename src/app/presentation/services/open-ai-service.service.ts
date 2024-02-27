import { Injectable } from '@angular/core';
import { audioToTextUseCase } from '@use-cases/auditoTotex/auditoToText.use-case';
import {
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

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

  imageGeneration(prompt: string) {
    return from(imageGenerationUseCase(prompt));
  }

  imageVariation(originalImage: string) {
    return from(imageVariationUseCase(originalImage));
  }
}
