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
export default {
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
      //Al inicializar, cargar la lista de pacientes.
      initialize() {
        this.$http.get('http://localhost:3000/api/registros/')
          .then(function (response) {
            this.registrosMedicos = response.body;
          });
        this.search = '';
      },
    },

    created() {
      this.initialize()
    },
}
</script>
