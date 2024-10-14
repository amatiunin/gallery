<template>
  <div class="thumbnail">
    <img
        :src="src"
        :alt="`Thumbnail ${index}`"
        @click="handleClick"
        class="thumbnail-image"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.onClick(this.index);
    },
  },
}
</script>
