import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  usuario: any;
  nombreUsuario: string;

  constructor(public servicio: ServiciosService, public router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.spinner.show();
    this.servicio.obtenerUsuarioActual().then(
      (respuesta) => {
        if (respuesta) {
          this.usuario = respuesta;
          this.nombreUsuario = this.usuario.Title;
          sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
          this.navegar();
          this.spinner.hide()
        }
      }
    ).catch((err: Error) => {
        console.error(`Error al cargar el usuario ${err}`);
        this.spinner.hide();
      }
    )
  }

  navegar() {
    this.router.navigate(['/administrar'])
  }
}
