import { PessoaFisica } from './pessoa-fisica';
export interface Cliente extends PessoaFisica {
  email: string;
}
