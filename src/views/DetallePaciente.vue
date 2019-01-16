<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="paciente">
    <datosPaciente :id="paciente_id"></datosPaciente>

    <v-card>
    <v-layout row allign-center>
    <v-flex>
      <v-card-title class="headline">Registros Médicos
      
        </v-card-title>
    </v-flex>
    <v-flex>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Nombre de paciente, Raza, Nombre del dueño, etc..."
          single-line
          hide-details
        ></v-text-field>
        
</v-flex>
        <!-- Inicio formulario -->
        <v-spacer></v-spacer>
        <v-flex>
        
        <dialog-agregar-registro-medico :id_paciente="paciente_id"></dialog-agregar-registro-medico>
      </v-flex>
      
      </v-layout>
      <tablaRegistrosMedicosReactive :id="paciente_id" :registroInicial="registroInicial"></tablaRegistrosMedicosReactive>
    </v-card>
     
    
    
  </div>
</template>

<script>
import tablaRegistrosMedicosReactive from "../components/tablaRegistrosMedicosReactive";
import datosPaciente from "../components/detalleEdicionPaciente";
import dialogAgregarRegistroMedico from "../components/agregarRegistroMedico";
export default {
  props: {
    id: null,
    registroInicial: null
  },

  beforeCreate: function() {
    //if (!this.$session.exists()) {
      //Desactivado mientras estemos en desarrollo
      //this.$router.push("/login");
    //}
  },

  components: {
    tablaRegistrosMedicosReactive,
    datosPaciente,
    dialogAgregarRegistroMedico
  },

  data: () => ({
    registroInicial: null,
    update_db: false,
    paciente_id: null,
    paciente: null
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    //se carga el id del paciente para ser usado por los components
    initialize() {
      this.paciente_id = this.$props.id;
      this.registroInicial = this.$props.registroInicial;
    }
  },

  created() {
    this.initialize();
  }
};
</script>