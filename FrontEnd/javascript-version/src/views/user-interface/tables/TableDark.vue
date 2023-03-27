<script>
import axios from 'axios'

export default {
  data() {
    return {
      journals: {
        grid : [],
        date: ''

      } // mengganti variabel journal menjadi journals
    };
  },
  methods: {
    getJournals() {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const currentDate = new Date().toISOString().substr(0, 10);
      axios
        .get(`//localhost:5000/api/journal/${currentDate}`, config)
        .then(response => {
          this.journals = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getJournals()
  },
}
</script>

<template>
  <div>
    <table 
    v-if="journals != null"
    v-for="(grid, index) in journals.grid"
    :key="index"
    class="bordered">
      <thead>
        <tr>
          <th class="left-align">{{ journals.date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="center-align">{{ grid.question }}</td>
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
  border: 0px solid black;
  padding: 20px;
  padding-left: 20px;
  color: black;
}

.left-align {
  text-align: left;
}

.center-align {
  text-align: center;
}
</style>
