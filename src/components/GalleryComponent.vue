<template>
  <div class="container mt-4 col-lg-9">
    <div class="text-center mt-4">Welcome to gallery</div>
    <div class="gallery d-flex justify-content-center mt-4">
      <ThumbnailComponent
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :index="index"
          :onClick="openLightbox"
      />

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
import ThumbnailComponent from './ThumbnailComponent.vue'
import AWS from 'aws-sdk'

export default {
  components: {
    VueEasyLightbox,
    ThumbnailComponent,
  },
  data() {
    return {
      visible: false,
      currentIndex: 0,
      images: [
        {
          src: 'https://unsplash.it/500',
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
  watch: {
    '$route.params.imageIndex': {
      handler(newIndex) {
        if (newIndex !== undefined) {
          const index = Number(newIndex)
          if (index >= 0 && index < this.images.length) {
            this.currentIndex = index
            this.visible = true
          }
        } else {
          this.visible = false
        }
      },
      immediate: true,
    },
  },
  methods: {
    loadImagesFromS3() {
      const s3 = new AWS.S3({
        accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.VUE_APP_AWS_REGION,
      });

      const params = {
        Bucket: 'laurent-is-event-imgs',
      };

      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.log('Error fetching images from S3:', err);
        } else {
          this.images = data.Contents.map(item => ({
            src: `https://laurent-is-event-imgs.s3.amazonaws.com/${item.Key}`,
          }));
        }
      });
    },
    openLightbox(index) {
      this.currentIndex = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
}
</script>
