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
    <VRow>
        <!-- basic -->
        <VCol cols="12">
        <VCard>
            <TableDark />
        </VCard>
        </VCol>
    </VRow>
</VCard>
</template>