<template>
    <div>
    <ul>
        <li v-for="e in tree.child" :data-id="e.id">
            <span @click="showChild(e)" v-if="level<max_level && e.have_child!==false"><i class="fa" :class="{'fa-minus-square-o': (e.opened),'fa-plus-square-o': (!e.opened)}"></i></span><span v-else><i class="fa fa-minus-square-o"></i></span> <span @click.right="openContext(e,$event)"><i class="fa" :class="{'fa-folder-open-o': (e.opened),'fa-folder-o': (!e.opened)}"></i> {{e.name}}</span>
            <template v-if="e.loaded">
                <div v-show="e.opened">
                    <category :node="e.id" :level="level+1" @empty="onEmptyChild(e)"></category>
                </div>
            </template>
        </li>
    </ul>
    <ul id="categories-context" tabindex="-1" v-if="viewMenu" :style="menu_style" v-clickOutside="clickDocumentHandler">
        <li><a href="" class="nav-link" v-bind:class="{'disabled': edit_disabled}" @click.prevent="edit">Edit</a></li>
        <li><a href="#" class="nav-link" v-bind:class="{'disabled': delete_disabled}" @click.prevent="deleteCategory">Delete</a></li>
        <li><a href="#" class="nav-link" @click.prevent="showCreate" v-bind:class="{'disabled': add_disabled}">Add sub-category</a></li>
    </ul>
        <b-modal size="md" v-model="createModal" @ok="categorySave" @shown="focusInput">
            <template slot="modal-title">{{modalTitle}}</template>
            <languages_select></languages_select>
            <b-row>
                <b-col>
                    <b-form-group>
                        <label for="name">Category name</label>
                        <b-form-input ref="editInput" type="text" id="name" placeholder="Enter category name" v-bind:class="{'is-invalid': name_invalid }" v-model="nameInput"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal>

        <b-modal title="Delete category" size="sm" v-model="deleteModal" @ok="categoryDelete">
            <b-row>
                <b-col sm="8">
                    Are you sure?
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
  import languages_select from './LanguagesSelect.vue';

    export default {
      name: 'category',
      props: ['node','level'],
      components: {languages_select},
      directives: {
        clickOutside: {
          bind: function (el, binding, vnode) {
            el.event = function (event) {
              if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
              }
            };
            document.body.addEventListener('click', el.event)
            document.body.addEventListener('contextmenu', el.event)
          },
          unbind: function (el) {
            document.body.removeEventListener('click', el.event)
            document.body.removeEventListener('contextmenu', el.event)
          },
        },
      },
      data () {
        return {
          selected:'ua',
          max_level: 2,
          tree: {child:{}},
          opened:true,
          loaded:false,
          have_child:true,
          viewMenu: false,
          menu_style: {},
          hideFn: () => {},
          haveToHide: '',
          clicked_item: null,
          delete_disabled: false,
          add_disabled: false,
          deleteModal: false,
          createModal: false,
          editedID: false,
          name_invalid: false,
          nameInput: '',
          modalTitle: ''
        }
      },
      methods: {
        focusInput (e) {
          this.$refs.editInput.focus()
        },
        showCreate () {
          this.nameInput='';
          this.createModal=true;
          this.editedID=false;
          this.name_invalid=false;
          this.modalTitle='Create new';
          this.viewMenu=false;
        },
        edit() {
          if (this.edit_disabled)
          {
            return;
          }
          this.nameInput=this.clicked_item.name;
          this.createModal=true;
          this.name_invalid=false;
          this.modalTitle='Edit';
          this.editedID=this.clicked_item.id;
          this.viewMenu=false;
        },
        deleteCategory()
        {
          if (this.delete_disabled)
          {
            return;
          }
          this.deleteModal=true;
          this.viewMenu=false;
        },
        categorySave(event) {
          let method = '';
          let url = '';
          let parent_id='';
          this.name_invalid = this.nameInput == '';
          if (this.name_invalid) {
            event.preventDefault();
            return false;
          }
          if (!this.editedID) {
            method = 'post';
            url = '/api/category';
            parent_id=this.clicked_item.id;
          }
          else {
            method = 'put';
            parent_id=this.clicked_item.parent_id;
            url = '/api/category/' + this.editedID;
          }
          let promise = axios({
            method: method,
            url: url,
            data: {name: this.nameInput, parent_id: parent_id}
          })

          return promise.then((data) => {
              //this.getCategories(this.node);
            this.$eventHub.$emit('added',parent_id);
          }).catch(error => {

          })
        },
        categoryDelete()
          {
          let promise = axios({
            method:'delete',
            url:'/api/category/'+this.clicked_item.id,
          })

          return promise.then((data) => {
            this.getCategories(this.node);
          }).catch(error => {

          })
        },
        openContext(item,event)
        {
          this.clicked_item=item;
          this.viewMenu=true;
          this.delete_disabled=!((this.level>=this.max_level || item.have_child===false) && item.id!=0);
          this.add_disabled=(this.level>=this.max_level);
          this.edit_disabled=(item.id==0);
          this.$nextTick(function() {
            this.menu_style={
              left: event.clientX+'px', top: event.clientY+'px'
            }
            this.hideFn = this.clickDocumentHandler.bind(this);
            document.addEventListener('mousewheel', this.hideFn);
          }.bind(this));
          event.preventDefault();
        },
        clickDocumentHandler (event) {
          this.viewMenu=false;
        },
        onEmptyChild(item)
        {
          item.have_child=false;
        },
        showChild(item)
        {
          if (this.level>=this.max_level)
          {
            return false;
          }
          item.opened=!item.opened;
          item.loaded=true;
          Object.assign(item, {id:item.id+1});
          Object.assign(item, {id:item.id-1});
        },
        getCategories (parent_id)
        {
          if (parent_id==-1)
          {
            this.tree={child:[{name:'Entire site',id:'0',parent_id:-1,opened:true,loaded:true}]};
            return;
          }
          axios.get("/api/categories/",{params:{parent_id:parent_id}}).then((data) => {
            if (data.data.length==0)
            {
              this.$emit('empty', parent_id)
            }
            this.tree={child:data.data};
          }).catch(error => {
            return false;
          })
        }
      },
      mounted() {
        this.$eventHub.$on('added', event => {
          if (event==this.node)
          {
            this.getCategories(this.node);
          }
        });
        this.getCategories(this.node);
      }
    }
</script>
