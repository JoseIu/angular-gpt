import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
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
  prosConsStream(prompt: string) {
    return prosConsStreamUseCase(prompt);
  }
}
