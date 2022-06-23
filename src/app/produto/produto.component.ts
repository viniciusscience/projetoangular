import { Produto } from './../domain/produto';
import { ProdutoModel } from './../model/produto-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  list: Produto[] = [];
  form: FormGroup = this.formBuilder.group({
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    valor: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Produto[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  cadastrar(): void {
    const Produto: ProdutoModel = this.form.getRawValue();
    this.post(Produto).subscribe((domain: Produto) => {
      if (domain.id) {
        this.list.push(domain);
      }
    });
  }

  private post(model: ProdutoModel): Observable<Produto> {
    const url = 'http://localhost:8080/produto/cadastrar';
    return this.http.post<Produto>(url, model);
  }

  private get(): Observable<Produto[]> {
    const url = 'http://localhost:8080/produto/consultar';
    return this.http.get<Produto[]>(url);
  }
}
