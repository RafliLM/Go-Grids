<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const accountData = {
  avatarImg: avatar1
}

const firstname = ref()
const lastName = ref()
const username = ref()
const email = ref()
const password = ref()
// const profile = ref({
//   firstname: '',
//   lastName: '',
//   username : '',
//   email: ''
// })

const getProfile =() => {
      const token = localStorage.getItem('token') // membaca token dari local storage
      const config = {
        headers: { Authorization: `Bearer ${token}` }, // mengirim token pada header permintaan
      }
      console.log("hai")
      axios
        .get('//localhost:5000/api/user', config)
        .then(response => {
            firstname.value = response.data.firstname,
            lastName.value = response.data.lastname,
            username.value = response.data.username,
            email.value = response.data.email
            
        })
        .catch(error => {
          console.log(error)
        })
}

const update = (firstname,lastName, username, email,password ) => {
  const token = localStorage.getItem('token') // membaca token dari local storage
      const config = {
        headers: { Authorization: `Bearer ${token}` }, // mengirim token pada header permintaan
      }
  axios.put("http://localhost:5000/api/user", {
    firstname : firstname,
    lastname : lastName,
    username: username,
    password : password,
  },config).then(res => {
    getProfile()
  }).catch(err => {
    console.log(err)
    Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Update failed',
        showConfirmButton: false,
        timer: 1500
      })
  })
}

getProfile()
// console.log(profile)

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Please confirm account deactivation']
const resetForm = () => {
  accountDataLocal.value = structuredClone(accountDataLocal)
}
const changeAvatar = file => {
  const fileReader = new FileReader()
  const {files} = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

// Password
const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)


</script>


<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <h1 style="padding-left: 20px; padding-top: 10px;"> Account Settings ??????</h1>
        <VCardText class="d-flex">
          <!-- ???? Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- ???? Upload Photo -->
          <form
            ref="refForm"
            class="d-flex flex-column justify-center gap-5"
          >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <div class="button-UploadNewPhoto">
                <span class="d-none d-sm-block">Upload new photo</span>
              </div>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- ???? Form -->
          <VForm class="mt-6">
            <VRow>
              <VCol class="input-FirtsNameAccountSetting"
                md="6"
                cols="5"
              >
                <h3> First Name</h3>
              </VCol>

              <VCol class="input-LasrNameAccountSetting"
                md="6"
                cols="12"
              >
                <h3> Last Name</h3>
              </VCol>
            </VRow>
            
            <VRow>
              <!-- ???? First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="firstname"
                />
              </VCol>

              <!-- ???? Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="lastName"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <VCardText>
          <!-- ???? Form -->
          <VForm class="mt-6">
            <VRow>
              <VCol class="input-EmailAccountSetting"
                md="6"
                cols="5"
              >
                <h3>Email</h3>
              </VCol>

              <VCol class="input-UsernameAccountSetting"
                md="6"
                cols="12"
              >
                <h3>Username</h3>
              </VCol>
            </VRow>

            <VRow>
              <!-- ???? Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="email"
                  type="email"
                />
              </VCol>

              <!-- ???? Username -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="username"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <VCardText>
          <!-- ???? Form -->
          <VForm class="mt-6">
            <!-- <VRow>
              <VCol class="input-CurrentPasswordAccountSetting"
                md="6"
                cols="5"
              >
                <h3>Current Password</h3>
              </VCol>
            </VRow> -->

            <!-- <VRow>
              <VCol
                cols="12"
                md="6"
              >

                <VTextField
                  v-model="password"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow> -->

            <VRow>
              <VCol class="input-NewPasswordAccountSetting"
                md="6"
                cols="5"
              >
                <h3>New Password</h3>
              </VCol>

              <!-- <VCol class="input-ConfirmPasswordAccountSetting"
                md="6"
                cols="5"
              >
                <h3>Confirm Password</h3>
              </VCol> -->
            </VRow>

            <!-- ???? New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- ???? new password -->
                <VTextField
                  v-model="password"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <!-- <VCol
                cols="12"
                md="6"
              >
               
                <VTextField
                  v-model="password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol> -->
            
              <!-- ???? Form Actions -->
              <div class="button-SaveChanges">
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="update(firstname,lastName, username, email,password)"> Save changes </VBtn>
              </VCol>
              </div>
            </VRow>
          </VForm>
        </VCardText>

      </VCard>
    </VCol>

  </VRow>
</template>
