import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from '../domain/cliente';
import { ClienteModel } from '../model/cliente-model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  list: Cliente[] = [];

  form: FormGroup = this.formBuilder.group({
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    aniver: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Cliente[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  cadastrar(): void {
    const cliente: ClienteModel = this.form.getRawValue();
    this.post(cliente).subscribe((domain: Cliente) => {
      if (domain.id) {
        this.list.push(domain);
      }
    });
  }

  private post(model: ClienteModel): Observable<Cliente> {
    const url = 'http://localhost:8080/cliente/cadastrar';
    return this.http.post<Cliente>(url, model);
  }

  private get(): Observable<Cliente[]> {
    const url = 'http://localhost:8080/cliente/consultar';
    return this.http.get<Cliente[]>(url);
  }
}
