import logout from "./actions/auth/logout";

export interface HttpContract {
    get: (route: string) => any;
    post: (route: string, body: any) => any;
    patch: (route: string, body: any) => any;
    del: (route: string) => any;
    setJwtToken: () => void;
}

function Http(): HttpContract {
    const baseUrl = 'http://localhost';
    const port = 3000;
    const apiVersion = 'v1';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
        'Accept': 'application/json',
    }

    async function get(route: string): Promise<any> {
        try {
            const api = `${baseUrl}:${port}/${apiVersion}/${route}`;
            const response = await fetch(api, {
                method: 'get',
                headers: new Headers(headers)
            });
            if (response.status !== 200) throw response;
            return await response.json();
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                logout();
                return;
            }
            return await error.json();
        }
    }

    async function post(route: string, body: any): Promise<any> {
        try {
            const api = `${baseUrl}:${port}/${apiVersion}/${route}`;
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
                logout();
                return;
            }
            return await error.json();
        }
    }

    async function patch(route: string, body: any): Promise<any> {
        try {
            const api = `${baseUrl}:${port}/${apiVersion}/${route}`;
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
                logout();
                return;
            }
            return await error.json();
        }
    }

    async function del(route: string): Promise<any> {
        try {
            const api = `${baseUrl}:${port}/${apiVersion}/${route}`;
            const response = await fetch(api, {
                method: 'delete',
                headers: new Headers(headers)
            });
            if (response.status !== 201) throw await response;
            return await response.json();
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                logout();
                return;
            }
            return await error.json();
        }
    }

    function setJwtToken(): void {
        const token = localStorage.getItem('cactus-token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }


    return {
        get,
        post,
        patch,
        del,
        setJwtToken,
    }
}

export default Http();