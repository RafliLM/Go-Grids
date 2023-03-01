<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import axios from 'axios'
import Swal from 'sweetalert2'

const form = ref({
  enter_username: '',
})
const vuetifyTheme = useTheme()
</script>

<template>
  <div class="pop auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="700" max-height="445" style="background-color: transparent;">
        <img max-width=100% src="gglogo.png">
        <VCol
        cols="10"
        class="text-b text-base"
        >
            <span>No worries, we will send you reset instruction</span>
        </VCol>
    </VCard>
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
      style="background-color: transparent;"
    >
      <VCardText class="pt-2">
        <h3 class="text-h3 text-b font-weight-bold mb-0" style="font-family: 'Poppins', sans-serif !important;">
          Forgot Password?
        </h3>
        <p class="mb-2 text-b font-weight-normal">
          Please enter your username
        </p>
      </VCardText>

      <VCardText>
        <VForm>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField class="input-UsernameLogin"
                v-model="form.username"
                label="Enter Username"
              />
            </VCol>

            <VCol cols="12">
              <!-- login button -->
              <VBtn class="button-LoginLogin"
                block
                type="submit"
              >
                Submit
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>