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

@Component({
  selector: 'text-message-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textMessageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrection: boolean = false;

  @Output() onSendMessage = new EventEmitter<string>();

  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    prompt: ['', Validators.required],
  });

  onSubmit() {
    if (this.myForm.invalid) return;

    const { prompt } = this.myForm.value;
    this.onSendMessage.emit(prompt!);
    this.myForm.reset();
  }
}
