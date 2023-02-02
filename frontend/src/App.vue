<!-- <script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
        name: 'app',
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        }
    }
import BuyNow from '@core/components/BuyNow.vue'
</script> -->

<template>
  <div id="app">
    <!-- <DrawerContent/> -->
    <ckeditor></ckeditor>
  </div>
<VApp>
  <VLayout class="layout-wrapper layout-nav-type-vertical">
    <RouterView />
  </VLayout>
</VApp>
</template>

<!-- <script>
import DrawerContent from './layouts/components/DrawerContent.vue'
export default {
  components: {
    DrawerContent
  }
}
</script> -->