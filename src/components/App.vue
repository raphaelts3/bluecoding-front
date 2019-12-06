<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" class=" shadow-sm">
      <div class="container">
      <b-navbar-brand href="#">Gif Store</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="loggedIn">
            <b-nav-form @submit.prevent="search">
              <b-form-input v-model="query" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <template v-if="!loggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Log in</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </template>
          <template v-else>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em> User </em>
              </template>
              <b-dropdown-item href="/logout">Log out</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
      </div>
    </b-navbar>
    <main class="py-4">
      <template v-if="$route.matched.length">
        <router-view></router-view>
      </template>
      <template v-else>
        <Gallery :query=query />
      </template>
    </main>
  </div>
</template>

<script>
import auth from '../auth'
import Gallery from './Gallery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  components: {
    Gallery
  },
  data () {
    let query = ''
    if (auth.loggedIn && this.$route.query.query !== undefined) {
      query = this.$route.query.query.trim()
    }
    return {
      loggedIn: auth.loggedIn(),
      query: query
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  },
  methods: {
    search () {
      this.$router.replace(`/?query=${this.query}`)
    }
  }
}
</script>

<link href='https://fonts.googleapis.com/css?family=Nunito:200,600' rel='stylesheet'>

<style>
  html, body {
      background-color: #fff;
      color: #636b6f;
      font-family: 'Nunito', sans-serif;
      font-weight: 200;
      height: 100vh;
      margin: 0;
  }

  .full-height {
      height: 100vh;
  }

  .flex-center {
      align-items: center;
      display: flex;
      justify-content: center;
  }

  .position-ref {
      position: relative;
  }

  .top-right {
      position: absolute;
      right: 10px;
      top: 18px;
  }

  .content {
      text-align: center;
  }

  .title {
      font-size: 84px;
  }

  .links > a {
      color: #636b6f;
      padding: 0 25px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: .1rem;
      text-decoration: none;
      text-transform: uppercase;
  }

  .m-b-md {
      margin-bottom: 30px;
  }
</style>
