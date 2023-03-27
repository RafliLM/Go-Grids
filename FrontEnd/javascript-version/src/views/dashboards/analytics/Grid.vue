<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import router from '@/router'

export default {
  data() {
    return {
      profile: {
        username: localStorage.getItem('username'),
      },
      journals: {
        grid: [],
      }, // mengganti variabel journal menjadi journals
    }
  },
  methods: {
    redirectJournal(id) {
      console.log(id)
      router.push({name : 'EditJournal', params : {id : id}})
    },
    
    getProfile() {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      axios
        .get('//localhost:5000/api/user', config)
        .then(response => {
          this.profile = response.data.firstname
        })
        .catch(error => {
          console.log(error)
        })
    },
    getJournals() {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const currentDate = new Date().toISOString().substr(0, 10)
      axios
        .get(`//localhost:5000/api/journal/${currentDate}`, config)
        .then(response => {
          this.journals = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created() {
    this.getProfile()
    this.getJournals()
   
  },
}
</script>



<style type="text/css">
.jarak {
  margin-top: -20px;
}
.satu {
  font-size: 70px;
}
.gridTitle {
  font-weight: bold;
  font-size: medium;
  color: black;
}
.gridContent {
  color: black;
  font-size: small;
}

.emoticons {
  display: flex;
  justify-content: left;
  align-items: center;
}

.emoticon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 2px;
  font-size: 4rem;
  text-align: center;
  border-radius: 50%;
  text-decoration: none;
  color: black;
}
</style>

<template>
  <!-- Hallo Kurkur -->
  <VCard>
    <VCardItem>
      <div
        class="main"
        style="width: 100%"
      >
        <h1 class="pl-5">Hello, {{ this.profile }} 👋</h1>
        <p class="pl-5">How do you feel today?</p>
        <div class="emoticons">
          <a
            href="/"
            class="emoticon"
            >😀</a
          >
          <a
            href="/"
            class="emoticon"
            >😭</a
          >
          <a
            href="/"
            class="emoticon"
            >😡</a
          >
        </div>

        <h2 class="pl-5">Today's Journal</h2>
      </div>
      <VCol
        cols="8"
        md="6"
      >
        <div class="right">
          <v-row
            justify="center"
            style="right: 200px; position: absolute"
          >
            <v-btn
              to="AddJournal"
              class="button-AddGrid"
              color="primary"
              @click="AddJournal"
            >
              + Add Grid Journal
            </v-btn>
          </v-row>
          <v-form
            ref="form"
            enctype="multipart/form-data"
            style="right: 48px; position: absolute; margin-top: -12px"
          >
            <v-btn
              outlined
              plain
              raised
              depressed
              elevation="2"
              type="submit"
              variant="#ffffff"
              color="black"
            >
              <strong>DELETE ALL</strong>
            </v-btn>
          </v-form>
        </div>
      </VCol>

      <div style="margin-top: 50px">
        <VRow style="padding-left: 20px;">
        <VCol cols="10" sm="5" md="4" 
              v-for="(grid) in journals.grid"
                :key="grid._id">
          <v-col
            class="text-right"
            style="margin-bottom: -40px; margin-left: 20px; position: relative; z-index: 1"
          >
            <v-spacer></v-spacer>
          </v-col>
          <div class="containercard d-flex" style="margin-left: 20px;">
            <div class="d-flex flex-row mb-6">
              <div
                class="col-md-4"
              >
                <VCard
                  v-if="journals != null"
                  @click="redirectJournal(grid._id)"
                  style="
                    position: relative;
                    z-index: 0;
                    box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%);
                    padding: 1rem;
                    border-radius: 1rem;
                    width: 200px;
                    margin-right: 20px;
                  "
                >
                  <VCardItem>
                    <VCardTitle class="gridTitle">{{ grid.question }}</VCardTitle>
                    <VCardTitle class="gridTitle">{{ grid._id }}</VCardTitle>
                  </VCardItem>
                  <VCardText
                    style="padding-bottom: 10px"
                    class="gridContent"
                    >{{ grid.answer }}
                  </VCardText>
                </VCard>
              </div>
            </div>
          </div>
        </VCol>
        </VRow>
        <div>
          <center>
            <VCard
              v-if="journals == null"
              class="align-center justify-center auth-card"
              style="background-color: transparent; opacity: 50%"
            >
              <img
                margin="10"
                height="170"
                width="200"
                src="gglogo.png"
              />
              <VCol class="text-b text-base">
                <h3>You haven't add any journal</h3>
              </VCol>
            </VCard>
          </center>
        </div>
      </div>
    </VCardItem>
  </VCard>
</template>

