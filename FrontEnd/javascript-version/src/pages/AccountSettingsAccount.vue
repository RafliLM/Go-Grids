<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import LZString from 'lz-string'

const cvtBase64 = async file => {
  return await new Promise(resolve => {
    let fileReader = new FileReader()
    fileReader.onload = e => resolve(fileReader.result)
    fileReader.onerror = error => {
      console.log(error)
      alert('An Error occurred please try again, File might be corrupt')
    }
    fileReader.readAsDataURL(file)
  })
}

const reduceImageSize = async (base64Str, MAX_WIDTH = 200, MAX_HEIGHT = 200) => {
  return await new Promise((resolve) => {
    let img = new Image()
    img.src = base64Str
    img.onload = () => {
      let canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL()) // this will return base64 image results after resize
    }
  });
}

const accountData = {
  avatarImg: avatar1
}

const img = ref(null)
const firstname = ref()
const lastName = ref()
const username = ref()
const email = ref()
const password = ref()

const getProfile =() => {
  const token = localStorage.getItem('token') // membaca token dari local storage
  const config = {
    headers: { Authorization: `Bearer ${token}` }, // mengirim token pada header permintaan
  }
  axios
    .get('//localhost:5000/api/user', config)
    .then(response => {
      const data = response.data
      firstname.value = data.firstname,
      lastName.value = data.lastname,
      username.value = data.username,
      email.value = data.email
      if(data.profilePicture){
        img.value = LZString.decompressFromBase64(data.profilePicture)
      }
      password.value = ""
    })
    .catch(error => {
      console.log(error)
    })
}

const update = (firstname,lastName, username, email, password, image = null ) => {
  const token = localStorage.getItem('token') // membaca token dari local storage
  let data = {
    firstname : firstname,
    lastname : lastName,
    username : username,
    password : password,
  }
  if(image){
    data.profilePicture = LZString.compressToBase64(image)
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }, // mengirim token pada header permintaan
  }
  axios.patch("http://localhost:5000/api/user", data ,config).then(res => {
    getProfile()
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Update success!',
      showConfirmButton: false,
      timer: 1500
    })
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

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Please confirm account deactivation']
const resetForm = () => {
  accountDataLocal.value = structuredClone(accountDataLocal)
}
const changeAvatar = async file => {
  const fileReader = new FileReader()
  const {files} = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    console.log(files[0])
    let base64 = await cvtBase64(files[0])
    img.value = await reduceImageSize(base64)
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
        <h1 style="padding-left: 20px; padding-top: 10px;"> Account Settings ⚙️</h1>
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar 
            rounded="lg"
            size="100"
            class="me-6"
            :image="img ? img : avatar1"
          />

          <!-- 👉 Upload Photo -->
          <form
            ref="refForm"
            class="d-flex flex-column justify-center gap-5"
          >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <!--
                  <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                  /> 
                -->
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
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <VCol
                class="input-FirtsNameAccountSetting"
                md="6"
                cols="5"
              >
                <h3> First Name</h3>
              </VCol>

              <VCol
                class="input-LasrNameAccountSetting"
                md="6"
                cols="12"
              >
                <h3> Last Name</h3>
              </VCol>
            </VRow>
            
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="firstname"
                />
              </VCol>

              <!-- 👉 Last Name -->
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
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <VCol
                class="input-EmailAccountSetting"
                md="6"
                cols="5"
              >
                <h3>Email</h3>
              </VCol>

              <VCol
                class="input-UsernameAccountSetting"
                md="6"
                cols="12"
              >
                <h3>Username</h3>
              </VCol>
            </VRow>

            <VRow>
              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="email"
                  type="email"
                />
              </VCol>

              <!-- 👉 Username -->
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
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <!--
              <VRow>
              <VCol class="input-CurrentPasswordAccountSetting"
              md="6"
              cols="5"
              >
              <h3>Current Password</h3>
              </VCol>
              </VRow> 
            -->

            <!--
              <VRow>
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
              </VRow> 
            -->

            <VRow>
              <VCol
                class="input-NewPasswordAccountSetting"
                md="6"
                cols="5"
              >
                <h3>New Password</h3>
              </VCol>

              <!--
                <VCol class="input-ConfirmPasswordAccountSetting"
                md="6"
                cols="5"
                >
                <h3>Confirm Password</h3>
                </VCol> 
              -->
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="password"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <!--
                <VCol
                cols="12"
                md="6"
                >
               
                <VTextField
                v-model="password"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
                </VCol> 
              -->
            
              <!-- 👉 Form Actions -->
              <div class="button-SaveChanges">
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click="update(firstname,lastName, username, email,password, img)"> Save changes </VBtn>
                </VCol>
              </div>
            </VRow>
          </VForm>
        </VCardText>

      </VCard>
    </VCol>

  </VRow>
</template>
