import axios from "axios";

class ManagerServiceRegistration
{
    URL="http://localhost:8080/v1/manager";

    createManager(manager)
    {
        return axios.post(this.URL+"/register",manager);
    }

    // Update Manager is not working
    // It is throwing this error
    // Access to XMLHttpRequest at 'http://localhost:8080/v1/manager/1' from origin 'http://localhost:3000' 
    // has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
    // No 'Access-Control-Allow-Origin' header is present on the requested resource.
    updateManager(id)
    {
        return axios.put(this.URL+"/"+id); 
        // {
        //     headers: {
        //         'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrcmlzaG5hIiwiZXhwIjoxNzIyMDY1NTQwLCJpYXQiOjE3MjIwMjk1NDB9.3uxahEaL_O_QAi6Mpa4doXYjM961lPaUhvXIIsmL7Ao'
        //     }
        // });
    }

    getManager()
    {
        return axios.get(this.URL);
    }
}
export default new ManagerServiceRegistration();