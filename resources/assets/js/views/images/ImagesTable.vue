<style>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }
  div.file-listing img{
    max-width: 100%;
  }

  div.file-listing {
    padding: 8px;
    text-align: center;
    height: 110px;
    overflow: hidden;
    margin-bottom: 8px;
    position: relative;
  }

  div.file-listing .delete-div {
    color: #fff;
    background: #802020;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 18px;
    height: 18px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
  }

  div.file-listing .delete-div-cross {
    position: absolute;
    color: #fff;
    top: 5px;
    left: 9px;
  }

    #file-drag-drop{
         display: block;
         height: 200px;
         width: 100%;
         background: #ccc;
         margin: auto;
         margin-top: 10px;
         text-align: center;
         line-height: 200px;
         border-radius: 4px;
      border: 2px solid #ccc;
  }

  #file-drag-drop.hover{
    border: 2px dashed #aaa;
    background: #eee;
  }

  #file-drag-drop *
  {
    pointer-events: none;
  }

  .files-preview
  {
    padding: 0 8px;
  }

</style>

<template>
  <b-card :header="caption">
    <b-row>
      <b-col sm="12" align="right" class="mb-3"><b-button variant="primary" @click="showUpload()">Upload new</b-button></b-col>
    </b-row>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="itemsProvider" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="table">
      <template slot="action" slot-scope="data">
          <b-badge variant="primary" href="#" size="sm" @click.prevent="edit(data.item)">Edit</b-badge>
          <b-badge variant="danger" href="#" size="sm" @click.prevent="deleteItem(data.item)">Delete</b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="rowCount" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
    <b-modal size="lg" v-model="createModal" @ok="submitFiles">
      <template slot="modal-title">Upload Image(s)</template>
      <b-row class="files-preview">
        <b-col>
          <b-form-group>
            <div id="file-drag-drop" v-bind:class="{'hover': hoveredDrop }" ref="fileform" v-on:click="addFiles()">
              <span class="drop-files">Click or drop the files here!</span>
            </div>
            <input type="file" id="fileInput" ref="files" accept="image/*" v-on:change="handleFilesUpload()" :plain="true" multiple/>
          </b-form-group>
          <b-row>
          <b-col v-for="(file, key) in files" :key=key class="col-lg-2 col-md-2 col-sm-3 file-listing">
            <div class="delete-div"></div>
            <div class="delete-div-cross" @click.prevent="removeImage(key)"><i class="fa fa-times fa-lg"></i></div>
            <img class="preview" v-bind:ref="'image'+parseInt( key )"/>
          </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal title="Delete collection" size="sm" v-model="deleteModal" @ok="deleteCollection">
      <b-row>
        <b-col sm="8">
          Are you sure?
        </b-col>
      </b-row>
    </b-modal>

  </b-card>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */

  export default {
    name: 'c-table',
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        fields: [
          {key: 'name'},
          {key: 'action'}
        ],
        hoveredDrop: false,
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        rowCount: 0,
        nameInput: '',
        createModal: false,
        deleteModal: false,
        editedID: false,
        deleteID: false,
        name_invalid: false,
        modalTitle: '',
        files: [],
        showPreview: false,
        imagePreview: '',
        dragAndDropCapable: false
      }
    },
    methods: {
      determineDragAndDropCapable(){
        var div = document.createElement('div');
        return ( ( 'draggable' in div )
            || ( 'ondragstart' in div && 'ondrop' in div ) )
            && 'FormData' in window
            && 'FileReader' in window;
      },
      focusInput (e) {
        this.$refs.editInput.focus()
      },
      submitFiles(event){
        if (this.files.length==0)
        {
          event.preventDefault();
          return false;
        }
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
        }
        axios.post( '/api/image/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        ).then(function(){
          console.log('SUCCESS!!');
        })
            .catch(function(){
              console.log('FAILURE!!');
            });
      },
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          if ( /\.(jpe?g|png|gif)$/i.test( uploadedFiles[i].name ) ) {
            this.files.push(uploadedFiles[i]);
          }
        }
        this.getImagePreviews();
      },
      getImagePreviews(){
        for( let i = 0; i < this.files.length; i++ ){
          if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
            let reader = new FileReader();
            reader.addEventListener("load", function(){
              this.$refs['image'+parseInt( i )][0].src = reader.result;
            }.bind(this), false);
            reader.readAsDataURL( this.files[i] );
          }
        }
      },
      addFiles(){
        this.$refs.files.click();
      },
      itemsProvider (ctx) {

        let promise = axios.get('/api/collections',{params:{page:ctx.currentPage,count:ctx.perPage}})

        return promise.then((data) => {
          const items = data.data.items
          this.rowCount=data.data.count
          return(items)
        }).catch(error => {
          return []
        })
      },
      showUpload () {
        this.createModal=true;
        this.files=[];
      },
      edit(item) {
        this.nameInput=item.name;
        this.createModal=true;
        this.editedID=item.id;
        this.name_invalid=false;
        this.modalTitle='Edit';
      },
      deleteItem(item) {
        this.deleteModal=true;
        this.deleteID=item.id;
      },
      removeImage(item)
      {
        console.log(item);
        this.files.splice(item,1);
      },
      save(event) {
        let method = '';
        let url = '';
        this.name_invalid = this.nameInput == '';
        if (this.name_invalid) {
          event.preventDefault();
          return false;
        }
        if (!this.editedID) {
          method = 'post';
          url = '/api/collection';
        }
        else {
          method = 'put';
          url = '/api/collection/' + this.editedID;
        }

        let promise = axios({
          method: method,
          url: url,
          data: {name: this.nameInput}
        })

        return promise.then((data) => {
          this.$refs.table.refresh();
        }).catch(error => {

        })
      },
        deleteCollection(event) {
          let promise = axios({
            method:'delete',
            url:'/api/collection/'+this.deleteID,
          })

          return promise.then((data) => {
            this.$refs.table.refresh();
          }).catch(error => {

          })
      }
    },
    mounted(){
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      if( this.dragAndDropCapable ){
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
          this.$refs.fileform.addEventListener(evt, function(e){
            if (e.type=='dragenter') {
              this.hoveredDrop=true;
            }
            if (e.type=='dragleave') {
              this.hoveredDrop=false;
            }
            e.preventDefault();
            e.stopPropagation();
          }.bind(this), false);
        }.bind(this));
        this.$refs.fileform.addEventListener('drop', function(e){
          this.hoveredDrop=false;
          for( let i = 0; i < e.dataTransfer.files.length; i++ ){

              if ( /\.(jpe?g|png|gif)$/i.test( e.dataTransfer.files[i].name ) ) {
                this.files.push( e.dataTransfer.files[i] );
              }
            this.getImagePreviews();
          }
        }.bind(this));
      }
    }
  }
</script>
