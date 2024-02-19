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
  selector: 'chat-templade',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chatTemplade.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTempladeComponent {
  private openAiSerice = inject(OpenAiServiceService);

  public messages = signal<Message[]>([
    { text: 'Hello', isGpt: true },
    { text: 'Hello', isGpt: false },
  ]);

  public isloading = signal(false);

  public getMessage(prompt: string) {
    console.log(prompt);
  }
}
