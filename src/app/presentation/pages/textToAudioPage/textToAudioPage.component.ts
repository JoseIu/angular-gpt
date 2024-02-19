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
  TextMessageBoxSelectComponent,
} from '@components/index';
import { Message } from '@interfaces/mesaage.interface';
import {
  Option,
  TextMessageBoxSelect,
} from '@interfaces/text.MessageSelect.interface';
import { OpenAiServiceService } from 'app/presentation/services/open-ai-service.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextToAudioPageComponent {
  public voices = signal<Option[]>([
    {
      id: 'nova',
      text: 'nova',
    },
    { id: 'alloy', text: 'alloy' },
    { id: 'echo', text: 'echo' },
    { id: 'fable', text: 'fable' },
    { id: 'onyx', text: 'onyx' },
    { id: 'shimmer', text: 'shimmer' },
  ]);
  private openAiSerice = inject(OpenAiServiceService);

  public messages = signal<Message[]>([]);

  public isloading = signal(false);

  public getMessage({ prompt, selectOption }: TextMessageBoxSelect) {
    this.isloading.set(true);
    this.messages.update((previusMessages) => [
      ...previusMessages,
      {
        isGpt: false,
        text: prompt,
      },
    ]);

    this.openAiSerice.textToAudio(prompt, selectOption).subscribe((resp) => {
      this.isloading.set(false);
      this.messages.update((previusMessages) => [
        ...previusMessages,
        {
          isGpt: true,
          text: resp.message,
          audioUrl: resp.audioUrl,
        },
      ]);
    });
  }
}
