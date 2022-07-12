
export default async (cred) => {
    const {uid, ...response} = await fetch('/api/auth/registration', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'CSRF-Token': Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(cred)
    })
    .then(res => res.json())

    if(!uid) throw Error(response.message)

    return uid
}