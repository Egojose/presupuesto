import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

  id: number;
  dataSourcePresupuesto = new MatTableDataSource();
  presupuesto: any;
  anio: string;
  programa: string;
  regional: string;
  area: string;
  proyecto: string;
  valorPresupuesto: number;
  valorComprometido: number;
  valorDisponible: number;
  valorBloqueado: number;
  valorIngresos: number;

  displayedColumnsPresupuestos = [
    "Tipo",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  Meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  mesEditar: string;
  valorMesEditar = 0;
  mesBloquear: string;
  valorMesBloquear = 0;
  presupuestoActual: Object;
  presupuestoBloqueado: { Tipo: string; Enero: any; Febrero: any; Marzo: any; Abril: any; Mayo: any; Junio: any; Julio: any; Agosto: any; Septiembre: any; Octubre: any; Noviembre: any; Diciembre: any; };
  ingresos: any;
  ingresosResumen: Object;




  constructor(public route: ActivatedRoute, public servicio: ServiciosService, public toastr: ToastrService, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id)
      if (this.id > 0) {
        this.consultarPresupuesto();
        this.obtenerIngresos();
        // this.ObtenerCompras();
        // this.ObtenerComponentes();
      }
    });
  }

  consultarPresupuesto() {
    let arrayPresupuesto = [];
    this.servicio.obtenerPresupuestoxId(this.id).then(
      async (respuesta) => {
        this.presupuesto = respuesta[0];
        console.log(this.presupuesto);
        await this.asignarPresupuestoActual();
        await this.asignarValoresPresupuesto();
        await this.asignarPresupuestoBloqueado();
      }
    )
  }

  async asignarPresupuestoActual() {
    this.presupuestoActual = {
      Tipo: "Presupuesto",
      Enero: this.presupuesto.Enero,
      Febrero: this.presupuesto.Febrero,
      Marzo: this.presupuesto.Marzo,
      Abril: this.presupuesto.Abril,
      Mayo: this.presupuesto.Mayo,
      Junio: this.presupuesto.Junio,
      Julio: this.presupuesto.Julio,
      Agosto: this.presupuesto.Agosto,
      Septiembre: this.presupuesto.Septiembre,
      Octubre: this.presupuesto.Octubre,
      Noviembre: this.presupuesto.Noviembre,
      Diciembre: this.presupuesto.Diciembre,
    }
    // this.dataSourcePresupuesto.data = this.presupuestoActual
  }

  async asignarPresupuestoBloqueado() {
    this.presupuestoBloqueado = {
      Tipo: "Bloqueado",
      Enero: this.presupuesto.EneroBloqueado,
      Febrero: this.presupuesto.FebreroBloqueado,
      Marzo: this.presupuesto.MarzoBloqueado,
      Abril: this.presupuesto.AbrilBloqueado,
      Mayo: this.presupuesto.MayoBloqueado,
      Junio: this.presupuesto.JunioBloqueado,
      Julio: this.presupuesto.JulioBloqueado,
      Agosto: this.presupuesto.AgostoBloqueado,
      Septiembre: this.presupuesto.SeptiembreBloqueado,
      Octubre: this.presupuesto.OctubreBloqueado,
      Noviembre: this.presupuesto.NoviembreBloqueado,
      Diciembre: this.presupuesto.DiciembreBloqueado,
    };
  }

  async asignarValoresPresupuesto() {
    this.anio = this.presupuesto.Ano;
    this.programa = this.presupuesto.Programa;
    this.regional = this.presupuesto.Regional;
    this.area = this.presupuesto.Area;
    this.proyecto = this.presupuesto.Cluster;
    this.valorPresupuesto = this.presupuesto.Valor;
    this.valorComprometido = this.presupuesto.ValorComprometido;
    this.valorDisponible = this.presupuesto.ValorDisponible;
    this.valorBloqueado = this.presupuesto.ValorBloqueado;
    this.valorIngresos = this.presupuesto.ValorIngresos;
  }

  obtenerIngresos() {
    this.servicio.ObtenerIngresos(this.id).then(
      async (respuesta) => {
        this.ingresos = respuesta.sort((a: any, b: any) =>  a.Mes > b.Mes ? 1 : -1)
        console.log(this.ingresos);
        await this.consolidarIngresos();
      }
    )
  }

  async consolidarIngresos() {
    let Enero = await this.filtrarIngresos(this.ingresos, 1);
    let Febrero = await  this.filtrarIngresos(this.ingresos, 2);
    let Marzo = await this.filtrarIngresos(this.ingresos, 3);
    let Abril = await this.filtrarIngresos(this.ingresos, 4);
    let Mayo = await this.filtrarIngresos(this.ingresos, 5);
    let Junio = await this.filtrarIngresos(this.ingresos, 6);
    let Julio = await this.filtrarIngresos(this.ingresos, 7);
    let Agosto = await this.filtrarIngresos(this.ingresos, 8);
    let Septiembre = await this.filtrarIngresos(this.ingresos, 9);
    let Octubre = await this.filtrarIngresos(this.ingresos, 10);
    let Noviembre = await this.filtrarIngresos(this.ingresos, 11);
    let Diciembre = await this.filtrarIngresos(this.ingresos, 12);
    this.ingresosResumen = {
      Tipo: 'Ingreso',
      Enero,
      Febrero,
      Marzo,
      Abril,
      Mayo,
      Junio,
      Julio,
      Agosto,
      Septiembre,
      Octubre,
      Noviembre,
      Diciembre
    }

    console.log(this.ingresosResumen)
  }

  async filtrarIngresos(array, mes: number) {
    let suma = 0
    let mesFiltrado = await array.filter((x) => x['Mes'] === mes)
    mesFiltrado.forEach((x) => suma += x['Valor'])
    return suma;
  }

  // async sumarIngresos(array) {
  //   let valorIngresosMes;
  //   valorIngresosMes = array.reduce((acc, val) => {
  //     acc + val
  //     console.log(acc, val);
  //   })
  //   return valorIngresosMes
  // }

  validar(condicion: boolean, mensaje: string) {
    if(condicion) {
      this.mostrarAdvertencia(mensaje);
      return true;
    }
  }

  editarPresupuesto() {
    let contador = 0;
    let validacionMes = this.validar((!this.mesEditar || this.mesEditar === ''), 'Debe elegir el mes a editar');
    let validacionValor = this.validar((!this.valorMesEditar || this.valorMesEditar === 0), 'Debe agregar el valor del mes');
    
    validacionMes && contador++;
    validacionValor && contador++;
  
    this.spinner.show();
    if(contador > 0) {
      this.spinner.hide();
      return false;
    }

    let obj = {
      [this.mesEditar]: `${this.valorMesEditar}`
    }
    this.servicio.ActualizarPresupuesto(this.id, obj).then(
      (respuesta) => {
        this.spinner.hide();
        this.mostrarExitoso('El presupuesto se actualió correctamente');
      }
    )
  }




  mostrarAdvertencia(mensaje: string) {
    this.toastr.warning(mensaje, 'Validación!')
  }

  mostrarExitoso(mensaje: string) {
    this.toastr.success(mensaje, 'Correcto!')
  }

  mostrarError(mensaje: string) {
    this.toastr.error(mensaje, 'Oops!')
  }

  mostrarInfo(mensaje: string) {
    this.toastr.info(mensaje, 'Información!')
  }
}
