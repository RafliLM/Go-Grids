<script lang='ts'>
import { defineComponent } from 'vue'
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// Awal dari perubahan

// Untuk menampilkan pop-up, kita dapat menggunakan Sweetalert2
// Cara install di terminal : npm install -S vue-sweetalert2
import Swal from 'sweetalert2'
import axios from 'axios'

// Akhir dari perubahan
const Demo = defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        displayEventTime: false,
        events: [{

        }]
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
      usernames : [],
      title : "",
      participants : undefined,
      dialog : false,
      selectedDate : new Date(),
      edit : false,
      events : [],
      id : undefined,
      user : undefined,
      creator: undefined,
      timeHeld : undefined
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      let cmpDate = selectInfo.start
      let calendarApi = selectInfo.view.calendar
      if(cmpDate.getTime() > new Date().getTime()){
        this.edit = false
        cmpDate.setDate(cmpDate.getDate() + 1)
        if(cmpDate.getTime() != selectInfo.end.getTime()){
          calendarApi.unselect()
        }
        else{
          cmpDate.setDate(cmpDate.getDate() - 1)
          this.selectedDate = selectInfo.start
          this.dialog = true
        }
      }
      else
        calendarApi.unselect()
    },
    handleEventClick(clickInfo: EventClickArg) { // Ketika mengklik suatu event
      let event = this.events.find(e => {
        return e._id == clickInfo.event.id
      })
      this.title = event.title
      this.participants = []
      event.participants.forEach(participant => {
        this.participants.push(participant.username)
      })
      this.id = event._id
      this.creator = event.creator
      this.edit = true
      this.dialog = true
      this.timeHeld = new Date(event.timeHeld)
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    },
    getEvents(){
      const token = localStorage.getItem("token")
      axios.get(`${this.APIURI}event/`, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        let events = []
        this.events = res.data
        this.events.forEach((event) => {
          events.push({
            id : event._id,
            creator : event.creator,
            title : event.title,
            start : event.timeHeld
          })
        })
        this.calendarOptions.events = events
      })
      .catch(err => {
        if(err.response.status == 403)
          console.log("Log out")
        else{
          Swal.fire({
            position : 'center',
            icon : "error",
            title : "Something went wrong, try again later",
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    },
    async saveEvent(){
      const { valid } = await this.$refs.form.validate()
      if(valid){
        const token = localStorage.getItem("token")
        if(this.edit){
          axios.patch(`${this.APIURI}event/${this.id}`, {
            title : this.title,
            participants : this.participants
          }, {
            headers : {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            this.resetField()
            Swal.fire({
              position : 'center',
              icon : "success",
              title : res.data.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.getEvents()
          })
          .catch(err => {
            this.resetField()
            Swal.fire({
              position : 'center',
              icon : "error",
              title : err.message,
              showConfirmButton: false,
              timer: 1500
          })
          })
        }
        else{
          this.dialog = false
          axios.post(`${this.APIURI}event`, {
            title : this.title,
            participants : this.participants,
            timeHeld : this.selectedDate
          }, {
            headers : {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            this.resetField()
            Swal.fire({
              position : 'center',
              icon : "success",
              title : res.data.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.getEvents()
          })
          .catch(err => {
            this.resetField()
            Swal.fire({
              position : 'center',
              icon : "error",
              title : err.message,
              showConfirmButton: false,
              timer: 1500
          })
          })
        }
      }
    },
    deleteEvent(){
      const token = localStorage.getItem("token")
      axios.delete(`${this.APIURI}event/${this.id}`, {
          headers : {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.resetField()
          Swal.fire({
            position : 'center',
            icon : "success",
            title : res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getEvents()
        })
        .catch(err => {
          this.resetField()
          Swal.fire({
            position : 'center',
            icon : "error",
            title : err.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    resetField(){
      this.title = '';
      this.participants = undefined;
      this.selectedDate = new Date();
      this.dialog = false;
      this.creator = undefined
      this.timeHeld = undefined
    }
  },
  beforeCreate(){
    const token = localStorage.getItem("token")
    
    axios.get(`${this.APIURI}user/all/username`, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.usernames = res.data
      })
      .catch(err => {
        Swal.fire({
            position : 'center',
            icon : "error",
            title : err.message,
            showConfirmButton: false,
            timer: 1500
        })
      })
  },
  beforeMount(){
    const token = localStorage.getItem("token")
    axios.get(`${this.APIURI}user`, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.user = res.data
      })
      .catch(err => {
        Swal.fire({
            position : 'center',
            icon : "error",
            title : err.response.data.message,
            showConfirmButton: false,
            timer: 1500
        })
      })
    this.getEvents()
  }
})
export default Demo
</script>

<template>
<VCard>
  <div class="main"  style="width: 100%; " >
    <div class="inner">
      <div class='demo-app'>
        <div class='demo-app-main'>
          <FullCalendar
            :options='calendarOptions'
          >
          </FullCalendar>
          <v-dialog
            v-model="dialog"
            width="32em"
            persistent
          >
            <v-card>
              <v-form ref="form">
                <v-card-text>
                  <v-text-field 
                    class="mb-4" 
                    label="Event Name" 
                    v-model="title"
                    :rules="[v => !!v || 'Event name is required']"
                    required
                    :readonly="!((creator == user._id) && (timeHeld.getTime() > new Date().getTime())) && (creator != undefined && timeHeld != undefined)"
                  ></v-text-field>
                  <v-autocomplete 
                    label="Participants" 
                    v-model="participants" 
                    :items="usernames"
                    chips
                    :closable-chips="(creator == user._id) && (timeHeld.getTime() > new Date().getTime())"
                    multiple
                    :readonly="!((creator == user._id) && (timeHeld.getTime() > new Date().getTime())) && (creator != undefined && timeHeld != undefined)"
                  ></v-autocomplete>
                </v-card-text>
                <v-card-actions>
                    <div v-if="!edit">
                      <v-btn @click="saveEvent()">Submit</v-btn>
                      <v-btn @click="resetField()">Cancel</v-btn>
                    </div>
                    <div v-else>
                      <div v-if="(creator == user._id) && (timeHeld.getTime() > new Date().getTime())">
                        <v-btn @click="saveEvent()">Update</v-btn>
                        <v-btn v-if="edit" @click="deleteEvent()">Delete</v-btn>
                        <v-btn @click="resetField()">Cancel</v-btn>
                      </div>
                      <div v-else>
                        <v-btn @click="resetField()">Close</v-btn>
                      </div>
                    </div>
                </v-card-actions>
              </v-form>
             
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</VCard>
</template>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;

  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-main {
  flex-grow: 1;
  padding: 1rem;
}

.fc { /* the calendar root */
  max-width: 1000px;
  margin: 0 auto;
}

.swal2-input {
    height: 3.625em;
    width: 366px;
    padding: 0 0.75em;
}

.collab{
  margin-block-end: -1rem;
  padding-top: 10px;
}


</style>
