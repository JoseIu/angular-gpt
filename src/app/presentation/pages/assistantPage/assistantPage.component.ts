import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistantPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantPageComponent implements OnInit {
  private openAiSerice = inject(OpenAiServiceService);

  public messages = signal<Message[]>([]);

  public isloading = signal(false);

  public threadId = signal<string | null>(null);

  ngOnInit(): void {
    this.openAiSerice
      .createThread()
      .subscribe((threarId) => this.threadId.set(threarId));
  }

  public getMessage(question: string) {
    this.messages.update((previusMessage) => [
      ...previusMessage,
      { isGpt: false, text: question },
    ]);

    this.isloading.set(true);

    // console.log({ threadId: this.threadId()!, question });

    this.openAiSerice
      .postMessage(this.threadId()!, question)
      .subscribe((data) => {
        this.isloading.set(false);
        console.log(data);
        this.messages.set([]);

        for (const iterator of data) {
          for (const mesaage of iterator.content) {
            this.messages.update((previusMessages) => [
              ...previusMessages,
              {
                isGpt: iterator.role === 'assistant',
                text: mesaage,
              },
            ]);
          }
        }
      });
  }
}
