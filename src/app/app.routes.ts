import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./containers/dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'bikes',
    loadComponent: () => import('./containers/bikes/bikes-list.component').then(m => m.BikesListComponent),
    children: [
      {
        path: ':bike-name',
        loadComponent: () => import('./containers/bikes/bike-details/bike-details.component').then(m => m.BikeDetailsComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./containers/core/not-found/not-found.component').then(c => c.NotFoundComponent),
  },
];
