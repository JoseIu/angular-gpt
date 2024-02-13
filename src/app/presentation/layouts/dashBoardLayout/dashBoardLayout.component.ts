import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from '@components/index';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dash-board-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavItemComponent],
  templateUrl: './dashBoardLayout.component.html',
  styleUrl: './dashBoardLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashBoardLayoutComponent {
  public routes = routes[0].children?.filter((route) => route.data);
}
