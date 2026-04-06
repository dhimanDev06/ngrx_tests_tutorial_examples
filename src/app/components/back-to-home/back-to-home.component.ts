import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-to-home',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './back-to-home.component.html',
  styleUrl: './back-to-home.component.scss'
})
export class BackToHomeComponent {

  private router = inject(Router);

  backToHome() : void {
    this.router.navigate(['']);
  }

}