import { defineStore } from 'pinia'

interface AuthState {
  username: string | null
  password: string | null
  role: 'admin' | 'user' | null
  userId: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const saved = localStorage.getItem('auth')

    if (saved) {
      return JSON.parse(saved)
    }

    return {
      username: null,
      password: null,
      role: null,
      userId: null
    }
  },

  getters: {
    isAuthenticated: (state) =>
      !!state.username && !!state.password
  },

  actions: {
    login(username: string, password: string) {
      if (
        (username === 'admin' && password === 'adminpass') ||
        (username === 'user' && password === 'userpass')
      ) {
        this.username = username
        this.password = password
        this.role = username === 'admin' ? 'admin' : 'user'

        if (this.role === 'user') {
          this.userId = Math.floor(Math.random() * 4) + 1
        } else {
          this.userId = 1
        }

        localStorage.setItem(
          'auth',
          JSON.stringify({
            username: this.username,
            password: this.password,
            role: this.role,
            userId: this.userId
          })
        )
      } else {
        throw new Error('Nombre o contraseña incorrecta')
      }
    },

    logout() {
      this.username = null
      this.password = null
      this.role = null
      this.userId = null
      localStorage.removeItem('auth')
    }
  }
})
