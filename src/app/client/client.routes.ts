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
            },
            {
                path: 'historial/:id',
                loadComponent: () => import('./pages/historial/historial.component').then(c => c.HistorialComponent),
                children: [
                    {
                        path: 'facturas',
                        loadComponent: () => import('./pages/historial/facturas/facturas.component').then(c => c.FacturasComponent)
                    },
                    {
                        path: 'recibos',
                        loadComponent: () => import('./pages/historial/recibos/recibos.component').then(c => c.RecibosComponent)
                    }
                ]
            },
            {
                path: 'avisos/:id',
                loadComponent: () => import('./pages/aviso/aviso.component').then(c => c.AvisoComponent)
            },
            {
                path: 'calculator/:id',
                loadComponent: () => import('./pages/calculator/calculator.component').then(c => c.CalculatorComponent)
            },
            {
                path: 'reglamentos',
                loadComponent: () => import('./pages/reglamentos/reglamentos.component').then(c => c.ReglamentosComponent)
            },
            {
                path: 'perfil/:id',
                loadComponent: () => import('./pages/perfil/perfil.component').then(c => c.PerfilComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
]