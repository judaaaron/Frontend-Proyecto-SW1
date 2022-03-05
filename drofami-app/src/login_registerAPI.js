const API_URL = 'https://drofami-app.herokuapp.com/api/'

export async function login(setLoading, username, password, setLoginResponse) {
    setLoading(true);
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
    let response = {};
    const rtnNew = rtn.replace(/-/g, '');
    setLoading(true);
    try {
        response = await fetch(API_URL + 'auth/register/', {
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
                    'rtn': rtnNew,
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
            setResponse(data)
        })
    } catch (e){
        console.log(e)
    } finally {
        setLoading(false)
    }
}

export async function modification(username, phoneNumber,
    first_name, last_name, address, setLoading, setResponse, token) {
    let response = {};
    setLoading(true);
    try {
        response = await fetch(API_URL + 'auth/register/', {
            method: 'PUT',
            body: JSON.stringify({
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'phone_number': phoneNumber,
                'cliente': {
                    'address': address
                }
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
        }).then((response) => 
            response.json())
        .then(data => {
            setResponse(data)
        })
    } catch (e){
        console.log(e)
    } finally {
        setLoading(false)
    }
}

export async function checkToken(setLoading, token, setLoginResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'auth/checklogin/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
        }).then((response) => response.json())//el status conseguir
        .then(data => {
            resp['data'] = data;
            setLoginResponse(data)
        })
    } catch {
        
    } finally {
       setLoading(false)
    }
}   

export async function getUserData(setLoading, token, setResponse) {
    setLoading(true);
    console.log('holaaa')
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'auth/modify/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
        }).then((response) => response.json())//el status conseguir
        .then(data => {
            resp['data'] = data;
            console.log('holaaa')
            setResponse(data)
        })
    } catch (e){
        console.log(e)
    } finally {
       setLoading(false)
    }
}   