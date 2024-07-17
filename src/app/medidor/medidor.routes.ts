import { Routes } from '@angular/router';
import { MedidorLayoutComponent } from './layouts/medidor-layout.component';
import { MedidorUserListComponent } from './pages/medidor-user-list/medidor-user-list.component';
import { LecturaMedidorComponent } from './pages/lectura-medidor/lectura-medidor.component';

export const medidorRoute: Routes = [
    {
        path: '',
        component: MedidorLayoutComponent,
        children: [
            {
                path: 'users',
                component: MedidorUserListComponent
            },
            {
                path: 'user/:id',
                component: LecturaMedidorComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    }
] 