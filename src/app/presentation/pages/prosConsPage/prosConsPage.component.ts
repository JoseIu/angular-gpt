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
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsPageComponent {
  private openAiSerice = inject(OpenAiServiceService);

  public messages = signal<Message[]>([]);

  public isloading = signal(false);

  public getMessage(prompt: string) {
    console.log(prompt);
    this.isloading.set(true);

    //Our messages
    this.messages.update((previusMessages) => [
      ...previusMessages,
      {
        isGpt: false,
        text: prompt,
      },
    ]);

    this.openAiSerice.prosCons(prompt).subscribe((resp) => {
      this.isloading.set(false);

      //OpenAI messages
      this.messages.update((previusMessages) => [
        ...previusMessages,
        {
          isGpt: true,
          text: resp.content,
        },
      ]);
    });
  }
}
