import * as SecureStore from 'expo-secure-store';
export default async function getCredentials() {
    try {
        const session = await SecureStore.getItemAsync("user_session");
        console.log(session);
    } catch (error) {
        alert("Hubo un error en la lectura de las credenciales.");
        console.log(error);
        return (-1);
    } finally {
        return JSON.parse(session)['token']
    }
}