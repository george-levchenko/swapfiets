import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./containers/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'bikes',
    loadComponent: () => import('./containers/bikes/bikes-list.component').then(m => m.BikesListComponent),
    pathMatch: 'full',
  },
  {
    path: 'bikes/details/:id',
    loadComponent: () => import('./containers/bikes/bike-details/bike-details.component').then(m => m.BikeDetailsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./containers/core/not-found/not-found.component').then(c => c.NotFoundComponent),
  },
];
