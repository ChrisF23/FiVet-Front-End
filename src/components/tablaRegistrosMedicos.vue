<template>
  
  <v-data-table
    :headers="headers"
    :items="registrosMedicos"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.anamnesia }}</td>
      <td>{{ props.item.fecha }}</td>
    </template>
  </v-data-table>
</template>

<script>

import '../Utils';
export default {

  props: {
        id: Number
    },

  data: function() {
      return  {
      valid: false,
      dialog: false,
      search: '',
      headers: [
        { text: "Anamnesia", value: "anamnesia", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true },
      ],

      registrosMedicos: [],
      
      rows_per_page_text: "Registros por pagina:",
      rows_per_page_items: [5, 10, 20, { 'text': 'Todos', 'value': -1 }]
      }
    },

    methods: {
      //Al inicializar, cargar la lista de registros.
      initialize() {
        this.$http.get(api + '/registros')
          .then(function (response) {
            //this.registrosMedicos = response.body
            response.body.forEach(rm => {if (rm.paciente_id == this.$props.id) {this.registrosMedicos.push(rm)}});
          });
        this.search = '';
      },
    },

    created() {
      this.initialize()
    },
}
</script>
