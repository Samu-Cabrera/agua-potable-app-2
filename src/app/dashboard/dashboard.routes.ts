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