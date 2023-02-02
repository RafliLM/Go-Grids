<script setup>
import DrawerContent from '../layouts/components/DrawerContent.vue'
import edit from '../layouts/components/edit.vue'
import { VerticalNavLayout } from '@layouts'
// Components
import Footer from '@/layouts/components/Footer.vue'
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar>
      <VSpacer />
    </template>

    <!-- 👉 Drawer content -->
    <template #navigation-drawer-content>
      <DrawerContent />
    </template>

    <div class="layout-page-content">
        <edit />
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>
<script>
export default {
  name: 'edit',
}
</script>