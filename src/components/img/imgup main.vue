<template>
<div>
    <div class="uploader"  @dragenter="OnDragEnter"  @dragleave="OnDragLeave" @dragover.prevent
        @drop="onDrop"  :class="{ dragging: isDragging }">
        
        <div class="upload-control" v-show="images.length">
            <label for="file">Select files</label>
            <button @click="upload">Upload</button>
        </div>


        <div v-show="!images.length">
            <i class="fa fa-cloud-upload"></i>
            <p>Drag your images OR</p>
            <div class="file-input">
                <label for="file">Select files</label>
                <input type="file" id="file" @change="onInputChange" multiple>
            </div>
        </div>

        <div class="images-preview" v-show="images.length">
            <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                <img :src="image" :alt="`Image Uplaoder ${index}`">
                <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="getFileSize(files[index].size)"></span>
                </div>
            </div>
        </div>
    <div v-show="images.length" class="progress">
        <div
            class="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"  :aria-valuenow="progress"
            aria-valuemin="0"   aria-valuemax="100"
            :style="{ width: progress + '%' }"
        >
        {{ progress}}%
    </div>
    </div>
    </div>
    <div>
<v-layout mt-10>
    <v-flex xs12 sm6 offset-sm3>
             <!-- <img :src="imageUrl" height="150"> -->
             <div mr-10>
              <img v-for="image in savedimages" :src="image" height="150" class="mr-10"/>
             </div>
    </v-flex>
</v-layout>

    </div> 
    </div> 
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState, mapActions} from 'vuex';
export default 
{       computed: 
      { 
        ...mapState({ selectedsjc: state => state.jobs.selectedsjc, 
                      user: state => state.auth.user,    
                    }),
        savedimages(){
            if(this.selectedsjc.PICS !=null)
            console.log('computed savedimages',this.selectedsjc.PICS)
            var xx=JSON.parse(this.selectedsjc.PICS)
            return xx;
        }
      },
    
    
    data: () => ({ isDragging: false, dragCount: 0, files: [],images: [] ,progress:0,savedimages1:'',
imageUrl:'http://54.79.50.225/storage/newpath/1_2020-07-22_1595373303_bulb.png'
}),
    methods: {
        OnDragEnter(e) {    e.preventDefault();
                            this.dragCount++;
                            this.isDragging = true;
                            return false;
                        },
        OnDragLeave(e) {   e.preventDefault();
                            this.dragCount--;
                            if (this.dragCount <= 0)  this.isDragging = false;
                        },
        onInputChange(e) {  const files = e.target.files;
                            console.log('files selected-',files)
                            Array.from(files).forEach(file => this.addImage(file));
                            console.log('files selected2-',files)
                        },
        onDrop(e) {console.log('ondrop-evnt e=',e)
            e.preventDefault();
            e.stopPropagation();
            this.isDragging = false;
            const files = e.dataTransfer.files;
            Array.from(files).forEach(file => this.addImage(file));
        },
        addImage(file) {console.log('addimage file=',file)
                        if (!file.type.match('image.*')) 
                        {  this.$toastr.e(`${file.name} is not an image`);
                                                return;
                                            }
                        this.files.push(file);
                        const img = new Image(),
                        reader = new FileReader();
                        reader.onload = (e) => this.images.push(e.target.result);
                        reader.readAsDataURL(file);
                        console.log('addimage this.images=',this.images)
                    },
        getFileSize(size) { const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
                            let i = 0;
                            while(size > 900) { size /= 1024; i++; }
                            return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
                          },
        upload() {  //this.progress = '0';
                    const formData = new FormData();
                     formData.append('sjcid',this.selectedsjc.id);
                    // const sjcid=this.selectedsjc.id;
                    
                    this.files.forEach(file => 
                    {    formData.append('images[]', file, file.name);   });
                    console.log('upload triggered FormData=',formData)
                   // resp=axios.post('http://127.0.0.1:8000/sendemail1',this.formData); 
                    axios.post('http://127.0.0.1:8000/api/take5/imagesupload', formData,
                   // axios.post('http://54.79.50.225/api/take5/imagesupload', formData,
                                {onUploadProgress:uploadEvent=>{ this.progress=Math.round(uploadEvent.loaded/uploadEvent.total*100);
                                            
                                        console.log('upld prges:'+ Math.round(uploadEvent.loaded/uploadEvent.total*100)+'%')
                                    }
                                })
                    //axios.post('https://uat.oms.dowell.com.au/api/imagesupload', formData)
                        .then(response => {

                          console.log('all images uploaded',response)
                          this.$store.dispatch('selectedsjc', response.data);
                          //var img=;
                        //  this.savedimages1=JSON.parse(response.data.PICS); 
                          //this.savedimages=JSON.parse(response.data); 
                         // console.log('savedimages',this.savedimages1);
                          //  this.$toastr.s('All images uplaoded successfully');
                            this.images = [];
                            this.files = [];
                            this.progress = 0;
                            })
                        .catch((e) => {
                                    console.log('images error',e)
                                  //  this.$toastr.e('Could not upload the files!');
                                    this.images = [];
                                    this.files = [];
                                    this.progress = 0;
                                    });
                                    }
    }
}
</script>

<style lang="scss" scoped>
.uploader {
    width: 100%;
    background: #2196F3;
    color: #fff;
    padding: 10px 10px;
    text-align: center;
    border-radius: 10px;
    border: 3px dashed #fff;
    font-size: 20px;
    position: relative;
    &.dragging {
        background: #fff;
        color: #2196F3;
        border: 3px dashed #2196F3;
        .file-input label { background: #2196F3; color: #fff;  }
    }
    i { font-size: 85px; }
    .file-input {
        width: 200px;
        margin: auto;
        height: 68px;
        position: relative;
        label,
        input {
            background: #fff;
            color: #2196F3;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 10px;
            border-radius: 4px;
            margin-top: 7px;
            cursor: pointer;
        }
        input {opacity: 0; z-index: -2; }
    }
    .images-preview {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .img-wrapper {
            width: 160px;
            display: flex;
            flex-direction: column;
            margin: 10px;
            height: 150px;
            justify-content: space-between;
            background: #fff;
            box-shadow: 5px 5px 20px #3e3737;
            img { max-height: 105px;  }
        }
        .details {
            font-size: 12px;
            background: #fff;
            color: #000;
            display: flex;
            flex-direction: column;
            align-items: self-start;
            padding: 3px 6px;
            .name {
                overflow: hidden;
                height: 18px;
            }
        }
    }
    .upload-control {
        position: absolute;
        width: 100%;
        background: #fff;
        top: 0;
        left: 0;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        padding: 10px;
        padding-bottom: 4px;
        text-align: right;
        button, label {
            background: #2196F3;
            border: 2px solid #03A9F4;
            border-radius: 3px;
            color: #fff;
            font-size: 15px;
            cursor: pointer;
        }
        label {
            padding: 2px 5px;
            margin-right: 10px;
        }
    }
}
</style>