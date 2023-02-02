<script setup>
import circle from '@/assets/images/logos/circle.png'
import moment from 'moment'
</script>

<template>
  <VCard class="scroll" height="25rem">
    <VCardText>
     <h2>Timeline</h2>
     <p> 👀 to see ur timeline with story</p>
     <router-link
    to="/timeline"
    tag="button"
    class="mt">
     Click here </router-link>
     <br>
     <br>
     <v-timeline
        dense
        clipped
      > 
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
              <!-- <v-col
                cols="7"
                v-text="event.story"
              ></v-col> -->
              <v-col
                class="text-right"
                cols="15"
                v-text="event.created"
              ></v-col>
        
            </v-row>
          </v-timeline-item>
        </v-slide-x-transition>
        </v-timeline>
      </VCardText>
  </VCard>
</template>

<script>
import APIT from '@/apit';
  export default {
    name : 'addTimeline',
    data() {
            return {
                timelines: {
                    story: null,
                    created:moment().format("YYYY-MM-DD HH:mm:ss"),
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
  }
</script>

<style>
.scroll {
  overflow-y: scroll;
}

.mt {
  margin-top:-10rem;
}
</style>