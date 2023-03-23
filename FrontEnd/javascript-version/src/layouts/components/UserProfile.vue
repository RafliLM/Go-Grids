<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data(){
    return {
      events: [{
        title : "Test",
      }],
      user : undefined,
    }
  },
  beforeMount() {
    const token = localStorage.getItem("token")
    axios.get(`${this.APIURI}user/`, {
      headers : {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        this.user = res.data
      })
      .catch(err => {
        Swal.fire({
          position : 'center',
          icon : "error",
          title : err.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
    axios.get(`${this.APIURI}event`, {
      headers : {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        const events = res.data
        let today = new Date()
        today.setHours(0,0,0,0)
        events.forEach(event => {
          let timeHeld = new Date(event.timeHeld)
          if(timeHeld.getTime() > new Date().getTime()){
            if(event.creator != this.user._id){
              let findUser = event.participants.find(obj => {
                return obj.username == this.user.username && obj.status == "invited"
              })
              if(findUser != undefined){
                this.events.push(event)
              }
            }
          }
          else if (event.timeHeld.getTime() == new Date().getTime()){

          }
        })
      })
      .catch(err => {
        Swal.fire({
          position : 'center',
          icon : "error",
          title : err.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  },
  methods: {
    acceptInvite(id){

    },
    declineEvent(id){

    }
  },
}
</script>

<template>
  <div class="d-flex justify-space-around">
    <VMenu style="width: 1000px">
      <template #activator="{ props }">
        <VBtn
          icon
          variant="text"
          color="default"
          class="me-2"
          size="small"
          v-bind="props"
        >
          <VIcon
            icon="mdi-bell-outline"
            size="24"
          />
        </VBtn>
      </template>
      <VList style="width: 300px;">
        <!-- 👉 User Avatar & Name -->
        <VListItem
          v-for="(event, index) in events"
          :key="index"
        >
          <VListItemContent append-icon="mdi-check">
            <VListItemTitle v-text="event.title"></VListItemTitle>
          </VListItemContent>
          <VListItemIcon>
              <VBtn
                variant="outlined"
                icon
                small
              >
                <VIcon>mdi-check</VIcon>
              </VBtn>
            </VListItemIcon>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>