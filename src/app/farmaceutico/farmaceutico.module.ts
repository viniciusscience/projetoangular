import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmaceuticoComponent } from './farmaceutico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FarmaceuticoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class FarmaceuticoModule {}
