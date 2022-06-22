import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmaceuticoComponent } from './farmaceutico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FarmaceuticoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FarmaceuticoModule {}
