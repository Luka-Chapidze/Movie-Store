import http from './httpService'
import jwtDecode from 'jwt-decode'
import { apiUrl } from '../config.json'

const apiEndpoint = apiUrl + '/auth'

const tokenKey = 'token'

export function getJwt() {
	return localStorage.getItem(tokenKey)
}

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, {
		email,
		password,
	})
	localStorage.setItem(tokenKey, jwt)
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt)
}

export function logout() {
	localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
	try {
		const token = localStorage.getItem(tokenKey)
		return jwtDecode(token)
	} catch (error) {
		return null
	}
}

http.setJwt(getJwt())

export default {
	getJwt,
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
}
