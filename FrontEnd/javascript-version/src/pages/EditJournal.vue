<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTheme } from 'vuetify'
import moment from 'moment'
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'


const route = useRoute()
const vuetifyTheme = useTheme()
const grid = ref([
  {
    question: '',
    answer: ''
  }
])

const date = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
console.log(route)


const updateJournal = () => {
//   const id = reactive({
//     value: route.params.id
//   });
  
  const id = route.params.id
  const token = localStorage.getItem('token') // membaca token dari local storage
  const config = {
    headers: { Authorization: `Bearer ${token}` }, // mengirim token pada header permintaan
  }
  const data = {
    grid: grid.value,
    date: date.value,
    answer: grid.value[0].answer
  }
  data.date = moment().format('YYYY-MM-DD HH:mm:ss')
  axios
    .patch(`//localhost:5000/api/journal/${id}`, data, config) // Mengirim ID sebagai bagian dari URL permintaan PATCH
    .then(response => {
      const journal = response.data.grid
      localStorage.setItem('journal', JSON.stringify(journal))
      window.location.href = 'http://localhost:5173/dashboard'
    })
    .catch(error => {
      console.log(error)
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Failed to update Journal',
        showConfirmButton: false,
        timer: 1500
      })
    })
}
const saveQuillInput = (content) => {
  grid.value[0].answer = content
}

const submitForm = () => {
  updateJournal()
}


</script>

<template>
  <VCard>
    <div>
      <div class="grid-container right" style="padding-top: 30px; posis">
          <h4
            style="padding-left: 25px"
            class="text-h4 font-weight-bold"
          >
            Edit Journal  ✏️
            <div>Parameter ID: {{id}}</div>
          </h4>
        <v-container fluid>
          <h4> Question </h4>
          <v-text-field
            required
            v-model="grid[0].question"
          ></v-text-field>
          <br>
          <h4> Answer </h4>
          <v-textarea
              class="my-1"
              theme="snow"
              toolbar="essential"
              style="height: 250px"
              required
              :value="grid[0].answer"
              @update:model-value="saveQuillInput"
            /> 
        </v-container>
        <v-form @submit.prevent="submitForm">
          <v-btn
            ref="form"
            enctype="multipart/form-data"
            style="right: 172px; position: absolute"
            class="button-AddGrid"
            depressed
            elevation="2"
            outlined
            plain
            raised
            color="primary"
            type="submit"
          >
            Update
          </v-btn>
          <v-btn
            style="right: 50px; position: absolute"
            to="dashboard"
            class="button-AddGrid"
            color="on-primary"
            variant="white"
            elevation="2"
          >
            <strong>Cancel</strong>
          </v-btn>
        </v-form>
        <br><br>
      </div>
    </div>
  </VCard>
</template>