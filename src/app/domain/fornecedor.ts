import { PessoaJuridica } from './pessoa-juridica';
export interface Fornecedor extends PessoaJuridica {
  produtos: string[];
}
