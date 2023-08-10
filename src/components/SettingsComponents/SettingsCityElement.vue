<template>
  <div
    class="city-container"
    draggable="true"
    :class="{ highlight: isOver, shading: isDrag }"
    @dragstart="dragStartHandler"
    @dragend="dragEndHandler"
    @dragover="dragOverHandler"
    @dragleave="dragLeaveHandler"
    @drop="dropHandler"
  >
    <menu-icon class="icon" :width="'30px'" :height="'30px'" />
    <span class="city-title">{{ city }}</span>
    <delete-icon
      class="icon"
      :width="'25px'"
      :height="'25px'"
      @click="deleteCity"
    />
  </div>
</template>

<script lang="ts">
import DeleteIcon from '@/UI/Icons/DeleteIcon.vue';
import MenuIcon from '@/UI/Icons/MenuIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { DeleteIcon, MenuIcon },
  name: 'SettingsCityElement',
  props: {
    city: String,
  },
  data() {
    return {
      isOver: false,
      isDrag: false,
    };
  },
  methods: {
    dragStartHandler(event: DragEvent) {
      if (this.city) {
        this.isDrag = true;
        event.dataTransfer?.setData('text/plain', this.city);
      }
    },
    dragEndHandler() {
      this.isDrag = false;
      this.isOver = false;
    },
    dragOverHandler() {
      this.isOver = true;
    },
    dragLeaveHandler() {
      this.isOver = false;
    },
    dropHandler() {
      this.isOver = false;
    },
    deleteCity() {
      this.$emit('delete-city', this.city);
    },
  },
});
</script>

<style scoped lang="scss">
.city-container {
  @include flex-center;
  gap: $main-gap;
  margin: 10px 0;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 10px;
}
.city-title {
  font-size: 20px;
  flex: 1;
}
.icon {
  cursor: pointer;
}
.highlight {
  border: 2px solid rgb(114, 114, 114);
}
.shading {
  opacity: 0.5;
}
</style>
