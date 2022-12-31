import logout from "./actions/auth/logout";
import authStore from "./store/authStore";
import b64toBlob from 'b64-to-blob';

export interface HttpContract {
    get: (route: string) => any;
    post: (route: string, body: any) => any;
    patch: (route: string, body: any) => any;
    del: (route: string) => any;
    uploadFiles: (route: string, formData: FormData) => any;
    setJwtToken: () => void;
}

function Http(): HttpContract {
    const aws = 'http://ec2-18-224-189-140.us-east-2.compute.amazonaws.com';
    const baseUrl = 'http://localhost'; //
    const port = 3000;
    const apiVersion = 'v1';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
        'Accept': 'application/json',
    }

    async function get(route: string): Promise<any> {
        try {
            const api = `${aws}:${port}/${apiVersion}/${route}`;
            const response = await fetch(api, {
                method: 'get',
                headers: new Headers(headers)
            });
            if (response.status !== 200) throw response;
            return await response.json();
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                return logout();
            }
            return await error.json();
        }
    }

    async function post(route: string, body: any): Promise<any> {
        try {
            const api = `${aws}:${port}/${apiVersion}/${route}`;
            // stringify body
            body = JSON.stringify(body);
            const response = await fetch(api, {
                method: 'post',
                body,
                headers: new Headers(headers)
            });
            if (response.status !== 201) throw await response;
            return await response.json()
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                return;
            }
            return await error.json();
        }
    }

    async function patch(route: string, body: any): Promise<any> {
        try {
            const api = `${aws}:${port}/${apiVersion}/${route}`;
            // stringify body
            body = JSON.stringify(body);
            const response = await fetch(api, {
                method: 'put',
                body,
                headers: new Headers(headers)
            });
            if (response.status !== 201) throw await response;
            return await response.json();
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                return;
            }
            return await error.json();
        }
    }

    async function del(route: string): Promise<any> {
        try {
            const api = `${aws}:${port}/${apiVersion}/${route}`;
            const response = await fetch(api, {
                method: 'delete',
                headers: new Headers(headers)
            });
            if (response.status !== 201) throw await response;
            return await response.json();
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                return;
            }
            return await error.json();
        }
    }

    function setJwtToken(): void {
        const token = localStorage.getItem('cactus-token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    function uploadFiles(route: string, formData: FormData): Promise<any> {
       
        const api = `${aws}:${port}/${apiVersion}/${route}`;
        return fetch(api, {
            method: 'post',
            body: formData,
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('cactus-token')}`,
                contentType: 'multipart/form-data'
            })
        })

    }


    return {
        get,
        post,
        patch,
        del,
        setJwtToken,
        uploadFiles,
    }
}

export default Http();


function DataURIToBlob(dataURI: string) {
    const data = dataURI.split(',')[1];
    const binaryData = atob(data);
  
    return new Blob([binaryData], { type: 'image/png' })
  }
  