import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
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
}
