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
import { TextMessageEvent } from '@interfaces/textMessage.interface';

@Component({
  selector: 'text-message-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textMessageFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageFileComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrection: boolean = false;

  @Output() onSendMessage = new EventEmitter<TextMessageEvent>();

  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    prompt: [],
    file: [null, Validators.required],
  });

  handleFileInput(event: any) {
    const file = event.target.files.item(0);

    this.myForm.controls.file.setValue(file);
  }

  onSubmit() {
    if (this.myForm.invalid) return;

    const { prompt, file } = this.myForm.value;

    this.onSendMessage.emit({ prompt, file: file! });
    this.myForm.reset();
  }
}
