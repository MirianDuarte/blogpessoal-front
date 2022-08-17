interface UserLogin{
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    token?: string | null;
    foto: string;
}

export default UserLogin;