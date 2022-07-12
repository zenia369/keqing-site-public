
export default async (url, body, method = 'PUT') => {
    try {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        const response = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'CSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({
                ...body,
                uid: params.uid
            })
        })

        if(!response.ok) throw Error((await response.json()).message)
    
        return await response.json()
    } catch (error) {
        throw Error(error.message)
    }

}