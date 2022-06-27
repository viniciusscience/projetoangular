import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, Observable } from 'rxjs';
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
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    aniver: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarTabela();
  }
  private carregarTabela() {
    this.get().subscribe((domains: Cliente[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  cadastrar(): void {
    const id = this.form.controls['id'].value;
    const cliente: ClienteModel = this.form.getRawValue();
    if (id) {
      this.put(id, cliente).subscribe((domain: Cliente) => {
        if (domain.id) {
          this.carregarTabela();
          this.form.reset();
        }
      });
    } else {
      this.post(cliente).subscribe((domain: Cliente) => {
        if (domain.id) {
          this.list.push(domain);
          this.form.reset();
        }
      });
    }
  }

  editar(cliente: Cliente): void {
    this.form.controls['id'].setValue(cliente.id);
    this.form.controls['nome'].setValue(cliente.id);
    this.form.controls['cpf'].setValue(cliente.documento);
    this.form.controls['email'].setValue(cliente.email);
    this.form.controls['aniver'].setValue(cliente.aniver);
  }
  deletar(id: string): void {
    alert('Voce quer deletar isso ??');
    this.delete(id).subscribe((domain: Cliente) => {
      this.carregarTabela();
    });
  }

  private delete(id: string): Observable<Cliente> {
    const url = 'http://localhost:8080/cliente/remover/' + id;
    return this.http.delete<Cliente>(url);
  }
  private post(model: ClienteModel): Observable<Cliente> {
    const url = 'http://localhost:8080/cliente/cadastrar';
    return this.http.post<Cliente>(url, model);
  }
  private put(id: string, model: ClienteModel): Observable<Cliente> {
    const url = 'http://localhost:8080/cliente/alterar/' + id;
    return this.http.put<Cliente>(url, model);
  }

  private get(): Observable<Cliente[]> {
    const url = 'http://localhost:8080/cliente/consultar';
    return this.http.get<Cliente[]>(url);
  }
}
