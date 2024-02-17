import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gpt-message-orthography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gptMessageOrthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent {
  @Input({ required: true }) userScore!: number;

  @Input({ required: true }) message!: string;

  //Not required because the text can be correct without errors
  @Input() errors: string[] = [];
}
