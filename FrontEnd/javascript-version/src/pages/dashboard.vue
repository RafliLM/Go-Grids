<script setup>
import Grid from '@/views/dashboards/analytics/Grid.vue'
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
  <VRow class="match-height">
    <VCol
    >
      <Grid  v-if="data" :user="data" />
    </VCol>
    <!-- <VCol
      cols="10"
      md="3"
    >
      <Right v-if="data" :fullname="`${data.firstname} ${data.lastname}`" :username="data.username"/>
    </VCol> -->

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
