<template>
                <b-form-group>
                    <div class="col-sm-4 pl-0">
                        <b-form-select size="sm" :value="selected" v-model="selected" @change="selectChanged($event)">
                            <option v-for="language in languages" :value="language.id">{{language.name}}</option>
                        </b-form-select>
                    </div>
                </b-form-group>
</template>

<script>
    export default {
      name: 'languages_select',
      data () {
        return {
          languages: {},
          default_language: false,
          selected: null
        }
      },
      methods: {
        selectChanged (event)
        {
          this.$emit('language', event);
        },
        getLanguages ()
        {
          axios.get("/api/languages").then((data) => {
            var s='';
            this.languages=data.data.items;
            this.languages.forEach(function(value) {
              if (value.is_default)
              {
                s=value.id;
              }
            });
            this.default_language=s;
            this.selected=s;
            this.$emit('default-language', s);
          }).catch(error => {
            return false;
          })
        }
      },
      mounted() {
        this.getLanguages();
        this.$eventHub.$on('change-language', event => {
//          this.selected=event?event:this.default_language;
          this.selected=event;
        });
      },
    }
</script>
