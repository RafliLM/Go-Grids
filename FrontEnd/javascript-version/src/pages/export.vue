<script setup>
import TableBasic from '@/views/user-interface/tables/TableBasic.vue'
import TableDark from '@/views/user-interface/tables/TableDark.vue'
import TableDensity from '@/views/user-interface/tables/TableDensity.vue'
import TableHeight from '@/views/user-interface/tables/TableHeight.vue'
import TableFixedHeader from '@/views/user-interface/tables/TableFixedHeader.vue'
</script>

<template>
  <VRow>
    <!-- basic -->
    <VCol cols="12">
      <VCard style="padding-left: 28px;">
    <button style="background-color: #14162E; border-radius: 8px; height: 40px; width: 150px; ;">
        <a style="color: white;">
            generate to PDF
        </a>
    </button>
      </VCard>
    </VCol>
  </VRow>
</template>