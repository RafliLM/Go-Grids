<template>
  <div>
    <table class="bordered">
      <thead>
        <tr>
          <th style="text-align: center;" >Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;" >Content</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <table class="bordered">
      <thead>
        <tr>
          <th style="text-align: center;" >Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;" >Content</td>
        </tr>
      </tbody>
    </table>
  </div>
  <br>
</template>

<script>
export default {
  name: 'MyTable',
}
</script>

<style>
.bordered {
  border-collapse: collapse;
}

.bordered th,
.bordered td {
  border: 1.5px solid #000000;
  padding: 20px;
  padding-left: 20px;
  color: #000000;
}
</style>
