import { Routes } from '@angular/router';
import { AuthenticationGuard } from '@cccteam/ccc-lib';
import { resourceRoutes } from '@components/Resource/resources-helpers';
import { UiComponent } from '@components/ui/ui.component';
import { usersConfig } from './configs/users.config';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((comp) => comp.LoginComponent),
  },
  {
    path: '',
    component: UiComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/ui/dashboard/dashboard.component').then((comp) => comp.DashboardComponent),
      },
      resourceRoutes(usersConfig),
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
