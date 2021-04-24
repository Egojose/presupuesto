import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministrarComponent implements OnInit {

  displayedColumns = ['anio', 'valor', 'valorComprometido', 'valorDisponible', 'valorBloqueado', 'acciones'];
  dataSource = new MatTableDataSource();

  constructor(public servicio: ServiciosService) { }

  ngOnInit(): void {
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto(): any {
    this.servicio.obtenerPresupuestos().then(
      (respuesta: any) => {
        this.dataSource.data = respuesta;
      }
    );
  }

}
