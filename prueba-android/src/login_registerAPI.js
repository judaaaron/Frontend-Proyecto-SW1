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
        }).then((response) => response.json())//el status conseguir
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

export async function signUp(username, email, phoneNumber, password, password2,
    first_name, last_name, address, rtn, setLoading, setResponse) {
    let response = {}
    try {
        response = await fetch(API_URL + 'auth/register', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
                'password2': password2,
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'phone_number': phoneNumber,
                'cliente': {
                    'rtn': rtn,
                    'address': address
                }
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
        }).then((response) => 
            response.json())
        .then(data => {
            console.log(data)
            data.status = statusCode
            setResponse(data)
        })
    } catch (e){
        console.log(e)
    } finally {
        setLoading(false)
    }
}