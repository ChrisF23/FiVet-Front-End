<template>
  <div>
    <v-data-table :headers="headers" :items="registrosMedicos" class="elevation-1">
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">No hay registros para mostrar</v-alert>
      </template>
      <template slot="items" slot-scope="props">
      <tr @click="redireccionPaciente(props.item.Paciente.id)"> 
        <td>{{ props.item.patologia }}</td>
        <td>{{ props.item.motivo }}</td>
        <td>{{ props.item.anamnesis }}</td>
        <td>{{ props.item.fecha_creacion }}</td>
      </tr>  
      </template>
    </v-data-table>
  </div>
</template>

<script>
const utils = require("../Utils");
export default {
  props: {
    id: Number
  },

  data: function() {
    return {
      id_paciente: "",
      valid: false,
      dialog: false,
      search: "",
      headers: [
        { text: "Patologia", value: "patologia", sortable: true },
        { text: "Motivo", value: "motivo", sortable: true },
        { text: "Anamnesis", value: "anamnesis", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true }
      ],

      registrosMedicos: [],

      rows_per_page_text: "Registros por pagina:",
      rows_per_page_items: [5, 10, 20, { text: "Todos", value: -1 }]
    };
  },

  methods: {
    //Al inicializar, cargar la lista de registros.
    initialize() {
      this.$http
        .get("http://localhost:3000/api/registros")
        .then(function(response) {
          if(this.$props.id == undefined || this.$props.id == null){
            this.registrosMedicos = response.body;
          } else {
            //this.registrosMedicos = response.body
            response.body.forEach(rm => {
              if (rm.id_paciente == this.$props.id) {
                this.registrosMedicos.push(rm);
              }
            });
          }
        });
      this.search = "";
    },

    redireccionPaciente(id) {
      this.$router.push('/pacientes/'+id)
      this.valid = true;
      this.id_paciente = id;
    }

  },

  created() {
    this.initialize();
  },

  mounted() {
    this.$root.$on("db_update", data => {
      this.initialize();
    });

  }


 
};
</script>
