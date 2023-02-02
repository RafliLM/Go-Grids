<script setup>
import moment from 'moment'
</script>
<template>
<div class="main"  style="width: 100%; " >
<div class="grid-container">
    <div>
    <h1>Story Timeline ⌛</h1>
    <p>Write your story here</p>
    </div>

    <div class="right">
    <h3>Today</h3>
    <p>🗓 {{moment().format("DD-MM-YYYY")}}  </p> 
    </div>
</div>

    <div class="inner">
    <v-container style="max-width: 100%;">
      <v-timeline
        dense
        clipped
      >
        <v-timeline-item
          fill-dot
          class="white--text mb-12"
          color="primary"
          large
        >
       
          <v-text-field
            v-model = "timelines.story"
            hide-details
            flat
            label="Leave a story..."
            solo
            @keydown.enter="comment"
            ref="form"
          >
            <template v-slot:append>
              <v-btn
                class="mx-0"
                depressed
                @click="comment"
                ref="form"
              >
                Add
              </v-btn>
            </template>
          </v-text-field>
      
        </v-timeline-item>
  
        <v-slide-x-transition
          group
        >
          <v-timeline-item
            v-for="event in timeline"
            :key="event.id"
            class="mb-4"
            color="pink"
            small
          >
            <v-row justify="space-between">
              <v-col
                cols="7"
                v-text="event.story"
              ></v-col>
              <v-col
                class="text-right"
                cols="5"
                v-text="event.created"
              ></v-col>
              <v-col
                class="text-right"
                cols="5"
              >
              <v-btn color="red" @click="removeTimeline(event._id)"><v-icon>mdi-delete</v-icon></v-btn>
            </v-col>
            </v-row>
          </v-timeline-item>
        </v-slide-x-transition>
      </v-timeline>
    </v-container>
</div>
</div>
</template>
  
  <script>
  import APIT from '@/apit';
    export default {
      name : 'addTimeline',
      data() {
              return {
                  timelines: {
                      story: null,
                      created:moment().format("DD-MM-YYYY HH:mm:ss"),
                      events:[],
                      nonce:0,
                  },
              }
          },
     async created() {
       this.timelines.events = await APIT.getAllTimelines();
     },
      computed: {
        timeline () {
          return this.timelines.events.slice().reverse()
        },
      },
  
      methods: {
        async comment () {
          const formData = new FormData();
          formData.append('story', this.timelines.story);
          formData.append('created', this.timelines.created);
          const response = await APIT.addTimeline(formData);
          window.location.reload();
     
          this.timelines.events.push({
            id: this.timelines.nonce++,
            story: this.timelines.story,
            created:this.timelines.created,
          })
  
          this.timelines.story = null
        },
        async removeTimeline(id){
                const response = await APIT.deleteTimeline(id);
                window.location.reload();
            },
      },
    }
  </script>

<style>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.right {
    text-align: right;
    align-self: flex-end;
}
</style>
