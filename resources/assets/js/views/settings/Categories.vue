<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>Categories</strong>
                    </div>
                    <b-row>
                        <b-col sm="12">
                            <category :node="-1" :level="-1"></category>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>

  import category from './Category.vue';

  export default {
    name: 'categories',
    data () {
      return {
      }
    },
    components: {category},

  }
</script>
