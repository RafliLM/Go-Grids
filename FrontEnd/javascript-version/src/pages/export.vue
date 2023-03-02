<script setup>
import TableBasic from '@/views/user-interface/tables/TableBasic.vue'
import TableDark from '@/views/user-interface/tables/TableDark.vue'
import TableDensity from '@/views/user-interface/tables/TableDensity.vue'
import TableHeight from '@/views/user-interface/tables/TableHeight.vue'
import TableFixedHeader from '@/views/user-interface/tables/TableFixedHeader.vue'
</script>

<template>
<VCard>
    <div style="padding-top: 30px; posis" >
        <h4 style="padding-left: 25px ;" class="text-h4 font-weight-bold" >
        Export to PDF 📂
        </h4>
        <p style="padding-left: 25px ;">
        Export all your journal to PDF
        </p>
    </div>
    <VCol style="padding-top: 10px ; padding-left: 25px" cols="12">
      <VCard>
        <button style="background-color: #14162E; border-radius: 8px; height: 40px; width: 150px; ;">
            <a style="color: white;">
                generate to PDF
            </a>
        </button>
      </VCard>
    </VCol>
    <VRow>
        <!-- basic -->
        <VCol cols="12">
        <VCard style="padding-left: 25px;">
            <TableDark />
        </VCard>
        </VCol>
    </VRow>
</VCard>
</template>