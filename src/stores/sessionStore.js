import { defineStore } from 'pinia'
import { login, verifyToken } from '../services/authService.js' // Ajusta la ruta según tu estructura

export const useSessionStore = defineStore('session', {
  state: () => ({
    isLoggedIn: false,
    token: null,
    username: null,
  }),

  actions: {
    /**
     * Ejecuta el login utilizando el authService.
     * Se espera que authService.login reciba las credenciales del usuario
     * y retorne un objeto con { token, user }.
     */
    async login(userCredentials) {
      try {
        const result = await login(userCredentials)
        this.token = result.token
        this.username = result.username
        this.isLoggedIn = true

        // Guardamos la sesión en localStorage para persistencia
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.username))

        return result
      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
    },

    /**
     * Carga la sesión guardada en localStorage.
     * Si se encuentra un token y datos del usuario, se actualiza el estado del store.
     */
    async loadSession() {
      try {
        const token = localStorage.getItem('token')
        if (!verifyToken) {
          this.logout()
          throw new Error('Token is not valid')
        }
        const user = localStorage.getItem('user')
        if (token && user) {
          this.token = token
          this.username = JSON.parse(user)
          this.isLoggedIn = true
        }
      } catch (error) {
        console.error('Error loading session:', error)
      }
    },

    logout() {
      this.token = null
      this.username = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
