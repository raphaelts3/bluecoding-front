<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div
      class="image"
      v-for="(image, imageIndex) in images"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{
        backgroundImage: 'url(' + image + ')',
        width: '300px',
        height: '200px'
      }"
    ></div>
  </div>
</template>

<script>
import auth from '../auth'
import VueGallery from 'vue-gallery'
import axios from 'axios'

export default {
  props: ['query'],
  data: function () {
    if (this.query !== '' && auth.loggedIn()) {
      axios
        .request({
          url: `${process.env.BACKEND_HOST}/gif/search/?offset=0&limit=25&query=${this.query}`,
          headers: {
            Authorization: `Bearer ${auth.getToken()}`
          }
        })
        .then((response) => {
          this.images = []
          response.data.data.forEach((tag) => {
            tag.gifs.forEach((gif) => {
              this.images.push(`${process.env.BACKEND_HOST}/${gif.path}`)
            })
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      axios
        .get(`${process.env.BACKEND_HOST}/gifs?offset=0&limit=25`)
        .then((response) => {
          this.images = []
          console.log(response.data.data)
          response.data.data.forEach((gif) => {
            this.images.push(`${process.env.BACKEND_HOST}/${gif.path}`)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    return {
      index: null,
      images: []
    }
  },
  components: {
    gallery: VueGallery
  }
}
</script>

<style scoped>
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
}
</style>
