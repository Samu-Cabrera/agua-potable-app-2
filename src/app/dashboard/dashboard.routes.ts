import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";

export const dashboardRoute: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];