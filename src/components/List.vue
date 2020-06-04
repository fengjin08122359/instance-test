<script>
import init from '@/sdk'
export default {
  data() {
    return {
      instance: init()
    }
  },
  render(createElement, context) {
    let list =  this.instance.getRenderList({
      createElement, vueRoot:this , context
    })
    return createElement('div', {}, list)
  },
  mounted() {
    window.instance = this.instance
  },
}
</script>