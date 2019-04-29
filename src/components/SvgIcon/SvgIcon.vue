<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    name: {
      type: String,
      required: true
    },
    iconClass: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    },
    svgClass () {
      if (this.iconClass) {
        return 'svg-icon ' + this.iconClass
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
