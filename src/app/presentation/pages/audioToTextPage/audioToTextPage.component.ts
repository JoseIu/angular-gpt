import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ChatLoaderComponent,
  GptMessageComponent,
  MyMessageComponent,
  TextMessageFileComponent,
} from '@components/index';
import { AudioToTextResponse } from '@interfaces/index';
import { Message } from '@interfaces/mesaage.interface';
import { TextMessageEvent } from '@interfaces/textMessage.interface';
import { OpenAiServiceService } from 'app/presentation/services/open-ai-service.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageFileComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioToTextPageComponent {
  private openAiSerice = inject(OpenAiServiceService);

  public messages = signal<Message[]>([]);

  public isloading = signal(false);

  public getMessage(event: TextMessageEvent) {
    const { prompt, file } = event;

    const textToPrompt = prompt ?? file.name ?? 'Traduce el audio';
    this.messages.update((previusMessages) => [
      ...previusMessages,
      {
        isGpt: false,
        text: textToPrompt,
      },
    ]);
    this.isloading.set(true);

    this.openAiSerice.audtioToText(file, textToPrompt).subscribe((resp) => {
      this.setMessage(resp);
    });
  }

  setMessage(respone: AudioToTextResponse | null) {
    this.isloading.set(false);

    if (!respone) return;

    const text = `## Transcripción:
    __Duración:__ ${Math.round(respone.duration)} segundos.
    
    ## El texto es:
    ${respone.text}
        `;

    this.messages.update((previusMessages) => [
      ...previusMessages,
      {
        isGpt: true,
        text,
      },
    ]);

    let segmentMessages = ``;
    for (const segment of respone.segments) {
      segmentMessages += `## De ${Math.round(segment.start)} a ${Math.round(segment.end)}:
       ${segment.text}`;
    }
    this.messages.update((previusMessages) => [
      ...previusMessages,
      {
        isGpt: true,
        text: segmentMessages,
      },
    ]);
  }
}
