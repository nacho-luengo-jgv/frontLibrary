import axios from "axios";
import { url_api_admin, credencialesAdmin } from "@/services/bookServices.ts";
import type { User } from "@/types/Users.ts";

export const obtenerUsuarios = () =>
  axios.get<User[]>(`${url_api_admin}/users`, {
    auth: credencialesAdmin,
  });
export const crearUsuario = (user: User) =>
  axios.post(`${url_api_admin}/users`, user, {
    auth: credencialesAdmin,
  });
