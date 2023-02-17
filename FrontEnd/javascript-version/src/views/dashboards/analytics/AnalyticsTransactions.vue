<!--<script setup>
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
</script>-->

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>

<template>
  <!-- Hallo Kurkur -->
  <VCard>
    <VCardItem>
      <div class="main" style="width: 200%">
        <h1>Hello, Kurkur 👋</h1>
        <p>How is it going on?</p>
        <h1>😀😭😡</h1>
        <h2>Today's Journal</h2>
      </div>
      <VCol cols="8" md="6">
        <div class="right">
          <v-row justify="center" style="right: 60px; position: absolute">
            <v-dialog v-model="dialog" persistent width="1024">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> + Add Grid Journal </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <h1>Add Journal ✏️</h1>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Tuday's Goal" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          label="Hari ini saya akan mengerjakan tugas mata kuliah Analisis Perancangan Perangkat Lunak"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions class="mx-8">
                  <!-- <v-spacer></v-spacer> -->
                  <v-btn
                    color="#ffffff"
                    variant="text"
                    @click="dialog = true"
                    style="right: 900px; position: absolute; background-color: #14162e"
                  >
                    SUBMIT
                  </v-btn>
                  <v-btn
                    color="#ffffff"
                    variant="text"
                    @click="dialog = false"
                    style="right: 800px; position: absolute; background-color: #808080"
                  >
                    CANCEL
                  </v-btn>
                  <br />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <!-- <v-form  ref="form" enctype="multipart/form-data" style="right: 25px; position: absolute;">
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
        </v-form>  -->
        </div>
      </VCol>
    </VCardItem>
  </VCard>
</template>

<!--<template #append>
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
</template>-->