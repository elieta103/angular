import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import  {Componente1Component} from './componente1/componente1.component'
import { Componente2Component } from './componente2/componente2.component';
import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './template/default.component';


const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: '', component: DefaultComponent,
              children: [{path: 'calendario' , component: Componente1Component},
                         {path: 'audiencia'  , component: Componente2Component},

    ]},
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
