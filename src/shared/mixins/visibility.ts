import { ref } from 'vue'

export const visibilityMixin = {
  setup() {
    const isVisible = ref(true)

    function toggleVisibility() {
      isVisible.value = !isVisible.value
    }

    return { isVisible, toggleVisibility }
  },
}
