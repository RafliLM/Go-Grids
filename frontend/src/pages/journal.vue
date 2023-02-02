<script setup>
import { useTheme } from 'vuetify'
import moment from 'moment'
const vuetifyTheme = useTheme()
</script>

<template>
<div class="main"  style="width: 100%; " >
    <div style="position: relative;">
        <img src="\src\assets\images\pages\thumbnail.jpg"  style="object-fit: cover; height:10rem; width:100%; object-position: 60% 80%; border-radius: 1rem;">
        <div style="position: absolute;  bottom: 5%;left: 2%;"> 
            <h1 style="color:white;"> Your Journal </h1>
            <p style="color:white;"> Look what you've been through </p>
        </div>
    </div>
        
<div class="grid-container">
  <div>
    <h1> Journals 📖 </h1>
   <v-btn
        icon="mdi-chevron-left"
        size = 25
        @click="getDate(-1)"
    ></v-btn>
    🗓  <input
      size= 6
      v-model="data.date" />
    <v-btn
        icon="mdi-chevron-right"
        size = 25
        @click="getDate(1)"
    ></v-btn>
  </div>

  <div class="right" >
    <v-btn
        @click="todayDate()"
    >Today</v-btn>
  </div>

</div>

  <br>
  <VCard class="scroll" height="50rem">
    <VCardText class="pt-4">
        <VRow>
          <VCol cols="4"  md="6" v-for="(post) in posts" :key="post._id">
            <VCard
              subtitle="📌"
              class="position-relative"
              text :to="{ name:'edit', params: { id: post._id } }">
              <VCardText>
                <h4>{{post.journal_title}}</h4>
                <Textarea  rows="5" cols="48" placeholder="Type here">{{post.content}}</Textarea>
              </VCardText>
            </VCard>
            <VCardText>
              <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
            </VCardText>
          </VCol>
        </VRow>
      </VCardText>
  </VCard>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 2.625rem;
}
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.right {
    text-align: right;
    align-self: flex-end;
}

.scroll {
  overflow-y: scroll;
}

</style>

<script>
import API from '@/api';

export default {
  name: 'journal',
  data(){
    return {
      posts: [],
      data: {
        date: moment().format("YYYY-MM-DD"),          
    }, 
    }
  },
  async created() {
    // const date = this.data.date
    this.posts = await API.getPostByDate(this.data.date);
  },
  methods: {
              async getDate(days) {
                const startdate = this.data.date;
                const new_date = moment(startdate);
                const now = new_date.add(days, "days").format("YYYY-MM-DD");
                this.data.date = now
                this.posts = await API.getPostByDate(this.data.date);
              },
              async todayDate(){
                this.data.date = moment().format("YYYY-MM-DD")
                this.posts = await API.getPostByDate(this.data.date);
              },
              async removePost(id){
                const response = await API.deletePost(id);
                window.location.reload();
            },
            }
}
</script>

