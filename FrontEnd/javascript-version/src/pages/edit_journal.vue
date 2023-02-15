<template>
<div>
<!-- <div v-else> -->
    <CRow class="mt-2">
        <CCol :sm="6">
            <CCard>
                <CCardBody>
                        <CCardText>
                            <CFormTextarea>
                                Today's Mood
                            </CFormTextarea>
                        </CCardText>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <CRow class="mt-2 mb-4">
        <CCol :sm="6">
            <CCard>
                <CCardBody>
                        <CCardText>
                            <CFormTextarea>
                                Content
                            </CFormTextarea>
                        </CCardText>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <v-form  ref="form" @submit.onclick="submitForm" enctype="multipart/form-data" style="right: 800px; position: absolute;">
        <v-btn
        depressed
        elevation="2"
        outlined
        plain
        raised
        color="primary"
        type="submit"
        height="50"
        width="120"
        >SUBMIT
        </v-btn>
    </v-form>

    <v-form  ref="form" @submit.onclick="submitForm" enctype="multipart/form-data" style="right: 600px; position: absolute;">
        <v-btn
        depressed
        elevation="2"
        outlined
        plain
        raised
        color="primary"
        type="submit"
        height="50"
        width="120"
        >RESET
        </v-btn>
    </v-form>
</div>
</template>