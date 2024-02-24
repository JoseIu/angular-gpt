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
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './imageGenerationPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGenerationPageComponent {
  private openAiSerice = inject(OpenAiServiceService);

  public messages = signal<Message[]>([]);

  public isloading = signal(false);

  public getMessage(prompt: string) {
    this.messages.update((previusMessage) => [
      ...previusMessage,
      {
        isGpt: false,
        text: prompt,
      },
    ]);
    this.openAiSerice.imageGeneration(prompt).subscribe((resp) => {
      this.isloading.set(false);
      this.messages.update((previusMessage) => [
        ...previusMessage,
        {
          isGpt: true,
          text: 'Imagen generada:',
          imageUrl: resp.imageUrl,
        },
      ]);
    });
  }
}
