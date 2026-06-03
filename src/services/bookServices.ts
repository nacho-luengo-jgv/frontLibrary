import axios from "axios";
import type { Book } from "../types/Books.ts";

export const url_api_usuario = "http://192.168.1.154:8080/user";
export const url_api_admin = "http://192.168.1.154:8080/admin";

export const credencialesAdmin = {
  username: "admin",
  password: "adminpass",
};
const credencialesUser = {
  username: "user",
  password: "userpass",
};

export const obtenerLibrosAdmin = () =>
  axios.get<Book[]>(`${url_api_admin}/books`, {
    auth: credencialesAdmin,
  });

export const crearLibro = (book: Book) =>
  axios.post(`${url_api_admin}/books`, book, {
    auth: credencialesAdmin,
  });

export const actualizarLibro = (id: number, book: Book) =>
  axios.put(`${url_api_admin}/books/${id}`, book, {
    auth: credencialesAdmin,
  });

export const eliminarLibro = (id: number) =>
  axios.delete(`${url_api_admin}/books/${id}`, {
    auth: credencialesAdmin,
  });

export const obtenerLibrosDisponibles = () =>
  axios.get<Book[]>(`${url_api_usuario}/libros/disponibles`, {
    auth: credencialesUser,
  });

export const obtenerPrestamosUsuarios = (idUsuario: number) =>
  axios.get<Book[]>(`${url_api_usuario}/${idUsuario}/prestamos`, {
    auth: credencialesUser,
  });

export const solicitarPrestamo = (idUsuario: number, idLibro: number) =>
  axios.post(
    `${url_api_usuario}/${idUsuario}/prestamos/${idLibro}`,
    {},
    {
      auth: credencialesUser,
    },
  );

export const devolverPrestamo = (idUsuario: number, idLibro: number) =>
  axios.post(
    `${url_api_usuario}/${idUsuario}/devoluciones/${idLibro}`,
    {},
    {
      auth: credencialesUser,
    },
  );
