import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'gpt-message',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './gptMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageComponent {
  @Input({ required: true }) message!: string;
  @Input() audioUrl?: string;
}
