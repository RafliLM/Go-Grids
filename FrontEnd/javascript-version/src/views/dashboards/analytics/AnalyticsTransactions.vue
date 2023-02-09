<script setup>
const statistics = [
  {
    title: 'Sales',
    stats: '245k',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Customers',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Product',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Revenue',
    stats: '$88k',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <div class="main"  style= "width: 200%" >
        <h1> Hello, Kurkur 👋</h1>
        <p>How is it going on?</p>
        <h1>😀😭😡</h1>
        <h2> Today's Journal</h2>
      </div>
      <VCol cols="8" md="6">
      <div class="right">
        <v-form  ref="form" @submit.onclick="submitForm" enctype="multipart/form-data" style="right: 25px; position: absolute;">
          <v-btn
            depressed
            elevation="2"
            outlined
            plain
            raised
            color="primary"
            type="submit"
              >+ Add Grid Journal
          </v-btn>
        </v-form> 
       </div>
      </VCol>
      <!-- <template #append>
        <div class="me-n3">
          <VBtn
            icon
            color="default"
            size="x-small"
            variant="text"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template> -->
    </VCardItem>
  </VCard>
</template>
