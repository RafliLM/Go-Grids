<script setup>
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import trophy from '@/assets/images/misc/trophy.png'
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})

const props = defineProps({
  fullname : String,
  username : String
})
const date = ref(new Date());
const attrs = ref([
  {
    dot: 'pink',
    dates: '2023-03-01T18:00:00Z',
  },
  {
    dot: 'indigo',
    dates: '2023-03-11T19:00:00Z',
  },
]);

</script>


<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios from 'axios';

export default {
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      selectedDate: new Date(),
      data: null,

      quote1: {
        text: "",
        author: ""
      },
      quote2: {
        text: "",
        author: ""
      },
      quotes: []
    };
  },
  methods: {
    getJournalsByDate() {
    axios
      .git('https://locallhost:5000/api/journal/:date')
      .then(response =>{
        this.journal = response.data
      })
      .catch(error => {
          console.log(error)
      })
    },
  },
  created() {
    this.getQuotes();
  },
  methods: {
    async getQuotes() {
      const data = await fetch("https://type.fit/api/quotes").then(res => res.json());
      const randomQuote1 = Math.floor(Math.random() * data.length);
      let randomQuote2 = Math.floor(Math.random() * data.length);
      while (randomQuote2 === randomQuote1) {
        randomQuote2 = Math.floor(Math.random() * data.length);
      }
      if (this.quote1.text) {
        this.quotes = [...this.quotes, this.quote1];
      }
      if (this.quote2.text) {
        this.quotes = [...this.quotes, this.quote2];
      }
      this.quote1 = {
        text: data[randomQuote1].text,
        author: data[randomQuote1].author
      };
      this.quote2 = {
        text: data[randomQuote2].text,
        author: data[randomQuote2].author
      };
    }
  }

}

</script>

<template>
  <VRow>
    <div style="flex-grow: 1; padding: 20px; width: 25%">
      <div style="float: left">
      </div>
      <VRow>
        <VCol cols="1" md="1">
        <VAvatar
          style="cursor: pointer;"
          color="primary" 
          size="50" 
          variant="tonal">
      <VImg :src="avatar1" />

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
                    <VImg :src="avatar1" />
                  </VAvatar>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ fullname }}
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled">
              {{ username }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Settings -->
          <VListItem to="account-settings">
            <template  #prepend>
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
          <VListItem to="/">
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
            <h3>{{ fullname }}</h3>
            <p>@{{ username }}</p>
          </div>
        </VCol>
      <VRow class="py-5" style="display: flex; justify-content: center; align-items: center;">
        <VCard>
          <DatePicker 
          v-model="date"
          mode="date"
          :attributes="attrs"
          style="background-color: transparent; border: 0px;"
          width="100%"
          ></DatePicker>
        </VCard>
      </VRow>
      
      </VRow>
        <br>
        <h1>Quotes</h1>
        <VCard style="background-color: transparent;">
          <VCardText style="box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem">
            <p style="font-style: italic">
              {{ quote1.text }}
            </p>
            <p style="font-style: italic; text-align: right">{{ quote1.author === null ? 'Unknown' : quote1.author }}</p>
          </VCardText>
          <VCardText
            class="mt-7"
            style="box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem"
          >
            <p style="font-style: italic">
              {{ quote2.text }}
            </p>
            <p style="font-style: italic; text-align: right">{{ quote2.author === null ? 'Unknown' : quote2.author }}</p>
          </VCardText>
        </VCard>
    </div>
  </VRow>
</template>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
