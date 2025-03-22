import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  private readonly router = inject(Router);

  goToBikes(): void {
    this.router.navigate(['/bikes']);
  }
}
