<script>
import TableBasic from '@/views/user-interface/tables/TableBasic.vue'
import TableDark from '@/views/user-interface/tables/TableDark.vue'
import TableDensity from '@/views/user-interface/tables/TableDensity.vue'
import TableHeight from '@/views/user-interface/tables/TableHeight.vue'
import TableFixedHeader from '@/views/user-interface/tables/TableFixedHeader.vue'

import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2'

export default{
  name : 'exportGoGrid',
  components : {
    TableDark
  },
  data(){
    return {
      name: ''
    };
  },
  methods: {
    downloadPDF() {
      var doc = new jsPDF({
        format: [1000,1000]
      });
      console.log(document)
      console.log(document.querySelector("#exportGoGrid"))
      html2canvas(document.querySelector("#exportGoGrid"), {
        width: doc.internal.pageSize.getWidth(),
        height: doc.internal.pageSize.getHeight()
      }).then(async canvas => {
        let pdfName = 'GoGrid'; 
        const img = canvas.toDataURL("image/png")
        doc.addImage(img, "PNG", 10, 10, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight())
        doc.save(pdfName + '.pdf')
        await Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'PDF has been generated',
          showConfirmButton: false,
          timer: 1500
        })
      })
        .catch(async err => {
          await Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'An error occured',
            showConfirmButton: false,
            timer: 1500
          })
        });
            
    }
  }
}

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
    <VCol style="padding-top: 10px ; padding-left: 25px" cols="12">
      <VCard>
        <button @click.stop="downloadPDF()" style="background-color: #14162E; border-radius: 8px; height: 40px; width: 150px; ;">
            <a style="color: white;">
                generate to PDF
            </a>
        </button>
      </VCard>
    </VCol>
    

    
    <VRow>
        <!-- basic -->
        <VCol cols="12">
        <VCard style="padding-left: 25px;">
            <div id="exportGoGrid">
                <TableDark />
            </div>
        </VCard>
        </VCol>
    </VRow>
    
</VCard>
</template>