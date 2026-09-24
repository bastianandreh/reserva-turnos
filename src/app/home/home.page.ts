import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonList,
  IonIcon,
  IonButton,
} from '@ionic/angular';

interface Turno {
  hora: string;
  estado: 'Disponible' | 'Reservado';
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonDatetime,
    IonList,
    IonIcon,
    IonButton,
  ],
})
export class HomePage {
  fechaSeleccionada: string = new Date().toISOString();

  private turnosPorFecha: { [fecha: string]: Turno[] } = {};

  turnos: Turno[] = [];

  constructor() {
    this.cargarTurnosDeFecha(this.fechaSeleccionada);
  }


  private obtenerClaveFecha(fechaIso: string): string {
    return fechaIso.substring(0, 10);
  }

  private generarTurnosPorDefecto(): Turno[] {
    return [
      { hora: '08:00', estado: 'Disponible' },
      { hora: '09:00', estado: 'Disponible' },
      { hora: '10:00', estado: 'Disponible' },
      { hora: '11:00', estado: 'Disponible' },
      { hora: '12:00', estado: 'Disponible' },
    ];
  }

  private cargarTurnosDeFecha(fechaIso: string): void {
    const clave = this.obtenerClaveFecha(fechaIso);

    if (!this.turnosPorFecha[clave]) {
      this.turnosPorFecha[clave] = this.generarTurnosPorDefecto();
    }

    this.turnos = this.turnosPorFecha[clave];
  }
  onFechaCambiada(valor: any): void {
    this.fechaSeleccionada = valor;
    this.cargarTurnosDeFecha(valor);
  }

  reservarTurno(turno: Turno): void {
    if (turno.estado === 'Disponible') {
      turno.estado = 'Reservado';
    }
  }

  get turnosDisponibles(): number {
    return this.turnos.filter(t => t.estado === 'Disponible').length;
  }
}