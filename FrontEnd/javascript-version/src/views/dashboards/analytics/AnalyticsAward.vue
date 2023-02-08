<script setup>
import { useTheme } from 'vuetify'
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import trophy from '@/assets/images/misc/trophy.png'

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark
})
</script>

<template>
  <VRow>
    <div style="flex-grow: 1; padding: 20px; width: 25%">
      <div style="float: left">
        <UserProfile />
      </div>
      <VRow>
        <VCol cols="1" md="1">
          <VBadge v-bind="avatarBadgeProps" style="float: left; margin-top: 10%">
            <VAvatar color="primary" size="50" variant="tonal">
              <VImg :src="avatar1" />
            </VAvatar>
          </VBadge>
        </VCol>
        <VCol cols="1" md="2">
          <div style="display: table-cell; padding-left: 40%">
            <h3>Kurkur</h3>
            <p>@kurkurcans</p>
          </div>
        </VCol>
      </VRow>
      <VCard>
        <h2>Quotes</h2>
        <VCardText style="box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem">
          <p style="font-style: italic">“Some wishes are only there to teach us how to wait.”</p>
          <p style="font-style: italic; text-align: right">―Mandy Hale”</p>
        </VCardText>
        <VCardText
          class="mt-7"
          style="box-shadow: 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); padding: 1rem; border-radius: 1rem"
        >
          <p style="font-style: italic">
            “Don’t rush into love. You’ll find the person meant for you when you least expect it.”
          </p>
          <p style="font-style: italic; text-align: right">―Franzie Gubatina”</p>
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
