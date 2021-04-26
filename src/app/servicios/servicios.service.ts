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
    const respuesta = this.obtenerConfiguracion().web.currentUser.select('*', 'Author/Department').expand('Author').get();
    return respuesta;
  }

  obtenerPresupuestos(): any {
    const respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaPresupuesto).items.getAll();
    return respuesta;
  }

  obtenerPresupuestosAno(anio: string) {
    const respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaPresupuesto).items.select("*").filter(`Ano eq ${anio}`).getAll(); //"Ano eq '" + anio + "'"
    return respuesta;
  }

  obtenerElementos(lista) {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(lista).items.getAll();
    return respuesta;
  }

  obtenerAnios() {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaAnios).items.getAll();
    return respuesta;
  }

  obtenerProgramas() {
    let respuesta = this.obtenerConfiguracion().web.lists.getByTitle(environment.listaProgramas).items.getAll();
    return respuesta;
  }

  guardar(lista: string, obj: Object) {
    return this.obtenerConfiguracion().web.lists.getByTitle(lista).items.add(obj);
  }

  
}


