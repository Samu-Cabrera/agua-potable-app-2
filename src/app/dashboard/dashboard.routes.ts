import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout/layout.component";

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