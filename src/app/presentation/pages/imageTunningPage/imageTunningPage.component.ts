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
  GtpEditIamgeComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { Message } from '@interfaces/mesaage.interface';
import { OpenAiServiceService } from 'app/presentation/services/open-ai-service.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMessageComponent,
    ChatLoaderComponent,
    TextMessageBoxComponent,
    GtpEditIamgeComponent,
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageTunningPageComponent {
  private openAiSerice = inject(OpenAiServiceService);
  public messages = signal<Message[]>([
    {
      isGpt: true,
      text: 'hola',
      imageUrl:
        'http://localhost:3000/gpt/image-generation/e1114707-cbe5-4700-8854-0b0b97ff3ef1.png',
    },
  ]);

  public isloading = signal(false);

  public originalImage = signal<string | undefined>(undefined);
  public maskIamge = signal<string | undefined>(undefined);

  public getMessage(prompt: string) {
    this.messages.update((previusMessage) => [
      ...previusMessage,
      {
        isGpt: false,
        text: prompt,
      },
    ]);
    this.isloading.set(true);
    this.openAiSerice
      .imageGeneration(prompt, this.originalImage(), this.maskIamge())
      .subscribe((resp) => {
        this.isloading.set(false);
        this.messages.update((previusMessage) => [
          ...previusMessage,
          {
            isGpt: true,
            text: 'Variación de la imagen original:',
            imageUrl: resp.imageUrl,
          },
        ]);
      });
  }

  //modal to show image
  public handleIamgeUrl(newIamge: string, originalIamge: string) {
    this.originalImage.set(originalIamge);
    this.maskIamge.set(newIamge);
    console.log({ newIamge, originalIamge });
  }
  public generateVariation() {
    this.isloading.set(true);

    this.openAiSerice
      .imageVariation(this.originalImage()!)
      .subscribe((resp) => {
        this.isloading.set(false);
        this.messages.update((previusMessages) => [
          ...previusMessages,
          {
            isGpt: true,
            text: 'Variacación:',
            imageUrl: resp.imageUrl,
          },
        ]);
      });
  }
}
