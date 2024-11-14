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
            },
            {
                path: 'historial/:userId',
                loadComponent: () => import('./pages/historial/historial-layout/historial-layout.component').then(c => c.HistorialLayoutComponent),
                children: [
                    {
                        path: 'comprobantes',
                        loadComponent: () => import('./pages/historial/comprobante/comprobante.component').then(c => c.ComprobanteComponent)
                    },
                    {
                        path: 'comprobantes/:id',
                        loadComponent: () => import('./pages/historial/detalle-comprobante/detalle-comprobante.component').then(c => c.DetalleComprobanteComponent)
                    },
                    {
                        path: 'facturas',
                        loadComponent: () => import('./pages/historial/factura/factura.component').then(c => c.FacturaComponent)
                    },
                    {
                        path: 'facturas/:id',
                        loadComponent: () => import('./pages/historial/detalle-factura/detalle-factura.component').then(c => c.DetalleFacturaComponent)
                    }
                ]
            },
            {
                path: 'notificaciones',
                loadComponent: () => import('./pages/notificaciones/notificaciones.component').then(c => c.NotificacionesComponent)
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