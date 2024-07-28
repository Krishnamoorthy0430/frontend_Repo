import axios from "axios";
import ManagerServiceRegistration from "./ManagerServiceRegistration";

const API_URL = "http://localhost:8080/auth";

class AuthService {
    login(username, password, role) {
        return axios
        .post(API_URL+'/login', {
            username,
            password
        })
        .then(response => {
            if (response.data.jwt) {
                if (ManagerServiceRegistration.getRole() == 'Manager') {
                    localStorage.setItem('managerToken', response.data.jwt);
                    console.log("Manager Token : \n"+response.data.jwt);
                } else if (role == 'Resident') {
                    sessionStorage.setItem('residentToken', response.data.jwt);
                }
            }
            console.log(username+" "+password+" "+role);
            console.log(response.data.jwt);
            return response.data;
        }).catch(error => {
            console.error('Login error:', error);
        });

    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getToken() {
        return localStorage.getItem('token');
    }

    // getUserRoles() {
    //     const user = this.getCurrentUser();
    //     if (user && user.token) {
    //         const decodedToken = jwt_decode(user.token);
    //         return decodedToken.roles || [];
    //     }
    //     return [];
    // }

}

export default new AuthService();