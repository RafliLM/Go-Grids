<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Anna',
            calories: 159,
          },
          {
            name: 'Diana',
            calories: 237,
          },
          {
            name: 'Aziz',
            calories: 262,
          },
          {
            name: 'Fanny',
            calories: 305,
          },
          {
            name: 'Faza',
            calories: 356,
          },
          {
            name: 'Gefi',
            calories: 375,
          },
          {
            name: 'Nabil A',
            calories: 392,
          },
          {
            name: 'Rafli',
            calories: 408,
          },
          {
            name: 'Rifatia',
            calories: 452,
          },
          {
            name: 'Rijal',
            calories: 518,
          },
          {
            name: 'Syahda',
            calories: 550,
          },
        ],
      }
    },
  }
</script>

<template>
  <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th width="300px">
          <h3>
            Timestemp
          </h3>
        </th>
        <th>
          <h3>
            Content
          </h3>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>