<script setup>
import AnalyticsAward from '@/views/dashboards/analytics/AnalyticsAward.vue'
import AnalyticsTransactions from '@/views/dashboards/analytics/AnalyticsTransactions.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const token = localStorage.getItem("token")

const data = ref(null)

onMounted(async () => {
  await axios.get("http://localhost:5000/api/user/", {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    data.value = res.data
  }).catch(err => {
    console.log(err)
  })
})

</script>

<template>
<!-- <div class="container" style="display: flex;">
  <div class="main"  style= "width: 200%" >
    <h1> Hello, Kurkur 👋</h1>
    <p>How do you feel today?</p>
    <div class="grid-container">
    <div>
    <h2> Today's Journal</h2>
    <p>🗓 {{moment().format("DD-MM-YYYY")}}  </p> 
     </div>
  <div class="right">
    <v-form  ref="form" @submit.onclick="submitForm" enctype="multipart/form-data">
      <v-btn
        depressed
        elevation="2"
        outlined
        plain
        raised
        type="submit"
          >+ Add Grid Journal</v-btn>
    </v-form> 
  </div>

  <div style="flex-grow: 1; padding: 20px; width: 25%" >
    <div  style="float:left;">
      <UserProfile /> 
    </div>
    
    <div style="display: table-cell; padding-left: 10%;">
      <h3>Kurkur</h3>
      <p >@kurkurcans</p>
    </div>
    <hr>
    
  </div> -->
  <VRow class="match-height">
    <VCol
      cols="10"
      md="9"
    >
      <AnalyticsTransactions />
    </VCol>
    <VCol
      cols="10"
      md="3"
    >
      <AnalyticsAward v-if="data" :fullname="`${data.firstname} ${data.lastname}`" :username="data.username"/>
    </VCol>

    <!-- <VCol
      cols="12"
      md="8"
    >
      <AnalyticsTransactions />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsWeeklyOverview />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsTotalEarning />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VRow class="match-height">
        <VCol 
          cols="12"
          sm="6"
        >
          <AnalyticsTotalProfitLineCharts />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical v-bind="totalProfit" />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical v-bind="newProject" />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <AnalyticsBarCharts />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsSalesByCountries />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsDepositWithdraw />
    </VCol>

    <VCol cols="12">
      <AnalyticsDatatable />
    </VCol> -->
  </VRow>
</template>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.right {
    text-align: right;
    align-self: center;
}

.mt{
  margin-top: -1.5rem;
}
</style>
