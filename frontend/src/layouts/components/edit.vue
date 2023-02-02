<script>
import API from '@/api';
import Swal from 'sweetalert2'

    export default {
        name : 'editJournal',
        props: ['id'],
        data() {
            return {
                post: {
                    journal_title: "",
                    content: "",
                    image: "",
                },
                image: "",
            }
        },
        async created() {
            const response = await API.getPostByID(this.$route.params.id);
            this.post = response;
        },
        methods: {
            // selectFile(file){
            //     this.image = file[0];
            // },
            async updateForm() {
                const formData = new FormData();
                //formData.append('image', this.image);
                formData.append('journal_title', this.post.journal_title);
                formData.append('content', this.post.content);
                //formData.append('old_image', this.post.image);
                console.log(formData);
                Swal.fire( 'Great!', 'Your journal was saved!', 'success')
                if(this.$refs.form.validate()){
                    const response = await API.updatePost(this.$route.params.id, formData);
                    console.log(response);
                    this.$router.push({ name: 'index', params: {message: response.message} });
                }
            }
        }
    }
</script>

<template>
    <div class="main"  style="width: 100%; " >
    <h1> Edit  Journal ✏</h1>
    <br>
    <div class="inner">
    <div :key="post.id">
        <VForm ref="form"  enctype="multipart/form-data">
            <VRow>
            <VCol cols="12" md="15" >
                <VTextField label="Title" v-model="post.journal_title"></VTextField>
            </VCol>
            <VCol cols="12" md="15" >
                <v-textarea label="Content" v-model = "post.content">
                <template v-slot:label>
                    <div> Content </div>
                </template>
                </v-textarea>
            </VCol>
            <VCol cols="12" md="15" >
    <!-- 
            <input type="file" @change="onFileChanged"> -->
            <!-- <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
                    <v-img :src="`/${post.image}`" width="120"></v-img> -->
            </VCol>
            
            <VCol cols="12" class="d-flex gap-4" >
                <router-link
                    to ="/"
                    tag="VBtn"
                >
                    <VBtn type="submit" @click="updateForm()"> SUBMIT </VBtn>
                </router-link>
                <VBtn type="reset" color="secondary" variant="tonal" > Reset </VBtn>
                <v-row justify="center">
                    <v-menu
                        bottom
                        offset-x
                    >
                    </v-menu>

                    <v-dialog
                        v-model="dialog"
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                        scrollable
                    >
                        <v-card tile>
                        <v-toolbar
                            flat
                            dark
                            color="primary"
                        >
                            <v-btn
                            icon
                            dark
                            @click="dialog = false"
                            >
                            <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Settings</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                            <v-btn
                                dark
                                text
                                @click="dialog = false"
                            >
                                Save
                            </v-btn>
                            </v-toolbar-items>
                            <v-menu
                            bottom
                            right
                            offset-y
                            >
                            </v-menu>
                        </v-toolbar>
                        
                        <v-card-text>
                            <v-btn
                            color="primary"
                            dark
                            @click="dialog3 = !dialog3"
                            >
                            SAVE
                            </v-btn>
                            <v-select
                            :items="select"
                            label="A Select List"
                            item-value="text"
                            ></v-select>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            color="primary"
                            text
                            @click="dialog2 = false"
                            >
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog
                        v-model="dialog3"
                        max-width="500px"
                    >
                        <v-card>
                        <v-card-title>
                            <span>Great! Now you can have a coffee.</span>
                            <v-spacer></v-spacer>
                            <v-menu
                            bottom
                            left
                            >
                            </v-menu>
                        </v-card-title>

                        <v-card-actions>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                    </v-row>
            </VCol>
            </VRow>
        </VForm>
            </div>
        </div>
    </div>
</template>
