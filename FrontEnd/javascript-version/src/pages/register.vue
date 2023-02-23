<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import axios from 'axios'
import Swal from 'sweetalert2'

const form = ref({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  confirm: '',
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
const register = data => {
  if(data.confirm == data.password){
    axios.post("http://localhost:5000/api/register", {
      firstname : data.firstname,
      lastname : data.lastname,
      username : data.username,
      email : data.email,
      password : data.password,
    }).then(res => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Account Has Been Created',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.href = 'http://localhost:5173/';
    }).catch(err => {
      console.log(err)
    })
  }
  else{
    console.log("Password and Confirm password not match")
  }
  
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="700" style="background-color: transparent;" >
      <img max-width=100% src="gglogo.png">
      <VCol
      cols="12"
      class="text-base text-b"
      >
        <span>If you already have an account</span><br>
        <div class="button-LoginHereRegister">
        <RouterLink
        class="text-secondary"
        to="/"
        >
          Log In Here!
        </RouterLink>
        </div>
      </VCol>
    </VCard>
    <VCard
      class="auth-card pa-4"
      max-width="448"
      style="background-color: transparent;"
    >
      <VCardItem class="justify-center">
      </VCardItem>

      <VCardText class="pt-2">
        <h3 class="text-h3 font-weight-bold mb-0" style="font-family: 'Poppins', sans-serif !important;">
          Get Started!
        </h3>
        <p class="mb-2 text-b">
          Create your account now!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="6">
              <VTextField class="input-EnterFirstName"
                v-model="form.firstname"
                label="Enter First Name"
              />
            </VCol>
            <VCol cols="6">
              <VTextField class="input-EnterLastName"
                v-model="form.lastname"
                label="Enter Last Name"
              />
            </VCol>
            <!-- Username -->
            <VCol cols="12">
              <VTextField class="input-EnterEmail"
                v-model="form.email"
                label="Enter Email"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField class="input-EnterUsername"
                v-model="form.username"
                label="Enter Username"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField class="input-PasswordRegister"
                v-model="form.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />  
            </VCol>
            <!-- Confirm Password -->
            <VCol cols="12">
              <VTextField class="input-ConfirmPasswordRegister"
                v-model="form.confirm"
                label="Confirm Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="button-SignUpRegister">
              <VBtn
                block
                type="submit"
                class="mt-7"
                @click="register(form)"
              >
                Sign up
              </VBtn>
              </div>
            </VCol>
            <!-- login instead -->
            
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
