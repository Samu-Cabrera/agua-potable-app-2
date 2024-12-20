import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";

export const dashboardRoute: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
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
                loadComponent: () => import('./pages/notificaciones/notificaciones.component').then(c => c.NotificacionesComponent),
            },
            {
                path: 'notificaciones/nuevo',
                loadComponent: () => import('./pages/notificaciones/crear-notificacion/crear-notificacion.component').then(c => c.CrearNotificacionComponent),
                children: [
                    {
                        path: 'reunion',
                        loadComponent: () => import('./pages/notificaciones/reunion/reunion.component').then(c => c.ReunionComponent)
                    },
                    {
                        path: 'corte-agua',
                        loadComponent: () => import('./pages/notificaciones/corte/corte.component').then(c => c.CorteComponent)
                    },
                    {
                        path: 'personalizado',
                        loadComponent: () => import('./pages/notificaciones/personalizado/personalizado.component').then(c => c.PersonalizadoComponent)
                    }
                ]
            },
            {
                path: 'estadistica',
                loadComponent: () => import('./pages/estadistica/estadistica.component').then(c => c.EstadisticaComponent),
                children: [
                    {
                        path: 'finanza',
                        loadComponent: () => import('./pages/estadistica/finanza/finanza.component').then(c => c.FinanzaComponent)
                    },
                    {
                        path: 'consumo',
                        loadComponent: () => import('./pages/estadistica/consumo/consumo.component').then(c => c.ConsumoComponent)
                    },
                    {
                        path: 'usuario',
                        loadComponent: () => import('./pages/estadistica/usuarios/usuarios.component').then(c => c.UsuariosComponent)
                    }
                ]
            },
            {
                path: 'transacciones',
                loadComponent: () => import('./pages/transaccion/transaccion.component').then(c => c.TransaccionComponent)
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