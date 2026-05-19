export type Rol= "alumno" | "profesor" | "admin"

export interface User{
  id: number
  name: string
  rol: Rol
}
