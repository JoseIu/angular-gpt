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
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePageComponent {
  public options: Option[] = [
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ];
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

    this.openAiSerice.translate(prompt, selectOption).subscribe((response) => {
      this.isloading.set(false);
      this.messages.update((previusMessages) => [
        ...previusMessages,
        {
          isGpt: true,
          text: response.message,
        },
      ]);
    });
  }
}
