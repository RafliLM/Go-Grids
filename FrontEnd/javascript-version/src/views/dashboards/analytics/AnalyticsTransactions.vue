<!--<script setup>
const statistics = [
  {
    title: 'Sales',
    stats: '245k',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Customers',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Product',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Revenue',
    stats: '$88k',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]
</script>-->

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  data() {
    return {
      profile: {
        username: localStorage.getItem("username"),
      },
      grid:[]
    };
  },
  methods: {
    getProfile() {
      const token = localStorage.getItem("token"); // membaca token dari local storage
      const config = {
        headers: { Authorization: `Bearer ${token}` } // mengirim token pada header permintaan
      };
      axios.get("//localhost:5000/api/user", config)
        .then(response => {
          this.profile = response.data.firstname;
        })
        .catch(error => {
          console.log(error);
        });
    },
    showSwal() {
      Swal.fire({
        title: "Add Journal ✏️",
        width: '800px',
        html:
        '<input id="swal-input1" class="swal2-input" autofocus placeholder="Journal Title" style="width:600px;">' +
        '<textarea id="swal-input2" class="swal2-input" autogrow placeholder="Journal Content" style="width:600px; height:100px;">',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#14162E',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      }).then((result) => {
    if (result.isConfirmed) {
      const question = document.getElementById('swal-input1').value;
      const answer = document.getElementById('swal-input2').value;
      const newGrid = { question, answer };
      this.grid.push(newGrid);
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.post('//localhost:5000/api/journal/create', { question, answer }, config)
        .then(response => {
          console.log(response.data);
          Swal.fire({
            title: 'Success!',
            text: 'Journal added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add journal!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  });
    }
  },
  mounted() {
    this.getProfile();
  }
};
</script>


<style type="text/css">
.jarak{
  margin-top: -20px;
}
.satu {
  font-size: 70px;
}
.gridTitle{
  font-weight: bold;
  font-size: medium;
  color: black;
}
.gridContent{
  color: black;
  font-size: small;
}
</style>

<template>
  <!-- Hallo Kurkur -->
  <VCard>
    <VCardItem>
      <div class="pt-5 main" style="width: 200%">
        <h1 class="pl-5">
          Hello, {{ this.profile }} 👋
        </h1>
        <p class="pl-5">How do you feel today?</p>
        <a href="\" class="satu">
        😀😭😡
        </a>

        <h2 class="pl-5">Today's Journal</h2>
      </div>
      <VCol cols="8" md="6">
        <div class="right">
          <v-row justify="center" style="right: 200px; position: absolute">
            <v-btn class="button-AddGrid" color="primary" @click="showSwal()"> + Add Grid Journal </v-btn>

              <!-- <v-card height="44rem">
                <v-card-title class="pl-10">
                  <h1>Add Journal ✏️</h1>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field class="input-Title" label="Title" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea class="input-Content"
                          label="Content"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-form ref="form" enctype="multipart/form-data" style="right: 48px; position: absolute; margin-top: -12px" class="jarak">
                          <v-btn class="button-SubmitJournal"
                            color="#ffffff"
                            size="large"
                            type="submit"
                            variant="text"
                            @click="dialog = true"
                            style="right: 860px; position: absolute; background-color: #14162e"
                          >
                            CONFIRM
                          </v-btn>
                          <v-btn class="button-CancelJournal"
                            color="#ffffff"
                            variant="text"
                            size="large"
                            @click="dialog = false"
                            style="right: 760px; position: absolute; background-color: #808080"
                          >
                            CANCEL
                          </v-btn>
                          <br />
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card> -->
          </v-row>
          <v-form ref="form" enctype="multipart/form-data" style="right: 48px; position: absolute; margin-top: -12px">
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
      
      <div style="margin-top: 20px;"> 
        <VCol
          cols="10"
          sm="5"
          md="4"
        >

          <v-col class="text-right" style="margin-bottom: -40px; margin-left: 20px; position: relative; z-index: 1;">
            <v-spacer></v-spacer>
            <v-btn size="x-small" right icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <VCard @click.stop="showSwalEdit()" style=" position: relative; z-index: 0; box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem;">            
            <VCardItem>
              <VCardTitle class="gridTitle">Today's Goal</VCardTitle>
            </VCardItem>

            <VCardText style="padding-bottom: 10px;" class="gridContent">
              Hari ini saya akan mengerjakan tugas mata kuliah Akuntansi
            </VCardText>
          </VCard>
        </VCol>

      </div>

    </VCardItem>
  </VCard>
</template>


<!--<template #append>
        <div class="me-n3">
          <VBtn
            icon
            color="default"
            size="x-small"
            variant="text"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
</template>-->