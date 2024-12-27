import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/layout/layout.component').then(c => c.LayoutComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
            {
                path: 'consumo/:id',
                loadComponent: () => import('./pages/consumo/consumo.component').then(c => c.ConsumoComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
]