<template>
  <b-card :header="caption">
    <b-row>
      <b-col sm="12" align="right" class="mb-3"><b-button variant="primary" @click="showCreate()">Create new</b-button></b-col>
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
    <b-modal size="md" v-model="createModal" @ok="save" @shown="focusInput">
      <template slot="modal-title">{{modalTitle}}</template>
      <b-row>
        <b-col>
          <b-form-group>
            <label for="name">Collection name</label>
            <b-form-input ref="editInput" type="text" id="name" placeholder="Enter collection name" v-bind:class="{'is-invalid': name_invalid }" v-model="nameInput"></b-form-input>
          </b-form-group>
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
        modalTitle: ''
      }
    },
    methods: {
      focusInput (e) {
        this.$refs.editInput.focus()
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
      showCreate () {
        this.nameInput='';
        this.createModal=true;
        this.editedID=false;
        this.name_invalid=false;
        this.modalTitle='Create new';
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
    }
  }
</script>
