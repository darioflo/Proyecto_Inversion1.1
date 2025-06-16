export interface Usuario {
    id: string,
    idCliente : Pick<Usuario,"idCliente">
    nombreUsuario: string,
    clave: string,
    rol: string
}