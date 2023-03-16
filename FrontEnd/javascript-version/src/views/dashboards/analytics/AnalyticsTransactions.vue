<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  data() {
    return {
      profile: {
        username: localStorage.getItem('username'),
      },
      journals: {
        grid : []

      } // mengganti variabel journal menjadi journals
    };
  },
  methods: {
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
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const currentDate = new Date().toISOString().substr(0, 10);
      axios
        .get(`//localhost:5000/api/journal/${currentDate}`, config)
        .then(response => {
          this.journals = response.data;
        })
        .catch(error => {
          console.log(error);
        });
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
</style>

<template>
  <!-- Hallo Kurkur -->
  <VCard>
    <VCardItem>
      <div
        class="pt-5 main"
        style="width: 200%"
      >
        <h1 class="pl-5">Hello, {{ this.profile }} 👋</h1>
        <p class="pl-5">How do you feel today?</p>
        <a
          href="\"
          class="satu"
        >
          😀😭😡
        </a>

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

      <div style="margin-top: 20px">
        <VCol
          cols="10"
          sm="5"
          md="4"
        >
          <v-col
            class="text-right"
            style="margin-bottom: -40px; margin-left: 20px; position: relative; z-index: 1"
          >
            <v-spacer></v-spacer>
          </v-col>
          
          <VCard
          v-if="journals != null"
          v-for="(grid, index) in journals.grid"
          :key="index"
          @click.stop="$router.push({ name: 'EditJournal', params: { id: journal._id } })"
          style="
            position: relative;
            z-index: 0;
            box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%);
            padding: 1rem;
            border-radius: 1rem;
          "
        >
          <VCardItem>
            <VCardTitle class="gridTitle">{{ grid.question }}</VCardTitle>
          </VCardItem>
          <VCardText
            style="padding-bottom: 10px"
            class="gridContent"
          >
            {{ grid.answer }}
          </VCardText>
        </VCard>
        </VCol>
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
            <VCol
              class="text-b text-base"
            >
            <h3>You haven't add any journal</h3>
            </VCol>
            </VCard>
          </center>
      </div>
      </div>
    </VCardItem>
  </VCard>
</template>


