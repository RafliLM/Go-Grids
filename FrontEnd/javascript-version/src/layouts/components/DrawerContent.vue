<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <Transition name="vertical-nav-app-title">
        <img src="gglogo.png" style="height: 100px; margin-top: 10px; margin-left: auto; margin-right: auto;">
        <!-- <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          Materio
        </h1> -->
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul style="margin-top: 25px;">
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Journals',
        to: 'journals',
        icon: { icon: 'mdi-notebook-outline' }
      }"
    />
    <!-- <VerticalNavLink
      :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' }
      }"
    /> -->
    <VerticalNavLink
      :item="{
        title: 'Calendar',
        to: 'calendar',
        icon: { icon: 'mdi-table' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Timeline',
        to: 'tables',
        icon: { icon: 'mdi-chart-timeline-variant' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Export',
        to: 'form-layouts',
        icon: { icon: 'mdi-tray-arrow-up' }
      }"
    />
  </ul>

  <!-- 👉 illustration -->
  <!-- <a
    href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="upgradeBanner"
      alt="upgrade-banner"
      transition="scale-transition"
      class="upgrade-banner mx-auto"
      style="max-width: 230px"
    >
  </a> -->
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
