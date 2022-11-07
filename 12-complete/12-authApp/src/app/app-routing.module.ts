import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    //Evitar cargar el modulo si no esta autenticado, y/o obligarlo a que pase por el modulo
    canActivate: [ ValidarTokenGuard ],  //Cuando intente cargar los componentes de la ruta
    canLoad : [ ValidarTokenGuard ]  //Cuando este intentando cargar el modulo
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
