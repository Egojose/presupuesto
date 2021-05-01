import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from '../servicios/servicios.service';
import { PresupuestoAnio } from '../interfaces/presupuestoAnio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.scss'],
})
export class AdministrarComponent implements OnInit {

  displayedColumns = ['anio', 'valor', 'valorComprometido', 'valorDisponible', 'valorBloqueado', 'acciones'];
  displayedColumnsDetallePresupuesto = ['Anio', 'Programa', 'Regional', 'Area', 'Cluster', 'Valor', 'ValorComprometido', 'ValorDisponible', 'ValorBloqueado', 'Accion'];
  dataSourcePresupuestos = new MatTableDataSource();
  dataSourceDetallePresuesto = new MatTableDataSource()
  presupuestos = [];
  presupuestoDetalle = [];
  anios: any[];
  programas: any[];
  form: FormGroup;
  regional: any[];
  cluster: any[];
  area: any[];
  medidas: any[];


  constructor(public servicio: ServiciosService, public fb: FormBuilder, public toastr: ToastrService, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Ano: ['', Validators.required],
      Concepto: ['', Validators.required],
      Regional: ['', Validators.required],
      Area: ['', Validators.required],
      Cluster: ['', Validators.required],
      Tiempo: ['', Validators.required],
      Medida: ['', Validators.required],
      Programa: ['', Validators.required]
    })
    this.obtenerPresupuesto();
    this.cargarAlInicio();
  }

  obtenerPresupuesto(): any {
    this.servicio.obtenerPresupuestos().then(
      async (respuesta: any) => {
        respuesta.sort((a: any, b: any) => a.Ano > b.Ano ? 1 : -1);
        await this.crearObjPresupuesto(respuesta);
        await this.resumirPresupuesto(this.presupuestos);
      }
    );
  }

  async crearObjPresupuesto(respuesta) {
    respuesta.forEach(element => {
      this.presupuestos.push({
        Ano: element.Ano,
        Valor: element.Valor,
        ValorComprometido: element.ValorComprometido,
        ValorDisponible: element.ValorDisponible,
        ValorBloqueado: element.ValorBloqueado
      })
    });
  }

  async resumirPresupuesto(presupuesto) {
    let result = [];
    presupuesto.reduce((res, value) => {
      if (!res[value.Ano]) {
        res[value.Ano] = { Ano: value.Ano, Valor: 0, ValorComprometido: 0, ValorDisponible: 0, ValorBloqueado: 0 };
        result.push(res[value.Ano])
      }
      res[value.Ano].Valor += value.Valor;
      res[value.Ano].ValorComprometido += value.ValorComprometido;
      res[value.Ano].ValorDisponible += value.ValorDisponible;
      res[value.Ano].ValorBloqueado += value.ValorBloqueado;
      return res;
    }, {});

    this.dataSourcePresupuestos.data = result
  }

  obtenerPresupuestosAno(anio: string) {
    this.spinner.show();
    this.servicio.obtenerPresupuestosAno(anio).then(
      (respuesta) => {
        this.presupuestoDetalle = PresupuestoAnio.fromJsonList(respuesta);
        this.dataSourceDetallePresuesto.data = this.presupuestoDetalle;
        this.spinner.hide();
      }
    ).catch(
      error => {
        this.spinner.hide();
        console.error('No se pudo cargar el presupuesto por año' + error);
      }
    )
  }

  getTotalValor() {
    let total = this.presupuestoDetalle.map(t => t.Valor).reduce((acc, value) => (+acc) + (+value), 0);
    return total;
  }
  getTotalValorComprometido() {
    let total = this.presupuestoDetalle.map(t => t.ValorComprometido).reduce((acc, value) => (+acc) + (+value), 0);
    return total;
  }
  getTotalValorDisponible() {
    let total = this.presupuestoDetalle.map(t => t.ValorDisponible).reduce((acc, value) => (+acc) + (+value), 0);
    return total;
  }
  getTotalValorBloqueado() {
    let total = this.presupuestoDetalle.map(t => t.ValorBloqueado).reduce((acc, value) => (+acc) + (+value), 0);
    return total;
  }

  cargarAlInicio() {
    this.obtenerAnios();
    this.obtenerProgramas();
    this.obtenerRegional();
    this.obtenerAreas();
    this.obtenerCluster();
    this.obtenerMedidas();
  }

  obtenerAnios() {
    this.servicio.obtenerAnios().then(
      (respuesta) => {
        this.anios = respuesta;
        console.log(respuesta);
      }
    )
  }

  obtenerProgramas() {
    this.servicio.obtenerProgramas().then(
      (respuesta) => {
        this.programas = respuesta
      }
    )
  }

  obtenerRegional() {
    this.servicio.obtenerElementos(environment.listaRegional).then(
      (respuesta) => {
        this.regional = respuesta;
      }
    )
  }

  obtenerAreas() {
    this.servicio.obtenerElementos(environment.listaArea).then(
      (respuesta) => {
        this.area = respuesta;
      }
    )
  }

  obtenerCluster() {
    this.servicio.obtenerElementos(environment.listaCluster).then(
      (respuesta) => {
        this.cluster = respuesta;
      }
    )
  }

  obtenerMedidas() {
    this.servicio.obtenerElementos(environment.listaMedidas).then(
      (respuesta) => {
        this.medidas = respuesta;
      }
    )
  }

  construirObjetoPresupuesto() {

    if(this.form.invalid) {
      this.mostrarAdvertencia('Todos los campos son obligatorios');
      return false;
    }

    let Ano = this.form.controls.Ano.value;
    let Concepto = this.form.controls.Concepto.value;
    let Regional = this.form.controls.Regional.value;
    let Area = this.form.controls.Area.value;
    let Cluster = this.form.controls.Cluster.value;
    let Tiempo = this.form.controls.Tiempo.value;
    let Medida = this.form.controls.Medida.value;
    let Programa = this.form.controls.Programa.value;
    let Valor = 0;
    let ValorBloqueado = 0;
    let ValorComprometido = 0;
    let ValorDisponible = 0;

    let objPresupuesto = {
      Ano,
      Concepto,
      Regional,
      Area,
      Cluster,
      Tiempo,
      Medida,
      Programa,
      Valor,
      ValorBloqueado,
      ValorComprometido,
      ValorDisponible

    }

    this.guardarPresupuesto(environment.listaPresupuesto, objPresupuesto)
  }

  guardarPresupuesto(lista: string, obj: Object) {
    this.servicio.guardar(lista, obj).then(
      (respuesta) => {
        this.mostrarExitoso('Se ha guardado correctamente');
        this.obtenerPresupuesto();
        this.limpiarForm();
      }
    ).catch(
      (err: Error) => {
        this.mostrarError('No se pudo guardar el presupuesto');
        console.error('Error al guardar', err)
      }
    )
  }

  limpiarForm() { 
    this.form.controls.Ano.setValue('');
    this.form.controls.Concepto.setValue('');
    this.form.controls.Regional.setValue('');
    this.form.controls.Area.setValue('');
    this.form.controls.Cluster.setValue('');
    this.form.controls.Tiempo.setValue('');
    this.form.controls.Medida.setValue('');
    this.form.controls.Programa.setValue('');
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
