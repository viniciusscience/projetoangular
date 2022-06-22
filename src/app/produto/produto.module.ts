import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProdutoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ProdutoModule {}
