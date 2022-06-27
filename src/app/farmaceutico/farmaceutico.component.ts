import { FarmaceuticoModel } from './../model/farmaceutico-model';
import { Farmaceutico } from './../domain/farmaceutico';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-farmaceutico',
  templateUrl: './farmaceutico.component.html',
  styleUrls: ['./farmaceutico.component.scss'],
})
export class FarmaceuticoComponent implements OnInit {
  list: Farmaceutico[] = [];

  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    dataNascimento: new FormControl(null, [Validators.required]),
    promocaododia: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarTabela();
  }
  private carregarTabela() {
    this.get().subscribe((domains: Farmaceutico[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  cadastrar(): void {
    const id = this.form.controls['id'].value;
    const farmaceutico: FarmaceuticoModel = this.form.getRawValue();
    if (id) {
      this.put(id, farmaceutico).subscribe((domain: Farmaceutico) => {
        if (domain.id) {
          this.carregarTabela();
          this.form.reset();
        }
      });
    } else {
      this.post(farmaceutico).subscribe((domain: Farmaceutico) => {
        if (domain.id) {
          this.list.push(domain);
          this.form.reset();
        }
      });
    }
  }

  editar(farmaceutico: Farmaceutico): void {
    this.form.controls['id'].setValue(farmaceutico.id);
    this.form.controls['nome'].setValue(farmaceutico.nome);
    this.form.controls['cpf'].setValue(farmaceutico.documento);
    this.form.controls['aniver'].setValue(farmaceutico.aniver);
  }
  deletar(id: string): void {
    alert('Voce quer deletar isso ??');
    this.delete(id).subscribe((domain: Farmaceutico) => {
      this.carregarTabela();
    });
  }

  private delete(id: string): Observable<Farmaceutico> {
    const url = 'http://localhost:8080/farmaceutico/remover/' + id;
    return this.http.delete<Farmaceutico>(url);
  }
  private post(model: FarmaceuticoModel): Observable<Farmaceutico> {
    const url = 'http://localhost:8080/farmaceutico/cadastrar';
    return this.http.post<Farmaceutico>(url, model);
  }
  private put(id: string, model: FarmaceuticoModel): Observable<Farmaceutico> {
    const url = 'http://localhost:8080/farmaceutico/alterar/' + id;
    return this.http.put<Farmaceutico>(url, model);
  }

  private get(): Observable<Farmaceutico[]> {
    const url = 'http://localhost:8080/cliente/consultar';
    return this.http.get<Farmaceutico[]>(url);
  }
}
