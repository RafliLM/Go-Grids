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
  username: '',
})
const vuetifyTheme = useTheme()

const forgot = (username) => {
  axios.post("http://localhost:5000/api/reset-password", {
    username,
  }).then(res => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Password has been sent to your email',
        showConfirmButton: true
      })
  }).catch(err => {
    console.log(err)
    Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Your Username not exist',
        showConfirmButton: false,
        timer: 1500
      })
  })
}
</script>

<template>
  <div class="pop auth-wrapper d-flex align-center justify-center pa-4" style="text-align: -webkit-center;">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
      style="background-color: transparent;"
    >
      <VCardText class="pt-2">
        <img src="/gglogo.png" style="width: 60%;">
        <h3 class="text-h4 text-b font-weight-bold mb-0" style="font-family: 'Poppins', sans-serif !important;">
          Forgot Password?
        </h3>
        <p class="mb-2 text-b font-weight-normal">
          Please enter your username
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField class="input-UsernameLogin"
                v-model="form.username"
                label="Enter Username"
              />
            </VCol>
            <span style="color: black;">No worries, we will send you reset instruction</span>
            <VCol cols="12">
              <!-- login button -->
              <VBtn class="button-LoginLogin"
                block
                type="submit"
                @click="forgot(form.username)"
              >
                Submit
              </VBtn>
            </VCol>
            <VCol cols="12">
            <RouterLink
              class="text-secondary"
              to="/"
              >
                Log In Here!
            </RouterLink>
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