import * as React from 'react';
import { View, StyleSheet, Text, Alert, Linking } from "react-native";


const API_URL = 'https://drofami-app.herokuapp.com/api/'

export async function login(setLoading, username, password, setLoginResponse) {
    setLoading(true);
    const resp = {};
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
            }).then((response) => response.json()) //el status conseguir
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
    first_name, last_name, address, setLoading, setResponse) {
    let response = {};
    //const rtnNew = rtn.replace(/-/g, '');
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
                        //  'rtn': " .",
                        'address': address,
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
    } catch (e) {
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
        response = await fetch(API_URL + 'auth/modify/', {
                method: 'PUT',
                body: JSON.stringify({
                    'username': username,
                    'first_name': first_name,
                    'last_name': last_name,
                    'phone_number': phoneNumber,
                    'address': address,
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
    } catch (e) {
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
            }).then((response) => response.json()) //el status conseguir
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

            }).then((response) => response.json()) //el status conseguir
            .then(data => {
                resp['data'] = data;
                setResponse(data)
            })
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false)
    }
}

export async function changeEmail(setLoading, email, token, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'auth/modify/email/', {
                method: 'PUT',
                body: JSON.stringify({
                    'email': email,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
            }).then((response) => response.json())
            .then(data => {
                resp['data'] = data;
                setResponse(data)
            })
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false)
    }
}

export async function changePassword(setLoading, password, newPassword, confirmPassword, token, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'auth/modify/password/', {
                method: 'PUT',
                body: JSON.stringify({
                    'password': password,
                    'newPassword': newPassword,
                    'confirmPassword': confirmPassword,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
            }).then((response) =>
                response.json())
            .then(data => {
                resp['data'] = data;
                setResponse(data)
            })
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false)
    }
}

export async function logout(setLoading, token, setResponse) {
    let response = {};
    setLoading(true);
    try {
        response = await fetch(API_URL + 'auth/logout/', {
                method: 'POST',
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
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false)
    }
}

//fetch to get estado 
export async function getEstado(setLoading, token, setResponse) {
    setLoading(true);
    let response = {};
    try {
        response = await fetch(API_URL + 'orden/peligro/', {
                method: 'GET',
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
    } catch (e) {
        console.log("Error en getEstado", e)
    } finally {
        setLoading(false)
    }
}