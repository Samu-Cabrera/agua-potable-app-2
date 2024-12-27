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
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.routes').then(c => c.dashboardRoute)
    },
    {
        path: 'client',
        loadChildren: () => import('./client/client.routes').then(c => c.routes)
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
