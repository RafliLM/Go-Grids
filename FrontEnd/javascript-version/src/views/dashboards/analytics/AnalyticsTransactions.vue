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

<style type="text/css">
.jarak{
  margin-top: -20px;
}
.satu {
  font-size: 70px;
}
</style>

<template>
  <!-- Hallo Kurkur -->
  <VCard>
    <VCardItem>
      <div class="pt-5 main" style="width: 200%">
        <h1 class="pl-5">
          Hello, Kurkur 👋
        </h1>
        <p class="pl-5">How do you feel today?</p>
        <a href="\" class="satu">
        😀😭😡
        </a>

        <h2 class="pl-5">Today's Journal</h2>
      </div>
      <VCol cols="8" md="6">
        <div class="right">
          <v-row justify="center" style="right: 200px; position: absolute">
            <v-dialog v-model="dialog" persistent width="1024">
              <template v-slot:activator="{ props }">
                <v-btn class="button-AddGrid" color="primary" v-bind="props"> + Add Grid Journal </v-btn>
              </template>
              <v-card height="44rem">
                <v-card-title class="pl-10">
                  <h1>Add Journal ✏️</h1>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field class="input-Title" label="Title" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea class="input-Content"
                          label="Content"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-form ref="form" enctype="multipart/form-data" style="right: 48px; position: absolute; margin-top: -12px" class="jarak">
                          <!-- <v-spacer></v-spacer> -->
                          <v-btn class="button-SubmitJournal"
                            color="#ffffff"
                            size="large"
                            type="submit"
                            variant="text"
                            @click="dialog = true"
                            style="right: 860px; position: absolute; background-color: #14162e"
                          >
                            CONFIRM
                          </v-btn>
                          <v-btn class="button-CancelJournal"
                            color="#ffffff"
                            variant="text"
                            size="large"
                            @click="dialog = false"
                            style="right: 760px; position: absolute; background-color: #808080"
                          >
                            CANCEL
                          </v-btn>
                          <br />
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
          <v-form ref="form" enctype="multipart/form-data" style="right: 48px; position: absolute; margin-top: -12px">
            <v-btn 
            outlined 
            plain 
            raised 
            depressed 
            elevation="2" 
            type="submit" 
            variant="#ffffff" 
            color="black"
            >
              <strong>DELETE ALL</strong>
            </v-btn>
          </v-form>
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