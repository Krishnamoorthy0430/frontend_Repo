import axios from "axios";

const API_URL = "http://localhost:8080/auth";
const ROLE_API_URL = "http://localhost:8080/v1/manager/role";

class AuthService {
    login(username, password) {
        return axios
            .post(`${API_URL}/login`, { username, password })
            .then(response => {
                if (response.data.jwt) {
                    return axios.get(`${ROLE_API_URL}/${username}`)
                        .then(roleResponse => {
                            const role = roleResponse.data;

                            // Clear all role-related tokens
                            localStorage.removeItem('managerToken');
                            localStorage.removeItem('managerRole');
                            sessionStorage.removeItem('residentToken');
                            sessionStorage.removeItem('residentRole');

                            // Store new token based on role
                            if (role === 'Manager') {
                                localStorage.setItem('managerToken', response.data.jwt);
                                localStorage.setItem('managerRole', role);
                                console.log("Role is: " + role);
                                console.log("Manager Token is: \n" + response.data.jwt);
                            } else if (role === 'Resident') {
                                sessionStorage.setItem('residentToken', response.data.jwt);
                                sessionStorage.setItem('residentRole', role);
                                console.log("Role is: " + role);
                                console.log("Resident Token is: \n" + response.data.jwt);
                            } else {
                                console.error('Role not found for the given username.');
                            }
                            return response.data;
                        });
                }
                return response.data;
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    }

    logout() {
        // Clear all tokens on logout
        localStorage.removeItem('managerToken');
        localStorage.removeItem('managerRole');
        sessionStorage.removeItem('residentToken');
        sessionStorage.removeItem('residentRole');
    }

    getCurrentUser() {
        const managerToken = localStorage.getItem('managerToken');
        const residentToken = sessionStorage.getItem('residentToken');

        if (managerToken) {
            return { jwt: managerToken, role: 'Manager' };
        } else if (residentToken) {
            return { jwt: residentToken, role: 'Resident' };
        } else {
            return null;
        }
    }

    getToken() {
        return localStorage.getItem('managerToken') || sessionStorage.getItem('residentToken');
    }

    getRole() {
        return localStorage.getItem('managerRole') || sessionStorage.getItem('residentRole');
    }
}

export default new AuthService();


// import axios from "axios";

// const API_URL = "http://localhost:8080/auth";
// const ROLE_API_URL = "http://localhost:8080/v1/manager/role"

// class AuthService {
//     login(username, password) {
//         return axios
//         .post(API_URL+'/login', {
//             username,
//             password
//         })
//         .then(response => {
//             if (response.data.jwt) {
//                 return axios.get(ROLE_API_URL+"/"+username)
//                 .then(roleResponse => {
//                     const role = roleResponse.data;

//                     if(role=='Manager') {
//                         localStorage.setItem('managerToken', response.data.jwt);
//                         localStorage.setItem('managerRole', roleResponse.data)
//                         console.log("role is : "+role);
//                         console.log("Manager Token is : \n" + response.data.jwt);
//                     } else if (role == 'Resident') {
//                         sessionStorage.setItem('residentToken', response.data.jwt);
//                         sessionStorage.setItem('residentRole', roleResponse.data);
//                         console.log("role is : "+role);
//                         console.log("Resident Token is : \n" + response.data.jwt);
//                     } else {
//                         console.error('Role not found for the given username.');
//                     }
//                     return { ...response.data, role };
//                 });
//             }
//             return response.data;
//         }).catch(error => {
//             console.error('Login error:', error);
//         });

//     }

//     logout() {
//         localStorage.removeItem('managerToken');
//         localStorage.removeItem('residentToken');
//     }

//     getCurrentUser() {
//         const managerToken = localStorage.getItem('managerToken');
//         const residentToken = sessionStorage.getItem('residentToken');

//         return managerToken ? { jwt: managerToken, role: 'Manager' } : residentToken ? { jwt: residentToken, role: 'Resident' } : null;
//     }

//     getToken() {
//         return localStorage.getItem('managerToken') || sessionStorage.getItem('residentToken');
//     }

//     getRole() {
//         const managerRole = localStorage.getItem('managerRole');
//         const residentRole = sessionStorage.getItem('residentRole');
//         return localStorage.getItem('managerRole') || sessionStorage.getItem('residentRole');
//     }
// }

// export default new AuthService();
