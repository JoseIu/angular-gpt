import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';

@Component({
  selector: 'gtp-edit-iamge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gtpEditIamge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GtpEditIamgeComponent implements AfterViewInit {
  @Input({ required: true }) message!: string;
  @Input({ required: true }) imageUrl!: string;

  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;
  public imageRollBack = signal<HTMLImageElement | null>(null);

  @Output() imageEmit = new EventEmitter<string>();

  //Canvas
  public isDrawing = signal(false);
  public coords = signal({ x: 0, y: 0 });

  ngAfterViewInit(): void {
    if (!this.canvasElement?.nativeElement) return;

    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.imageUrl;

    this.imageRollBack.set(image);

    image.onload = () => {
      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  onMouseDown(event: MouseEvent) {
    if (!this.canvasElement?.nativeElement) return;

    this.isDrawing.set(true);

    const canvasRef = this.canvasElement.nativeElement;

    //Obtenemos las coordenadas del mouse relativo al canvas
    const startX = event.clientX - canvasRef.getBoundingClientRect().left;
    const startY = event.clientY - canvasRef.getBoundingClientRect().top;

    //Seteamos los valores a coors
    this.coords.set({ x: startX, y: startY });
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing() || !this.canvasElement?.nativeElement) return;

    const canvasRef = this.canvasElement?.nativeElement;

    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    //Calcular el alto y ancho del rectangulo
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;

    const context = canvasRef.getContext('2d');

    context?.clearRect(0, 0, canvasWidth, canvasHeight);
    context?.drawImage(this.imageRollBack()!, 0, 0, canvasWidth, canvasHeight);

    //Pintamos el rectangulo
    context?.clearRect(this.coords().x, this.coords().y, width, height);
  }

  onMouseUp() {
    this.isDrawing.set(false);
    const canvasRef = this.canvasElement!.nativeElement;

    const url = canvasRef.toDataURL('image/png');

    this.imageEmit.emit(url);
  }

  public handleImageUrl() {
    this.imageEmit.emit(this.imageUrl);
  }
}
