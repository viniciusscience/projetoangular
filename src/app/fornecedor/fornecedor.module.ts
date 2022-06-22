import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorComponent } from './fornecedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FornecedorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FornecedorModule {}
