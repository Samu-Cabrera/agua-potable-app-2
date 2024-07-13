import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(c => c.authRoutes) 
    }, 
    {
        path: 'medidor',
        loadChildren: () => import('./medidor/medidor.routes').then(c => c.medidorRoute)
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
