import { FornecedorModel } from './../model/fornecedor-model';
import { Fornecedor } from './../domain/fornecedor';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss'],
})
export class FornecedorComponent implements OnInit {
  list: Fornecedor[] = [];

  form: FormGroup = this.formBuilder.group({
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cnpj: new FormControl(null, [
      Validators.required,
      Validators.minLength(14),
    ]),
    aniver: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Fornecedor[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }
  cadastrar(): void {
    const fornecedor: FornecedorModel = this.form.getRawValue();
    this.post(fornecedor).subscribe((domain: Fornecedor) => {
      if (domain.id) {
        this.list.push(domain);
      }
    });
  }
  private post(model: FornecedorModel): Observable<Fornecedor> {
    const url = 'http://localhost:8080/fornecedor/cadastrar';
    return this.http.post<Fornecedor>(url, model);
  }

  private get(): Observable<Fornecedor[]> {
    const url = 'http://localhost:8080/fornecedor/consultar';
    return this.http.get<Fornecedor[]>(url);
  }
}
