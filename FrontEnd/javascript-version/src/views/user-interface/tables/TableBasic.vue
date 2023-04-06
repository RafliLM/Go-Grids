<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDeleteOutline } from '@mdi/js'
import axios from 'axios'

export default {
  name: 'my-component',
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiDeleteOutline,
      events: ''
    };
  },
 methods: {
    getEvents() {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      axios
        .get(`//localhost:5000/api/event/`, config)
        .then(response => {
          this.events = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created() {
    this.getEvents()
  },
}
</script>

<template>
  <div style="padding-top: 30px">
    <h4
      style="padding-left: 25px"
      class="text-h4 font-weight-bold"
    >
      Timeline⌛
    </h4>
    <p style="padding-left: 25px">Look your upcoming event here</p>
  </div>

  <VCol>
    <VRow style="padding-left: 25px; padding-bottom: 20px; padding-top: 10px" v-for="event in events">
      <p
        style="
          background-color: #14162e;
          color: white;
          width: 130px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
      {{ event.timeHeld.substr(0, 10) }}
      </p>
      <p
        style="
          padding-left: 20px;
          color: black;
          height: 30px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
      {{ event.title }}
      </p>
      <svg-icon
        type="mdi"
        :path="path"
        style="cursor: pointer; right: 48px; position: absolute; margin-top: 1px; color: black"
        href=","
      ></svg-icon>
    </VRow>
  </VCol>
</template>
