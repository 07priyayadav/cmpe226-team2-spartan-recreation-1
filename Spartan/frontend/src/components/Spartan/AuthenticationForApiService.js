import axios from "axios";
import { API_URL } from "../../Constants";

export const AUTHENTICATED_USER_SESSION = "authenticatedUser";

class AuthenticationForApiService {
  authenticate(email_id,password,role) {
    // console.log("Authenticate call");
    const url = `${API_URL}/authenticate`
    return axios.post(url, {
      email_id,  
      password,
      role
    });
  }

  registerSuccessfulLogin(username, token) {
    sessionStorage.setItem(AUTHENTICATED_USER_SESSION, username);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER_SESSION);
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("ssn");
    sessionStorage.removeItem("role");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER_SESSION);
    let verified = sessionStorage.getItem("verified");
    if (user === null || verified === "no") return false;
    return true;
  }

  // isUserVerified() {
  //   let verified = sessionStorage.getItem("verified");
  //   if (verified === "no") return false;
  //   return true;
  // }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER_SESSION);
    if (user === null) return "";
    return user;
  }
}

export default new AuthenticationForApiService();
