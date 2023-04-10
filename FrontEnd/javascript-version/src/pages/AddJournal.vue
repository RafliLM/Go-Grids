<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTheme } from 'vuetify'
import moment from 'moment'
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import router from '../router'

const vuetifyTheme = useTheme()
const grid = ref(
  {
    question: '',
    answer: ''
  }
)

const date = ref(moment().format('YYYY-MM-DD HH:mm:ss'))

const createJournal = (question, answer) => {
 
  const token = localStorage.getItem('token') // membaca token dari local storage
  const config = {
    headers: { Authorization: `Bearer ${token}` }, // mengirim token pada header permintaan
  }
  const currentDate = localStorage.getItem("date")
  const date = new Date(currentDate)
  axios
    .get(`http://103.172.204.236:5000/api/journal/${currentDate}`, config)
    .then(response => {
      console.log(question, answer)
      if(response.data == null){
        axios
          .post('http://103.172.204.236:5000/api/journal/create', {grid:[{question,answer}],date}, config)
          .then(response => {
            const journal = response.data.grid
            router.push({name : "dashboard"})

          })
          .catch(error => {
            console.log(error)
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Failed to create Journal',
              showConfirmButton: false,
              timer: 1500
            })
          })
      } else{
        let journal = response.data
        journal.grid.push({question, answer})
        console.log(journal.grid)
        axios.patch(`http://103.172.204.236:5000/api/journal/${journal._id}`, {grid:journal.grid}, config)
          .then(response => {
            router.push({name : "dashboard"})
          })
          .catch(error => {
            console.log(error)
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Failed to create Journal',
              showConfirmButton: false,
              timer: 1500
            })
          })
      }
    })
  
}

const submitForm = (question,answer) => {
  createJournal(question,answer)
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
            Add Journal  ✏️
          </h4>
        <v-container fluid>
          <h4> Question </h4>
          <v-text-field
            required
            v-model="grid.question"
          ></v-text-field>
          <br>
          <h4> Answer </h4>
          <v-textarea
              class="my-1"
              theme="snow"
              toolbar="essential"
              style="height: 250px"
              required
              v-model="grid.answer"
            /> 
        </v-container>
        <v-form @submit.prevent="submitForm(grid.question,grid.answer)">
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
            Submit
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