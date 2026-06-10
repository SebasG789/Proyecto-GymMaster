import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.css',
})
export class ForbiddenComponent {

}
