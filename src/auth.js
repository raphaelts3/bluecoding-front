/* globals localStorage */
import axios from 'axios'

export default {
  login (email, password, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true) // eslint-disable-line
      this.onChange(true)
      return
    }
    requestLogin(email, password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true) // eslint-disable-line
        this.onChange(true)
      } else {
        if (cb) cb(false) // eslint-disable-line
        this.onChange(false)
      }
    })
  },

  register (name, email, password, passwordConfirmation, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true) // eslint-disable-line
      this.onChange(true)
      return
    }
    requestRegister(name, email, password, passwordConfirmation, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true) // eslint-disable-line
        this.onChange(true)
      } else {
        if (cb) cb(false) // eslint-disable-line
        this.onChange(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    requestLogout(localStorage.token)
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

const requestLogin = async (email, password, cb) => {
  axios.post(`${process.env.BACKEND_HOST}/auth/login`, {
    email, password
  }).then(function (response) {
    // eslint-disable-next-line
    cb({
      authenticated: true,
      token: response.data.token
    })
  }).catch(function () {
    // eslint-disable-next-line
    cb({
      authenticated: false
    })
  })
}

const requestRegister = async (name, email, password, passwordConfirmation, cb) => {
  axios.post(`${process.env.BACKEND_HOST}/auth/register`, {
    'name': name,
    'email': email,
    'password': password,
    'password_confirmation': passwordConfirmation
  }).then(function (response) {
    // eslint-disable-next-line
    cb({
      authenticated: true,
      token: response.data.token
    })
  }).catch(function () {
    // eslint-disable-next-line
    cb({
      authenticated: false
    })
  })
}

const requestLogout = async (token) => {
  axios.request({
    url: `${process.env.BACKEND_HOST}/auth/logout`,
    headers: {'Authorization': `Bearer ${token}`}
  }).then(function (response) {
    console.log('Logout')
  }).catch(function (error) {
    console.log(error)
  })
}
