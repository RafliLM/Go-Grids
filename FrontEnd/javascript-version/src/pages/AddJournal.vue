<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTheme } from 'vuetify'
import moment from 'moment'
const vuetifyTheme = useTheme()
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
          <v-text-field
            class="my-6"
            label="Title"
            required
          ></v-text-field>
          <QuillEditor
            theme="snow"
            toolbar="essential"
            style="height: 250px"
          />
        </v-container>
        <v-form>
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
            >submit
          </v-btn>
          <v-btn
            style="right: 50px; position: absolute"
            to="dashboard"
            class="button-AddGrid"
            color="on-primary"
            variant="white"
            @click="dashboard"
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