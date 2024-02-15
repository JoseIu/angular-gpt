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
import { TextMessageBoxSelect } from '@interfaces/text.MessageSelect.interface';
import { OpenAiServiceService } from 'app/presentation/services/open-ai-service.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {
  private openAiSerice = inject(OpenAiServiceService);
  public messages = signal<Message[]>([
    { message: 'Hello', isGpt: true },
    { message: 'Hello', isGpt: false },
  ]);
  public isloading = signal(false);
  public getMessage(event: TextMessageBoxSelect) {
    console.log(event);
  }
}
