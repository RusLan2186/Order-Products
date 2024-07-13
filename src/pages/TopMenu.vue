<template>
  <div class="top-menu">
    <div class="container">
      <div class="logo">d<span>ZEN</span>code</div>
      <div class="date-wrapper">
        <div class="date">
          <span>{{ currentDate }}</span>
          <div class="time">
            <img :src="timeIcon" alt="time">
            <span class="clock">{{ currentTime }}</span>
          </div>
         
        </div>

        <div class="session-count">
          Active Sessions: <span>{{ activeSessions }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'
import timeIcon from '@/icons/time.svg'

export default {
  name: 'TopMenu',
  data() {
    return {
      currentDate: '',
      currentTime: '',
      activeSessions: 0,
      socket: null,
      timeIcon
    }
  },
  mounted() {
    this.updateDateTime()

    this.socket = io('http://localhost:5173')

    this.socket.on('activeSessions', (count) => {
      this.activeSessions = count
    })

    setInterval(() => {
      this.updateDateTime()
    }, 1000)
  },
  methods: {
    updateDateTime() {
      this.currentDate = moment().format('dddd, D MMMM YYYY')
      this.currentTime = moment().format('HH:mm:ss')
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}
</script>

<style scoped>
.top-menu {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 100;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 200px;
  margin-right: 200px;
}

.logo {
  font-weight: 700;
  font-size: 30px;
}

.logo span {
  color: #55a45e;
}

.date-wrapper {
  display: flex;
  column-gap: 20px;
  align-items: flex-start;
}
.date {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  font-size: 16px;
  font-size: 20px;
}

.date img{
width: 15px;
}

.time{
  display: flex;
  column-gap: 5px;
  align-items: center;
}

.session-count {
  font-size: 20px;
}

.session-count span {
  color: #55a45e;
  font-weight: 700;
}
</style>
