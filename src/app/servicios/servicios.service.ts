import { Injectable } from '@angular/core';
import { sp, IEmailProperties } from '@pnp/sp/presets/all';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor() { }

  public obtenerConfiguracion(): any {
    const configuracion = sp.configure({
      headers: {
        Accept: 'application/json; odata=verbose'
      },
    }, environment.urlWeb);
    return configuracion;
  }

  obtenerUsuarioActual(): any {
    const respuesta = this.obtenerConfiguracion().wen.currentUser.select('*', 'Author/Department').expand('Author').get();
    return respuesta;
  }

  obtenerPresupuestos(): any {
    const respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaPresupuesto).items.getAll();
    return respuesta;
  }
}


