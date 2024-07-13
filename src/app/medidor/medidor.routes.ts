import { Routes } from '@angular/router';
import { MedidorLayoutComponent } from './layouts/medidor-layout.component';

export const medidorRoute: Routes = [
    {
        path: '',
        component: MedidorLayoutComponent,
    },
    {
        path: '**',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    }
] 