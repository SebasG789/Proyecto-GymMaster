export interface Perfil {
  id: number;
  edad: number;
  peso: number;
  altura: number;
  objetivo: string;
  usuarioId: number;
  nombreUsuario: string;
}

export interface PerfilRequest {
  edad: number;
  peso: number;
  altura: number;
  objetivo: string;
  usuarioId: number;
}