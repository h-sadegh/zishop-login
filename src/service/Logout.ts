import cookie from "js-cookie";
import { Axios } from "./Axios";
import { getStatePersist } from "../store/Store";

export async function Logout() {
  const setUser = getStatePersist("setUser");
  const setRole = getStatePersist("setRole");
  const cookies = cookie.get("auth");
  if (cookies) {
    await Axios({
      method: "DELETE",
      url: `user/Logout`,
    });
  }
  cookie.remove("auth");
  // cookie.remove('auth-re')
  setUser({});
  setRole(undefined);
  // Router.push(`/login/?backUrl=${Router.asPath}`).then();
  // Router.push("/").then(() => Router.push(`/profile`));
}

export function Login401() {
  const setUser = getStatePersist("setUser");
  const setRole = getStatePersist("setRole");
  cookie.remove("auth");
  setUser({});
  setRole(undefined);
  // Router.push(`/login?backUrl=${path || ""}`).then();
}
