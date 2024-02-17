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
  TextMessageBoxComponent,
} from '@components/index';
import { Message } from '@interfaces/mesaage.interface';
import { OpenAiServiceService } from 'app/presentation/services/open-ai-service.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsStreamPageComponent {
  private openAiSerice = inject(OpenAiServiceService);
  public isloading = signal(false);
  public messages = signal<Message[]>([]);

  public abotSignal = new AbortController();

  public async getMessage(prompt: string) {
    this.abotSignal.abort();
    this.abotSignal = new AbortController();

    this.messages.update((previdusMessages) => [
      ...previdusMessages,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: '....',
      },
    ]);

    this.isloading.set(true);
    const stream = this.openAiSerice.prosConsStream(
      prompt,
      this.abotSignal.signal,
    );
    this.isloading.set(false);

    for await (const text of stream) {
      console.log(text);
      this.concatMessages(text);
    }
  }

  concatMessages(message: string) {
    //Remove last message
    this.messages().pop();
    //A copy of the messages
    const messages = this.messages();

    this.messages.set([...messages, { text: message, isGpt: true }]);
  }
}
