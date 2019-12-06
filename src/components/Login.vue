<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">Login</div>

                  <div class="card-body">
                      <form @submit.prevent="login">
                          <span v-if="$route.query.redirect" class="invalid-feedback" role="alert">
                              <strong>You need to login first.</strong>
                          </span>
                          <div class="form-group row">
                              <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                              <div class="col-md-6">
                                  <input v-model="email" class="form-control " placeholder="email">
                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                              <div class="col-md-6">
                                  <input v-model="password" class="form-control " placeholder="password" type="password">
                              </div>
                          </div>

                          <div class="form-group row mb-0">
                              <div class="col-md-8 offset-md-4">
                                  <button type="submit" class="btn btn-primary">
                                      Login
                                  </button>
                              </div>
                          </div>
                          <p v-if="error" class="error">Bad login information</p>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.password, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
