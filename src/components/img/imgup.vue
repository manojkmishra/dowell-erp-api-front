<template>
<div>
    <div class="container">
      <div v-if="files.length">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>
      <v-row no-gutters justify="center" align="center">
         <v-col cols="12">
            <v-file-input v-model="files" small-chips  show-size  multiple clearable @change="inputChanged">
                  <template v-slot:selection="{ text, index, file }">
                    <v-chip  small text-color="white" color="#295671" close @click:close="remove(index)">
                      {{ text }}
                    </v-chip>
                  </template>
                  
            </v-file-input>
        </v-col>
     </v-row>
     <v-row>
      <v-col cols="12" class="pr-5">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
      </v-row>
    <div v-show="previews.length">
        <h5>preview</h5>
       <!-- {{previews.length}} -->
       <v-layout row>
        <div v-for="(image, index) in previews" :key="index">
            <v-flex>
                <img :src="image" height="200" width="200"> 
                <br>
                <v-chip close
                            @click:close="remove(index)"><span class="name" v-text="files[index].name"></span>-
                        <span class="size"  v-text="getFileSize(files[index].size)" ></span>
                        <span ></span>
                </v-chip>
            </v-flex>
        </div>
       </v-layout>

    </div>
    </div> <!----container-finish---------->
 
<div class="block galleryBlock" >
    <v-container>
      <h2 class="text-center">Images</h2>
      <v-row>
        <v-col v-for="(image, index) in getpic" :key="index" class="d-flex child-flex" cols="12" sm="4" md="3">
          <v-card outlined tile class="mx-auto">
            <a :href="`http://54.79.50.225${image.PATH}`">
              <v-img :src="`http://54.79.50.225${image.PATH}`" aspect-ratio="1" class="grey lighten-2">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              </a>
            <v-card-text class="text--primary">
              <div>{{ image.picname }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="teal" @click="delpic(image)" text>Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

    <!------>
</div>
</template>
<script>
import axios from 'axios'

import { mapGetters, mapState, mapActions} from 'vuex';
export default {
    computed: 
      { 
        ...mapState({ selectedsjc: state => state.jobs.selectedsjc, 
                      user: state => state.auth.user,    
                      getpic: state => state.jobs.getpic, 
                    }),
      },
   data: () => ({
    files: [],images: [], previews : [],ress:[],formd:{SJC_NO:''},progress: 0,
  }),
  methods: {
    delpic(x){
      console.log('del',x)
      this.$store.dispatch('delpic', x) 
    },
    
    remove (index) {
      this.files.splice(index, 1)
      this.previews.splice(index, 1)
    },
   inputChanged(e) 
   { // this.files = e.target.files;
      console.log(e)
        console.log('files selected-',this.files)
        this.previews = [];
        this.files.forEach((file, index) => {
          if (!file.type.match('image.*')) 
            {  swal.fire({
                  position: 'bottom-left',
                  title:'<span style="color:white">Only image files allowed</span>',
                  timer: 2000,toast: true, background: 'black', color:'white'
                 });
              this.previews = []; this.files = [];
              return;
            }
            const reader = new FileReader();
            reader.onload = (e) => this.previews.push(e.target.result);
                            reader.readAsDataURL(file);
        });
        console.log('previews=',this.previews)
        console.log('previews len=',this.previews.length)
        console.log('files len=',this.files.length)
      },
getFileSize(size) 
      {   const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
          let i = 0;
          while(size > 900) { size /= 1024; i++; }
          return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
      },
//--------------------------------
       async upload()
       {  console.log('upload this.files=',this.files)
          console.log('upload this.files.len=',this.files.length)
          if(this.files[0]==null)
            {console.log('upload-no files selected')
              swal.fire({
                  position: 'bottom-left',
                  title:'<span style="color:white">Please select files</span>',
                  timer: 2000,toast: true, background: 'black', color:'white'
                 });
            return;
            }
          const formData = new FormData();
          formData.append('sjcid',this.selectedsjc.id);
                    // const sjcid=this.selectedsjc.id;
                    
                    this.files.forEach(file => 
                    {    formData.append('images[]', file, file.name);   });
                    
                    console.log('upload triggered FormData=',formData)
                   // resp=axios.post('http://127.0.0.1:8000/sendemail1',this.formData); 
                   // await axios.post(`${axios.defaults.baseURL}/take5/imagesupload`, formData,
                    await axios.post('take5/imagesupload', formData,
                                { onUploadProgress:uploadEvent=>{ this.progress=Math.round(uploadEvent.loaded/uploadEvent.total*100);
                                       // console.log('upld prges:'+ Math.round(uploadEvent.loaded/uploadEvent.total*100)+'%')
                                    }
                                })
                    //axios.post('https://uat.oms.dowell.com.au/api/imagesupload', formData)
                        .then(response => {
                          this.formd.SJC_NO=this.selectedsjc.id;
                         // let id=this.selectedsjc.id;
                          this.$store.dispatch('getpic', this.formd) 
                         // this.$store.dispatch('getpic', x);
                        //  this.getpic=response.data;
                        //  console.log('all images uploaded',this.ress)

                            this.images = [];
                            this.files = [];
                            this.previews = [];
                            this.progress = 0;
                            })
                        .catch((e) => {
                                    console.log('images error',e)
                                  //  this.$toastr.e('Could not upload the files!');
                                    this.images = [];
                                    this.files = [];
                                    this.previews = [];
                                    this.progress = 0;
                                    });

    },

  }  
}
</script>