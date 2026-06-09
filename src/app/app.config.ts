import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { routes } from './app.routes';
import { LucideAngularModule } from 'lucide-angular';
import { APP_ICONS } from './shared/icons';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withRouterConfig({ onSameUrlNavigation: 'reload' })),
    // Configura HttpClient con el interceptor de autenticación
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(LucideAngularModule.pick(APP_ICONS))
  ]
};
