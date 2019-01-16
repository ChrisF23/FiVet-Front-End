<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="paciente">
    <datosPaciente :id="paciente_id"></datosPaciente>

    <v-card>
      <v-layout row align-center>
        <v-flex>
          <v-card-title class="headline ml-1">Registros Médicos
          
          </v-card-title>
        </v-flex>
        <!-- Inicio formulario -->
        <v-spacer></v-spacer>
        <v-flex>
          <v-layout row justify-end>
            <dialog-agregar-registro-medico :id_paciente="paciente_id" class="mr-3"></dialog-agregar-registro-medico>
          </v-layout>
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