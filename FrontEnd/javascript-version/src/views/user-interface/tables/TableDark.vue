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
      
      axios
        .get(`http://103.172.204.236:5000/api/journal/all`, config)

        .then(response => {
          this.journals = response.data;
          console.log(response.data);
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
    v-for="journal in journals"
    class="bordered">
      <thead>
        <tr> 
          <th class="left-align" v-if="journal.date">{{ journal.date.slice(0,10) }}</th>
        </tr>
      </thead>
      <tbody  v-for="(grid,index) in journal.grid"
      :key="index">
        <tr>
          <td class="left-align">{{ grid.answer }}</td>
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
