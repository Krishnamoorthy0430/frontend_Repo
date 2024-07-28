import axios from "axios";
import AuthService from "./AuthService";

class FacilityService
{
    URL = "http://localhost:8080/v1/facility"

    constructor() {
        this.token = AuthService.getToken();
        if (!this.token) {
            console.error('No token found');
            // You can handle the absence of a token here as needed.
        } else {
            console.log('Token found : ', this.token); // Log the token for debugging
        }
    }

    fnCreateFacility(facility)
    {
        if (!this.token) {
            console.error('No token found');
            return Promise.reject('No token found');
        }
        
        return axios.post(this.URL, facility, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

    fnUpdateFacility(id, facility)
    {
        if (!this.token) {
            console.error('No token found');
            return Promise.reject('No token found');
        }
        
        return axios.put(this.URL+"/"+id, facility, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

    gnGetAllFacilities()
    {
        if (!this.token) {
            console.error('No token found');
            return Promise.reject('No token found');
        }
        
        return axios.get(this.URL+"/getall", {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

    fnGetFacilityById(id)
    {
        if (!this.token) {
            console.error('No token found');
            return Promise.reject('No token found');
        }
        
        return axios.get(this.URL+"/byid/"+id, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

    fnDeleteFacility(id)
    {
        if (!this.token) {
            console.error('No token found');
            return Promise.reject('No token found');
        }
        
        return axios.delete(this.URL+"/"+id, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }
}
export default new FacilityService();