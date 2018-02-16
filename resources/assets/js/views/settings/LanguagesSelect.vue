<template>
                <b-form-group>
                    <div class="col-sm-4 pl-0">
                        <b-form-select size="sm" :value="selected">
                            <option v-for="language in languages" :value="language.token" v-bind:selected="{'selected': language.is_default==1}">{{language.name}}</option>
                        </b-form-select>
                    </div>
                </b-form-group>
</template>

<script>
    export default {
      name: 'languages_select',
      props: [],
      data () {
        return {
          languages: {},
          selected: null,
        }
      },
      methods: {
        getLanguages ()
        {
          axios.get("/api/languages/").then((data) => {
            this.languages=data.data.items;
          }).catch(error => {
            return false;
          })
        }
      },
      mounted() {
        this.getLanguages();
      }
    }
</script>
