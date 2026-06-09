import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  // Formulario de registro
  registerForm: FormGroup;

  // Mensaje de error o éxito
  error: string = '';
  success: string = '';

  // Estado de carga
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['Cliente']
    });
  }

  // Se ejecuta cuando el usuario envía el formulario
  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.success = 'Usuario registrado correctamente';
        // Redirige al login después de 2 segundos
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: () => {
        this.error = 'Error al registrar el usuario';
        this.loading = false;
      }
    });
  }

}
