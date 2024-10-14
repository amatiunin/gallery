<template>
  <div class="container mt-4 w-50">
    <div class="text-center mt-4">Welcome to gallery</div>
    <div class="gallery d-flex justify-content-center mt-4">
      <div class="thumbnail" v-for="(image, index) in images" :key="index">
        <img
            :src="image.src"
            :alt="'Thumbnail ' + index"
            @click="openLightbox(index)"
            class="thumbnail-image"
        />
      </div>

      <vue-easy-lightbox
          :visible="visible"
          :imgs="images.map(image => image.src)"
          :index="currentIndex"
          @hide="handleHide"
      />
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import './assets/styles/gallery.css'

export default {
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      visible: false,
      currentIndex: 0,
      images: [
        {
          src: 'https://unsplash.it/500',
          caption: 'Image 1',
        },
        {
          src: 'https://unsplash.it/501',
        },
        {
          src: 'https://unsplash.it/502',
        },
        {
          src: 'https://unsplash.it/503',
        },
        {
          src: 'https://unsplash.it/504',
        },
        {
          src: 'https://unsplash.it/505',
        },
      ],
    }
  },
  methods: {
    openLightbox(index) {
      this.currentIndex = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
  },
}
</script>
