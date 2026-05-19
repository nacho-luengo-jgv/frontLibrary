export type Estado= "DISPONIBLE" | "PRESTADO" | "RESERVADO"

export interface Book{
  id: number
  title: string
  author: string
  editorial: string
  anio: number
  isbc: string
  price: number
  status: Estado
}

