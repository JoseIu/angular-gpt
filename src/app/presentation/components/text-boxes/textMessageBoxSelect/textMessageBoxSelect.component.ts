import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Option,
  TextMessageBoxSelect,
} from '@interfaces/text.MessageSelect.interface';

@Component({
  selector: 'text-message-box-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  @Input() placeholder: string = '';
  @Input({ required: true }) options!: Option[];

  @Output() onSendMessage = new EventEmitter<TextMessageBoxSelect>();

  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    prompt: ['', Validators.required],
    selectOption: ['', Validators.required],
  });

  onSubmit() {
    if (this.myForm.invalid) return;

    const { prompt, selectOption } = this.myForm.value;

    this.onSendMessage.emit({ prompt: prompt!, selectOption: selectOption! });
    this.myForm.reset();
  }
}
