export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value // 将props中的value赋值给currentValue
      },
      set (val) {
        this.$emit('input', val) // 通过$emit触发父组件
      }
    }
  }
}
