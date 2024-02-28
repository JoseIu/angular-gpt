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
  public messages = signal<Message[]>([]);

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
