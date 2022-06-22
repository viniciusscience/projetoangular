import { FarmaceuticoModule } from './farmaceutico/farmaceutico.module';
import { ProdutoModule } from './produto/produto.module';
import { ClienteModule } from './cliente/cliente.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SobreModule } from './sobre/sobre.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SobreModule,
    MenuModule,
    FornecedorModule,
    ClienteModule,
    ProdutoModule,
    FarmaceuticoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
