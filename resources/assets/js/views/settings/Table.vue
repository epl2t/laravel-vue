<template>
  <b-card :header="caption">
    <b-row>
      <b-col sm="12" align="right" class="mb-3"><b-button variant="primary" @click="showCreate()">Create new</b-button></b-col>
    </b-row>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="itemsProvider" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="table">
      <template slot="action" slot-scope="data" v-if="data.item.is_default!=1">
          <b-badge variant="primary" href="#" size="sm" @click.prevent="edit(data.item)">Edit</b-badge>
          <b-badge variant="danger" href="#" size="sm" @click.prevent="deleteItem(data.item)">Delete</b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="rowCount" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
    <b-modal title="Modal title" size="md" v-model="createModal" @ok="languageSave" @shown="focusInput">
      <b-row>
        <b-col sm="8">
          <b-form-group>
            <label for="name">Language name</label>
            <b-form-input ref="editInput" type="text" id="name" placeholder="Enter language name" v-bind:class="{'is-invalid': name_invalid }" v-model="languageInput"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group>
            <label for="token">Language token</label>
            <b-form-input type="text" id="token" placeholder="Language token" v-bind:class="{'is-invalid': token_invalid }" v-model="tokenInput"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

    </b-modal>
    <b-modal title="Delete language" size="sm" v-model="deleteModal" @ok="languageDelete">
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
          {key: 'token'},
          {key: 'action'}
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        rowCount: 0,
        languageInput: '',
        tokenInput: '',
        createModal: false,
        deleteModal: false,
        editedID: false,
        deleteID: false,
        token_invalid: false,
        name_invalid: false
      }
    },
    methods: {
      focusInput (e) {
        this.$refs.editInput.focus()
      },
      itemsProvider (ctx) {

        let promise = axios.get('/api/languages',{params:{page:ctx.currentPage,count:ctx.perPage}})

        return promise.then((data) => {
          const items = data.data.items
          this.rowCount=data.data.count
          return(items)
        }).catch(error => {
          return []
        })
      },
      showCreate () {
        this.languageInput='';
        this.tokenInput='';
        this.createModal=true;
        this.editedID=false;
        this.token_invalid=false;
        this.name_invalid=false;
      },
      edit(item) {
        this.languageInput=item.name;
        this.tokenInput=item.token;
        this.createModal=true;
        this.editedID=item.id;
        this.token_invalid=false;
        this.name_invalid=false;
      },
      deleteItem(item) {
        this.deleteModal=true;
        this.deleteID=item.id;
      },
      languageSave(event) {
        let method = '';
        let url = '';
        this.token_invalid = this.tokenInput == '';
        this.name_invalid = this.languageInput == '';
        if (this.token_invalid || this.name_invalid) {
          event.preventDefault();
          return false;
        }
        if (!this.editedID) {
          method = 'post';
          url = '/api/language';
        }
        else {
          method = 'put';
          url = '/api/language/' + this.editedID;
        }

        let promise = axios({
          method: method,
          url: url,
          data: {name: this.languageInput, token: this.tokenInput}
        })

        return promise.then((data) => {
          this.$refs.table.refresh();
        }).catch(error => {

        })
      },
        languageDelete(event) {
          let promise = axios({
            method:'delete',
            url:'/api/language/'+this.deleteID,
          })

          return promise.then((data) => {
            this.$refs.table.refresh();
          }).catch(error => {

          })
      }
    }
  }
</script>
