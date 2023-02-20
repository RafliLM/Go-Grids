<script setup>
// import TypographyHeadlines from '@/views/user-interface/typography/TypographyHeadlines.vue'
// import TypographyTexts from '@/views/user-interface/typography/TypographyTexts.vue'
import { useTheme } from 'vuetify'
import moment from 'moment'
const vuetifyTheme = useTheme()
</script>

<template>
<div class="main"  style="width: 100%; " >
  <div style="position: relative;">
    <img src="\src\assets\images\pages\thumbnail.jpg"  style="object-fit: cover; height:10rem; width:100%; object-position: 60% 80%; border-radius: 1rem;">
    <div style="position: absolute;  bottom: 5%;left: 2%;"> 
        <h1 style="color:white;"> Your Journals </h1>
        <p style="color:white;"> Look what you've been through </p>
    </div>
  </div>
        
  <div class="grid-container">
    <div>
      <h1> Journals 📖 </h1>
    </div>

    <div class="right" >
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
            >
              TODAY
            </v-btn>
          </v-form>
    </div>
  </div>
</div>
  <!-- <VRow>
    <VCol cols="12">
      <TypographyHeadlines />
    </VCol>

    <VCol cols="12">
      <TypographyTexts />
    </VCol>
  </VRow> -->
</template>
