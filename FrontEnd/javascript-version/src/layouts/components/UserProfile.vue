<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data(){
    return {
      events: [
        
      ],
      invitations : [

      ]
      ,
      user : undefined,
    }
  },
  beforeMount() {
    this.getNotification()
  },
  methods: {
    handleInvitation(type ,id){
      const token = localStorage.getItem("token")
      const config = {
        headers : {
          Authorization: `Bearer ${token}`,
        }
      }
      axios.patch(`${this.APIURI}event/${type}/${id}`, "", config)
        .then(res => {
          Swal.fire({
            position : 'center',
            icon : "success",
            title : res.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          this.getNotification()
        })
        .catch(err => {
          Swal.fire({
            position : 'center',
            icon : "error",
            title : err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
    getNotification(){
      const token = localStorage.getItem("token")
      const config = {
        headers : {
          Authorization: `Bearer ${token}`,
        },
      }
      axios.get(`${this.APIURI}event/today`, config)
        .then(res => {
          this.events = res.data
        })
        .catch(err => {
          console.log(err.response.data)
          Swal.fire({
            position : 'center',
            icon : "error",
            title : err.message,
            showConfirmButton: false,
            timer: 1500,
          })
        })
      axios.get(`${this.APIURI}event/invitation`, config)
        .then(res => {
          this.invitations = res.data
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
      <div v-if="invitations.length != 0 || events.length != 0">
        <VList 
          style="width: 300px;" 
          lines="two" 
          class="pa-0"
        >
          <!-- 👉 User Avatar & Name -->
          <VListItem
            v-for="(invitation, index) in invitations"
            :key="index"
            :title="`Invitation for ${invitation.title}`"
          >
            <template #append>
              <VListItemIcon>
                <VBtn
                  variant="outlined"
                  icon
                  size="x-small"
                  @click="handleInvitation('accept', invitation._id)"
                >
                  <VIcon>mdi-check</VIcon>
                </VBtn>
              </VListItemIcon>
              <VListItemIcon>
                <VBtn
                  variant="outlined"
                  icon
                  size="x-small"
                  @click="handleInvitation('decline', invitation._id)"
                >
                  <VIcon>mdi-close</VIcon>
                </VBtn>
              </VListItemIcon>
            </template>
          </VListItem>
        
          <VListItem
            v-for="(event, index) in events"
            :key="index"
            :title="`Event ${event.title} is today`"
          > 
          </VListItem>
        </VList>
      </div>
      <div v-else>
        <VCard>
          <VCardTitle>Nothing here</VCardTitle>
        </VCard>
      </div>
    </VMenu>
  </div>
</template>