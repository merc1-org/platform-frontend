// MVP sem backend: os acessos ficam no bundle do front e qualquer pessoa com o
// código consegue lê-los. Aceito para a fase de validação; substituir por auth
// real antes de escalar as vendas.
export interface UsuarioFixo {
  email: string;
  senha: string;
  nome: string;
}

export const USUARIOS: UsuarioFixo[] = [
  { email: 'demo@merc1.com', senha: 'merc1', nome: 'Ana Souza' },
];
