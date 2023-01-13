import logout from "./actions/auth/logout";

function Http() {
    const production = 'http://ec2-18-224-189-140.us-east-2.compute.amazonaws.com';
    const local = 'http://localhost';
    const port = 3000;
    const apiVersion = 'v1';
    const api = `${local}:${port}/${apiVersion}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cactus-token')}`,
        'Accept': 'application/json',
    }

    async function get(route: string): Promise<any> {
        try {
            const apiPath = `${api}/${route}`;
            const response = await fetch(apiPath, {
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
            const apiPath = `${api}/${route}`;
            // stringify body
            body = JSON.stringify(body);
            const response = await fetch(apiPath, {
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
            const apiPath = `${api}/${route}`;
            // stringify body
            body = JSON.stringify(body);
            const response = await fetch(apiPath, {
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
            const apiPath = `${api}/${route}`;
            const response = await fetch(apiPath, {
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

    function uploadFiles(route: string, formData: FormData): Promise<any> {
       
        const apiPath = `${api}/${route}`;
        return fetch(apiPath, {
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
        uploadFiles,
    }
}

export default Http();


function DataURIToBlob(dataURI: string) {
    const data = dataURI.split(',')[1];
    const binaryData = atob(data);
  
    return new Blob([binaryData], { type: 'image/png' })
  }
  