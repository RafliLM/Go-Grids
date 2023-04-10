<script>
import defaultavatar from '@/assets/images/avatars/avatar-1.png'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Calendar, DatePicker } from 'v-calendar'
import { useTheme } from 'vuetify'
import 'v-calendar/style.css'
import LZString from 'lz-string'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import router from '../../../router'

export default {
  components: {
    Calendar,
    DatePicker,
    VueDatePicker
  },
  props: {
    user : Object,
  },
  setup() {
    const vuetifyTheme = useTheme()
    const triangleBg = computed(() => {
      return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
    })
  },
  data() {
    return {
      selectedDate: new Date(),
      calendarAttributes: [
        {
          key: 'highlight',
          dates: [{ start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 7)) }],
        },
      ],
      quote1: {
        text: '',
        author: '',
      },
      quote2: {
        text: '',
        author: '',
      },
      quotes: [],
      journals: {
        grid: [],
      }, // mengganti variabel journal menjadi journals
      avatar : defaultavatar,
      profilePicture : this.user.profilePicture,
    }
  },
  beforeMount() {
    if(this.profilePicture){
      this.profilePicture = LZString.decompressFromBase64(this.profilePicture)
    }
    this.getQuotes()
    this.getJournals(this.selectedDate)
  },
  methods: {
    logout(){
      localStorage.removeItem("token")
      this.$router.push({ path : "/"})
    },
    addDot(date) {
      this.calendarAttributes.push({
        key: 'dot',
        dates: [date],
        dotColor: 'red',
      })
      console.log('Dot added to:', date)
    },
    async getQuotes() {
      const data = await fetch('https://type.fit/api/quotes').then(res => res.json())
      const randomQuote1 = Math.floor(Math.random() * data.length)
      let randomQuote2 = Math.floor(Math.random() * data.length)
      while (randomQuote2 === randomQuote1) {
        randomQuote2 = Math.floor(Math.random() * data.length)
      }
      if (this.quote1.text) {
        this.quotes = [...this.quotes, this.quote1]
      }
      if (this.quote2.text) {
        this.quotes = [...this.quotes, this.quote2]
      }
      this.quote1 = {
        text: data[randomQuote1].text,
        author: data[randomQuote1].author,
      }
      this.quote2 = {
        text: data[randomQuote2].text,
        author: data[randomQuote2].author,
      }
    },
    getJournals(date) {
      if (date instanceof Date) {
        const token = localStorage.getItem('token')
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        const formattedDate = date.toISOString().substr(0, 10)
        axios
          .get(`http://103.172.204.236:5000/api/journal/${formattedDate}`, config)
          .then(response => {
            this.journals = response.data
            this.grid = true // set nilai grid menjadi true ketika mendapatkan jurnal
          })
          .catch(error => {
            console.log(error)
            this.journals = null // menetapkan nilai journals menjadi null ketika ada kesalahan pada permintaan
            this.grid = null // menghapus grid ketika tanggal yang dipilih tidak memiliki jurnal
          })
      } else {
        console.error('Invalid date object.')
      }

      // menambahkan blok kondisi untuk menampilkan V-Card ketika tidak ada jurnal pada tanggal yang dipilih
      if (!this.journals || !this.journals.grid || this.journals.grid.length === 0) {
        this.grid = null;
      }
    },
    deleteAllJournals(journal) {
      const journalId = journal._id
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      axios
        .delete(`http://103.172.204.236:5000/api/journal/${journalId}`, config)
        .then(response => {
          Swal.fire('Success', 'All journals have been deleted!', 'success')
          this.getJournals(this.selectedDate)
        })
        .catch(error => {
          console.log(error)
          Swal.fire('Error', 'Failed to delete journals', 'error')
        })
    },
    showSwalEdit(journal, index) {
      const question = journal.grid[index].question
      const answer = journal.grid[index].answer
      Swal.fire({
        title: 'Edit Journal',
        html:
          `<input id="swal-input1" class="swal2-input" value="${question}">` +
          `<textarea id="swal-input2" class="swal2-input ans" >${answer}</textarea>`,
        focusConfirm: false,
        backdrop: true,
        icon: 'info',
        customClass: {
          popup: 'my-popup-class',
          confirmButton: 'my-confirm-button-class',
          cancelButton: 'my-cancel-button-class',
        },
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        preConfirm: () => {
          const newQuestion = Swal.getPopup().querySelector('#swal-input1').value
          const newAnswer = Swal.getPopup().querySelector('#swal-input2').value

          return { newQuestion, newAnswer }
        },
      }).then(result => {
        if (result.isConfirmed) {
          let grid = journal.grid
          grid[index] = {
            question: result.value.newQuestion,
            answer: result.value.newAnswer,
          }
          const token = localStorage.getItem('token')
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          }
          axios.patch(`http://103.172.204.236:5000/api/journal/${journal._id}`,{ grid }, config)
            .then(response => {
              Swal.fire('Success', 'Journal has been updated!', 'success')
              this.getJournals(this.selectedDate)
            })
            .catch(error => {
              console.log(error)
              Swal.fire('Error', 'Failed to update journal', 'error')
            })
        }
      })
    },
    addJournal(){
      const date = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth()+1}-${this.selectedDate.getDate()}`
      localStorage.setItem("date", date)
      router.push({name : "AddJournal"})
    },
  }    
} 
</script>

<style type="text/css">
.jarak {
  margin-top: -20px;
}
.satu {
  font-size: 70px;
}
.gridTitle {
  font-weight: bold;
  font-size: medium;
  color: black;
}
.gridContent {
  color: black;
  font-size: small;
  max-width: 83%;
}

.swal2-input {
  width: 80%;
}

.my-popup-class {
  width: 700px;
}

.ans {
  height: 100px;
}

.emoticons {
  display: flex;
  justify-content: left;
  align-items: center;
}

.emoticon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 2px;
  font-size: 4rem;
  text-align: center;
  border-radius: 50%;
  text-decoration: none;
  color: black;
}
</style>

<template>
  <!-- Nama Pengguna -->
  <VRow class="match-height">
    <VCol
      cols="10"
      md="9"
    >
    <VCard>
      <VCardItem>
        <div
          class="main"
          style="width: 100%"
        >
          <h1 class="pl-5">Hello, {{ user.firstname }} 👋</h1>
          <p class="pl-5">How do you feel today?</p>
          <div class="emoticons">
            <button

              class="emoticon" @click="addDot('2023-04-01')" 
              >😀</button
            >
            <a

              class="emoticon" @click="addDot(selectedDate)" style="cursor: pointer;"
              >😭</a
            >
            <a

              class="emoticon" @click="addDot(selectedDate)" style="cursor: pointer;"
              >😡</a
            >
          </div>
</div>
            <h2 class="pl-5">Today's Journal</h2>

          <VCol
            cols="8"
            md="6"
          >
            <div class="right">
              <v-row
                justify="center"
                style="right: 200px; position: absolute"
              >
                <v-btn
                  class="button-AddGrid"
                  color="primary"
                  @click="addJournal"
                >
                  + Add Grid Journal
                </v-btn>
              </v-row>
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
                  variant="#ffffff"
                  color="black"
                  @click="deleteAllJournals(journals)"
                >
                  <strong>DELETE ALL</strong>
                </v-btn>
              </v-form>
            </div>
          </VCol>

          <div style="margin-top: 50px">
            <VRow v-if="journals !== null">
              <VCol
                cols="10"
                sm="5"
                md="4"
                v-for="(grid, index) in journals.grid"
                :key="grid._id"
              >
                <v-col
                  class="text-right"
                  style="margin-bottom: -40px; margin-left: 20px; position: relative; z-index: 1; width: 33%"
                >
                  <v-spacer />
                </v-col>
                <div
                  class="containercard d-flex"
                  style="margin-left: 20px; width: 33%"
                >
                <!-- Text isi pada grid -->
                  <div class="d-flex flex-row mb-6">
                    <div class="col-md-1">
                      <VCard
                        v-if="journals != null"
                        @click="showSwalEdit(journals, index)"
                        style="
                          position: relative;
                          z-index: 0;
                          box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%);
                          padding: 1rem;
                          border-radius: 1rem;
                          width: 270px;
                          height: 100%;
                          margin-right: 20px;
                        "
                      >
                      <!-- Text judul pada grid -->
                        <VCardItem>
                          <VCardTitle class="gridTitle" style="text-align:center">{{ grid.question }}</VCardTitle>
                        </VCardItem>
                        <VCardText
                          style="padding-bottom: 10px"
                          class="gridContent"
                          >{{ grid.answer }}
                        </VCardText>
                      </VCard>
                    </div>
                  </div>
                </div>
              </VCol>
            </VRow>
            <div  v-if="journals == null">
              <center>
                <VCard
                  class="align-center justify-center auth-card"
                  style="background-color: transparent; opacity: 50%"
                >
                  <img
                    margin="10"
                    height="170"
                    width="200"
                    src="/gglogo.png"
                  >
                  <VCol class="text-b text-base">
                    <h3>You haven't add any journal</h3>
                  </VCol>
                </VCard>
              </center>
            </div>
          </div>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol
      cols="10"
      md="3"
    >
      <VRow>
        <div style="flex-grow: 1; padding: 20px; width: 25%">
          <div style="float: left" />
          <VRow>
            <VCol
              cols="1"
              md="1"
            >
              <VAvatar
                style="cursor: pointer"
                color="primary"
                size="50"
                variant="tonal"
              >
                <VImg :src="profilePicture ? profilePicture : avatar" />

                <!-- SECTION Menu -->
                <VMenu
                  activator="parent"
                  width="230"
                  location="bottom end"
                  offset="14px"
                >
                  <VList>
                    <!-- 👉 User Avatar & Name -->
                    <VListItem>
                      <template #prepend>
                        <VListItemAction start>
                          <VAvatar
                            color="primary"
                            size="40"
                            variant="tonal"
                          >
                            <VImg :src="profilePicture ? profilePicture : avatar" />
                          </VAvatar>
                        </VListItemAction>
                      </template>

                      <VListItemTitle class="font-weight-semibold">
                        {{ `${user.firstname} ${user.lastname}` }}
                      </VListItemTitle>
                      <VListItemSubtitle class="text-disabled">
                        {{ user.username }}
                      </VListItemSubtitle>
                    </VListItem>

                    <VDivider class="my-2" />

                    <!-- 👉 Settings -->
                    <VListItem to="account-settings">
                      <template #prepend>
                        <VIcon
                          class="me-2"
                          icon="mdi-cog-outline"
                          size="22"
                        />
                      </template>

                      <VListItemTitle class="button-Settings">Settings</VListItemTitle>
                    </VListItem>

                    <!-- Divider -->
                    <VDivider class="my-2" />

                    <!-- 👉 Logout -->
                    <VListItem @click="logout()">
                      <template #prepend>
                        <VIcon
                          class="me-2"
                          icon="mdi-logout-variant"
                          size="22"
                        />
                      </template>

                      <VListItemTitle class="button-Logout">Logout</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>


        <!-- !SECTION -->
        </VAvatar>
          </VCol>
          <VCol cols="1" md="7">
            <div style=" padding-left: 20%;">
              <h3>{{ `${user.firstname} ${user.lastname}` }}</h3>
              <p>@{{ user.username }}</p>
            </div>
          </VCol>
        <VRow class="py-5" style="display: flex; justify-content: center; align-items: center;">
          <VCard>
            <DatePicker 
            v-model="selectedDate"
            :attributes="calendarAttributes" 
            @click="getJournals(selectedDate);"
            @selected="getJournals"
            style="background-color: transparent; border: 0px;"
            width="100%"
            />
          </VCard>
        </VRow>
        
        </VRow>
          <br>
          <h1>Quotes</h1>
          <VCard style="background-color: transparent">
            <VCardText style="box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem">
              <p style="font-style: italic">
                {{ quote1.text }}
              </p>
              <p style="font-style: italic; text-align: right">
                {{ quote1.author === null ? 'Unknown' : quote1.author }}
              </p>
            </VCardText>
            <VCardText
              class="mt-7"
              style="box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem"
            >
              <p style="font-style: italic">
                {{ quote2.text }}
              </p>
              <p style="font-style: italic; text-align: right">
                {{ quote2.author === null ? 'Unknown' : quote2.author }}
              </p>
            </VCardText>
          </VCard>
        </div>
      </VRow>
    </VCol>
  </VRow>
</template>


