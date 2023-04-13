<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDeleteOutline } from '@mdi/js'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'my-component',
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiDeleteOutline,
      events: '',
      user: null,
    }
  },
  beforeMount() {
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    axios
      .get(`http://103.172.204.236:5000/api/user/`, config)
      .then(response => {
        this.user = response.data._id
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getEvents() {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      axios
        .get(`http://103.172.204.236:5000/api/event/`, config)
        .then(response => {
          let arr = response.data
          arr.sort((a,b) => {return new Date(a.timeHeld) - new Date(b.timeHeld)})
          this.events = arr
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteEvents(id){
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      axios.delete(`http://103.172.204.236:5000/api/event/${id}`, config)
        .then(res => {
          this.getEvents()
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        }).catch(err => {
          console.log(err)
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
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
    <p style="padding-left: 25px">Look your event schedule here</p>
  </div>

  <VCol>
    <VRow style="padding-left: 25px; padding-bottom: 20px; padding-top: 10px" v-for="(event,index) in events">
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
      <div v-if="event.creator == user">
        <svg-icon
          type="mdi"
          :path="path"
          style="cursor: pointer; right: 48px; position: absolute; margin-top: 1px; color: black"
          href=","
          @click="deleteEvents(event._id)"
        ></svg-icon>
      </div>
      
    </VRow>
  </VCol>
</template>
