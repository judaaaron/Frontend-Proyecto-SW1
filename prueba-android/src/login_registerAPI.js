const API_URL = 'https://drofami-app.herokuapp.com/api/'

export async function login(setLoading, username, password, setLoginResponse) {
    const resp = {};
    console.log(username)
    console.log(password)
    let response = {}
    try {
        response = await fetch(API_URL + 'token-auth/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        }).then((response) => response.json())
        .then(data => {
            resp['status'] = response.status;
            resp['data'] = data;
            setLoginResponse(data)
        })
    } catch {
        
    } finally {
        setLoading(false)
    }
}

