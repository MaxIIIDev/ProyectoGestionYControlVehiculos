import { jwtDecode } from "jwt-decode";
export interface UserPayload {
  role: string | number;
  email: string | null;
  sub: string | number | null;
}
export const saveToken = (token: string) =>
  localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => localStorage.removeItem("token");

export const getUserFromToken = (): {
  role: string | number;
  email: string | null;
  sub: string | number | null;
} | null => {
  {
    const token = getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return {
        role:
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || decoded.role,
        email:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ] || decoded.email,
        sub:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ] || decoded.sub,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
};
