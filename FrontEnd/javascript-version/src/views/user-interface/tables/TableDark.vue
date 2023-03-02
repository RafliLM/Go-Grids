<template>
  <div>
    <table class="bordered">
      <thead>
        <tr style="color: black;">
          <th>Timestamp</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dessert in desserts" :key="dessert.name">
          <td>{{ dessert.name }}</td>
          <td>{{ dessert.calories }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <br>
</template>

<style>
.bordered {
  border-collapse: collapse;
}

.bordered th,
.bordered td {
  border: 3px solid #000000;
  padding: 10px;
  padding-left: 50px;
  text-align: start;
  color: #000000;
}
</style>

<script>
export default {
  data() {
    return {
      desserts: [
        { name: 'Anna', calories: 159 },
        { name: 'Diana', calories: 237 },
        { name: 'Aziz', calories: 262 },
        { name: 'Fanny', calories: 305 },
        { name: 'Faza', calories: 356 },
        { name: 'Gefi', calories: 375 },
        { name: 'Nabil A', calories: 392 },
        { name: 'Rafli', calories: 408 },
        { name: 'Rifatia', calories: 452 },
        { name: 'Rijal', calories: 518 },
        { name: 'Syahda', calories: 550 },
      ],
    };
  },
};
</script>
