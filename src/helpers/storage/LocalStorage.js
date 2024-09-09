import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const KEY_TOKEN = 'token'

const LocalStorage =  {
    // TOKEN
    setToken(token) {
        cookies.remove(KEY_TOKEN)
        cookies.set(KEY_TOKEN, token, {
            maxAge: 60 * 60 * 5,
            sameSite: 'lax', 
            secure: true
        })
    },

    getToken() {
        return cookies.get(KEY_TOKEN)
    }
}

export default LocalStorage
