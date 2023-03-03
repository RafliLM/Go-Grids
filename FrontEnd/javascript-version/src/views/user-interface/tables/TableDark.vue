<template>
  <div>
    <table class="bordered">
      <thead>
        <tr>
          <th class="left-align">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="center-align">Content</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <table class="bordered">
      <thead>
        <tr>
          <th class="left-align">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="center-align">Content</td>
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
  border: 1.5px solid black;
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
