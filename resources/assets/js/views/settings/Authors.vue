<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <c-table striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Site languages"></c-table>
            </b-col><!--/.col-->
        </b-row>
    </div>

</template>

<script>
  import cTable from './AuthorsTable.vue'

  export default {
    name: 'authors',
    components: {cTable}
  }
</script>
