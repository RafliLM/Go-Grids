<script>
export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>
<template>
  <div class="d-flex justify-space-around">
    <VMenu style="width: 1000px">
      <template v-slot:activator="{ props }">
        <VBtn
          icon
          variant="text"
          color="default"
          class="me-2"
          size="small"
          v-bind="props"
        >
          <VIcon
            icon="mdi-bell-outline"
            size="24"
          />
        </VBtn>
      </template>
      <VList style="width: 300px;">
          <!-- 👉 User Avatar & Name -->
          <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        </VList>
    </VMenu>
  </div>
</template>