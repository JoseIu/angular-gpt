import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gpt-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gptMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageComponent {
  @Input({ required: true }) message!: string;
}
