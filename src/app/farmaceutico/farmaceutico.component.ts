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
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    dataNascimento: new FormControl(null, [Validators.required]),
    promocaododia: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Farmaceutico[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }
  cadastrar(): void {
    const farmaceutico: FarmaceuticoModel = this.form.getRawValue();
    this.post(farmaceutico).subscribe((domain: Farmaceutico) => {
      if (domain.id) {
        this.list.push(domain);
      }
    });
  }

  private post(model: FarmaceuticoModel): Observable<Farmaceutico> {
    const url = 'http://localhost:8080/farmaceutico/cadastrar';
    return this.http.post<Farmaceutico>(url, model);
  }

  private get(): Observable<Farmaceutico[]> {
    const url = 'http://localhost:8080/farmaceutico/consultar';
    return this.http.get<Farmaceutico[]>(url);
  }
}
