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
  password: '',
  remember: false,
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
const login = (username, password) => {
  axios.post("http://localhost:5000/api/login", {
    username,
    password,
  }).then(res => {
    localStorage.setItem('token', res.data.token)
    window.location.href = 'http://localhost:5173/dashboard';
  }).catch(err => {
    console.log(err)
    Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Your Username or Password wrong',
        showConfirmButton: false,
        timer: 10000
      })
  })
}
</script>

<template>
  <div class="pop auth-wrapper d-flex align-center justify-center pa-4">

    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
      style="background-color: transparent;"
    >

      <VCardText class="pt-2" style="text-align: -webkit-center;">
        <img src="/public/gglogo.png" style="width: 60%;">
        <h3 class="text-h3 text-b font-weight-bold mb-0" style="font-family: 'Poppins', sans-serif !important;">
          Welcome!
        </h3>
        <p class="mb-2 text-b font-weight-normal">
          Please enter your email and password
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField class="input-UsernameLogin"
                v-model="form.username"
                label="Username"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField class="input-PasswordLogin"
                v-model="form.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              
              <VCol cols="20" class="text-b text-base">
                <div class=" mt-2 button-ForgetPassword">
                <RouterLink
                class="text-secondary mt-1"
                :to="{ name: 'forgot' }"
                style="font-size: small;">
                  Forgot Password?
                </RouterLink>
                </div>
                <span style="font-size: small;">If you don't have an account </span><br>
                <div class="button-RegisterHere">
                <RouterLink
                class="text-secondary mt-2"
                :to="{ name: 'register' }"
                style="font-size: small;">
                  Register Here!
                  </RouterLink>
                </div>
              </VCol>

              <!-- login button -->
              <VBtn class="button-LoginLogin"
                block
                type="submit"
                @click="login(form.username, form.password)"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
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

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";

.button-ForgetPassword{
  justify-content: center;
}

</style>

<route lang="yaml">
meta:
  layout: blank
</route>
