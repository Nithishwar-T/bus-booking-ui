import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
      .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register')
      .then(m => m.Register)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
      .then(m => m.Dashboard)
  },

  {
    path: 'buses',
    loadComponent: () =>
      import('./pages/buses/buses')
      .then(m => m.Buses)
  },

  {
    path: 'booking',
    loadComponent: () =>
      import('./pages/booking/booking')
      .then(m => m.Booking)
  },

  {
    path: 'my-bookings',
    loadComponent: () =>
      import('./pages/my-bookings/my-bookings')
      .then(m => m.MyBookings)
  },

  {
  path: 'admin-dashboard',
  canActivate:[authGuard],
  loadComponent: () =>
    import('./pages/admin-dashboard/admin-dashboard')
    .then(m => m.AdminDashboard)
},

  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./pages/booking/booking')
      .then(m => m.Booking)
  },
  
{
  path:'invoice/:id',
  canActivate:[authGuard],
  loadComponent:() =>
    import('./pages/invoice/invoice')
    .then(m => m.InvoicePage)
}

];