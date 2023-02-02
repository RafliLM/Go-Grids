<script setup>
const salesByCountries = [
  {
    abbr: '🗓',
    amount: 'Meeting',
    country: '',
    change: '',
    sales: '',
    color: 'success',
  },
  {
    abbr: '🗓',
    amount: 'Ann Birthday',
    country: '',
    change: '',
    sales: '',
    color: 'success',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <h2>Event</h2>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="data in salesByCountries"
          :key="data.country"
        >
          <template #prepend>
            <VAvatar
              size="40"
              variant="tonal"
              :color="data.color"
              class="me-3"
            >
              {{ data.abbr }}
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            <span class="text-sm font-weight-semibold">{{ data.amount }}</span>
            <!-- <VIcon
              size="22"
              :color="data.change.charAt(0) === '+' ? 'success' : 'error'"
              class="mx-1"
            >
              {{ data.change.charAt(0) === '+' ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </VIcon> -->
            <span :class="`text-xs ${data.change.charAt(0) === '+' ? 'text-success' : 'text-error'}`">
              {{ data.change.slice(1) }}
            </span>
          </VListItemTitle>

          <VListItemSubtitle class="text-xs">
            {{ data.country }}
          </VListItemSubtitle>

          <template #append>
            <div>
              <h4 class="font-weight-semibold">
                {{ data.sales }}
              </h4>
              <span class="text-xs text-medium-emphasis"></span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

  <style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 1.5rem;
  }
  </style>

