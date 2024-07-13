<template>
  <Transition>
    <div class="modal-container" v-if="show">
      <div class="modal-content">
        <h3 class="modal-title">Are you sure you want to delete this {{ title }}?</h3>
        <slot> </slot>
        <div class="modal-buttons">
          <button class="cancel-button" @click="$emit('close')">Cancel</button>
          <button class="delete-button" @click="$emit('delete', order.id)">
            <img class="remove-icon" :src="removeIcon" alt="remove" />
            Delete
          </button>
        </div>
        <div @click="$emit('close')" class="close">X</div>
      </div>
    </div>
  </Transition>
</template>

<script>
import monitorIcon from '../icons/monitor.png'
import removeIcon from '../icons/removeIcon_btn.svg'

export default {
  name: 'ModalPage',
  data() {
    return {
      monitorIcon,
      removeIcon
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    order: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal-container {
  display: flex;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: auto;
  padding-top: 30px;
  border: 1px solid #888;
  width: 70%;
  max-width: 700px;
  position: relative;
  font-size: 20px;
}

.modal-title {
  margin-bottom: 30px;
  padding: 0 30px;
}

.modal-buttons {
  margin-top: 20px;
  background-color: #39a946;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
}

.cancel-button {
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  align-self: center;
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 20px;
  transition: 0.3s all ease 0s;
}

.delete-button {
  background-color: #fff;
  display: flex;
  align-items: center;
  column-gap: 10px;
  border-radius: 20px;
  border: none;
  color: #ff0000;
  margin: 5px;
  padding: 10px 20px;
  font-size: 20px;
  box-shadow: 0 0 30px 1px grey;
  position: relative;
  z-index: 10;
  cursor: pointer;
  transition: 0.3s all ease 0s;
  margin-right: 30px;
}

.cancel-button:hover,
.delete-button:hover {
  transform: scale(1.1);
}
</style>
