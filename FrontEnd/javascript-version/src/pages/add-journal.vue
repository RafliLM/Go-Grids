<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTheme } from 'vuetify'
import moment from 'moment'
const vuetifyTheme = useTheme()
</script>

<template>
  <div
    class="main"
    style="width: 100%"
  >
    <div class="grid-container">
      <div style="padding-left: 20px">
        <h1>Add Journal ✏️</h1>
      </div>
      <v-container fluid>
        <v-text-field
          class="my-6"
          label="Title"
          required
        ></v-text-field>
        <QuillEditor
          theme="snow"
          toolbar="essential"
        />
      </v-container>
    </div>
    <div class="right">
      <v-form
        ref="form"
        @submit.onclick="submitForm"
        enctype="multipart/form-data"
        style="right: 1275px; position: absolute"
      >
        <v-btn
          class="button-Today"
          depressed
          elevation="2"
          outlined
          plain
          raised
          color="primary"
          type="submit"
          height="50"
          width="120"
          >submit
        </v-btn>
      </v-form>
      <v-form
        ref="form"
        @submit.onclick="submitForm"
        enctype="multipart/form-data"
        style="right: 1145px; position: absolute"
      >
        <v-btn
          class="button-Today"
          depressed
          elevation="2"
          outlined
          plain
          raised
          variant="white"
          color="black"
          type="submit"
          height="50"
          width="120"
          >
          <strong>Cancel</strong>
        </v-btn>
      </v-form>
    </div>
  </div>
</template>