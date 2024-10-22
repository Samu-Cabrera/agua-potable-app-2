import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";

export const dashboardRoute: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
            {
                path: 'users',
                loadComponent: () => import('./pages/user-list/user-list.component').then(c => c.UserListComponent)
            },
            {
                path: 'comprobante/:id',
                loadComponent: () => import('./pages/comprobante/comprobante.component').then(c => c.ComprobanteComponent)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];