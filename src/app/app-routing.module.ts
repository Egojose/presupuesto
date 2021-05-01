import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarComponent } from './administrar/administrar.component';
import { LayoutComponent } from './layout/layout.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, 
    children: [
      {
        path: 'administrar', component: AdministrarComponent
      },
      {
        path: 'presupuesto/:id', component: PresupuestoComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
