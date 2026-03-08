export interface UsuarioAdmin {
    id: number;
    nome: string;
    email: string;
    nivelAcesso: "total" | "operacional" | "financeiro";
}