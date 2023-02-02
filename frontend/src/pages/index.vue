<script setup>
import Event from '@/views/dashboards/analytics/Event.vue'
import Journals from '@/views/dashboards/analytics/Journals.vue'
import Timeline from '@/views/dashboards/analytics/Timeline.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import moment from 'moment'
import Swal from 'sweetalert2'
</script>

<template>
<div class="container" style="display: flex;">
  <div class="main"  style= "width: 200%" >
    <h1> Hello, Kurkur 👋</h1>
    <p>How is it going on?</p>
    <div class="grid-container">
    <div>
    <h2> Today's Journal</h2>
    <p>🗓 {{moment().format("DD-MM-YYYY")}}  </p> 
     </div>
  <div class="right">
    <v-form  ref="form" @submit.onclick="submitForm" enctype="multipart/form-data">
      <v-btn
        depressed
        elevation="2"
        outlined
        plain
        raised
        type="submit"
          >+ Add Grid Journal</v-btn>
    </v-form> 
  </div>
</div>

    <VRow class="match-height">
      <VCol class="mt" cols="12"  md="15" >
        <Journals />
      </VCol>

      <!-- <VCol cols="12" md="5">
        <VRow>
          <VCol cols="12" md="12" >
            <Timeline />
          </VCol>

        </VRow>
      </VCol> -->
    </VRow>
</div>

  <div style="flex-grow: 1; padding: 20px; width: 25%" >
    <div  style="float:left;">
      <UserProfile /> 
    </div>
    
    <div style="display: table-cell; padding-left: 10%;">
      <h3>Kurkur</h3>
      <p >@kurkurcans</p>
    </div>
    <hr>

    <div style="position: relative;">
      <h2>Your Journal </h2>
      <img src="\src\assets\images\pages\thumbnail.jpg"  style="width:13rem; border-radius: 5%;">
      <div style="position: absolute;  bottom: 10%;left: 5%;"> 
        <v-btn
        to ="journal"
        width = "6rem"
        >Open Here</v-btn>
      </div>
    </div>

    <div>
      <h2> Quotes</h2>
      <div style=" box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem;">
        <p style="font-style :italic;">“Some wishes are only there to teach us how to wait.”</p>
        <p style="font-style :italic; text-align: right;">―Mandy Hale”</p>
        </div>
        <div style=" box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem;">
        <p style="font-style :italic;">“Don’t rush into love. You’ll find the person meant for you when you least expect it.”</p>
        <p style="font-style :italic; text-align: right;">―Franzie Gubatina”</p>
        </div>
    </div>
    
  </div>

</div>
</template>

<script>
import API from '@/api';

  export default {
          data() {
              return {
                  post: {
                      journal_title: "Today's Mood",
                      content: "",
                      image: "",
                  },
                  image: "",
              }
          },
          methods: {
              // selectFile(file){
              //     this.image = file[0];
              // },
              async submitForm() {
                  const formData ={
                      journal_title : this.post.journal_title,
                      content : this.post.content,
                      // image : this.post.image
                  }
                  let time;
          
                  Swal.fire( 'You Added New Journal!', 'Now you can write your journal', 'success');
                  time = 0;

                  while (time < 4000000){
                    time++;
                  }

                  if(time = 4000000){
                    if(this.$refs.form.validate()){
                      const response = await API.addPost(formData);
                      console.log(response);
                      this.$router.push({ name: 'journals', params: {message: response.post.results} });
                  }
                  }
              }
          }
      }
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.right {
    text-align: right;
    align-self: center;
}

.mt{
  margin-top: -1.5rem;
}
</style>
