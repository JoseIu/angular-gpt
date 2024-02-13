import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
})
export class NavItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;
}
