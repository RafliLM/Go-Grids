<script lang='ts'>
import { defineComponent } from 'vue'
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

// Awal dari perubahan

// Untuk menampilkan pop-up, kita dapat menggunakan Sweetalert2
// Cara install di terminal : npm install -S vue-sweetalert2
import Swal from 'sweetalert2'

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
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      
      // Awal perubahan
      // Penambahan Pop-Up untuk Post
      
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      Swal.fire({
        text: "Please enter a new title for your event",
        input: 'text',
        showCancelButton: true
        
    }).then((result) => {
      if (result.isConfirmed) {
        //if (result)
            calendarApi.addEvent({
              id: createEventId(),
              title : result.value, // Judul kegiatan yang dihadiri
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay
            })
            
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Your event has been saved',
              showConfirmButton: false,
              timer: 1500,
            })
          }
});   
      // Akhir perubahan
    },
    handleEventClick(clickInfo: EventClickArg) { // Ketika mengklik suatu event
    
      // Awal perubahan
      // Penambahan Pop-Up untuk Delete
    
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Your event has been deleted!',
        showConfirmButton: false,
        timer: 1500
      })
        clickInfo.event.remove()
        
        // Akhir perubahan
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    },
  }
})
export default Demo
</script>

<template>
<div class="main"  style="width: 100%; " >
    <div class="inner">
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</div>
</div>
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

</style>
