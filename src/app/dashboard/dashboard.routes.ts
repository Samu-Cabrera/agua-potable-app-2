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
                path: 'imprimir/comprobante/:id',
                loadComponent: () => import('./pages/print-comprobante/print-comprobante.component').then(c => c.PrintComprobanteComponent)
            },
            {
                path: 'historial',
                loadComponent: () => import('./pages/historial/historial.component').then(c => c.HistorialComponent),
                children: [
                    {
                        path: 'comprobantes',
                        loadComponent: () => import('./pages/historial-comprobante/historial-comprobante.component').then(c => c.HistorialComprobanteComponent)
                    },
                    {
                        path: 'facturas',
                        loadComponent: () => import('./pages/historia-factura/historia-factura.component').then(c => c.HistoriaFacturaComponent)
                    }
                ]
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