<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDeleteOutline } from '@mdi/js'

export default {
  name: 'my-component',
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiDeleteOutline,
    }
  },
}
</script>

<template>
  <div style="padding-top: 30px">
    <h4
      style="padding-left: 25px"
      class="text-h4 font-weight-bold"
    >
      Timeline⌛
    </h4>
    <p style="padding-left: 25px">Look your upcoming event here</p>
  </div>

  <VCol>
    <VRow style="padding-left: 25px; padding-bottom: 20px; padding-top: 10px">
      <p
        style="
          background-color: #14162e;
          color: white;
          width: 130px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
        09 May 2023
      </p>
      <p
        style="
          padding-left: 20px;
          color: black;
          height: 30px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
        Faza's birthday
      </p>
      <svg-icon
        type="mdi"
        :path="path"
        style="box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); cursor: pointer; right: 48px; position: absolute; margin-top: 1px; color: black"
        href=","
      ></svg-icon>
    </VRow>
    <VRow style="padding-left: 25px; padding-bottom: 20px">
      <p
        style="
          background-color: #14162e;
          color: white;
          width: 130px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
        12 May 2023
      </p>
      <p
        style="
          padding-left: 20px;
          color: black;
          height: 30px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
        Anna's birthday
      </p>
      <svg-icon
        type="mdi"
        :path="path"
        style="box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); cursor: pointer; right: 48px; position: absolute; margin-top: 1px; color: black"
        href=","
      ></svg-icon>
    </VRow>
    <VRow style="padding-left: 25px">
      <p
        style="
          background-color: #14162e;
          color: white;
          width: 130px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
        20 May 2023
      </p>
      <p
        style="
          padding-left: 20px;
          color: black;
          height: 30px;
          display: flex;
          justify-content: center;
          height: 30px;
          align-items: center;
        "
      >
        Gempi's birthday
      </p>
      <svg-icon
        type="mdi"
        :path="path"
        style="box-shadow: 0 0 0.5rem 0.5rem hsl(0 0% 0% / 10%); cursor: pointer; right: 48px; position: absolute; margin-top: 1px; color: black"
        href=","
      ></svg-icon>
    </VRow>
  </VCol>
</template>
