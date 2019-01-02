<template>
  <div class="inicio">
    <v-combobox
      :items="pacienteNombreRutClientes"
      label="Buscar Paciente"
      v-model="PacienteSelected"
    ></v-combobox>
    <div>
    <tablaRegistrosMedicos :id="null"></tablaRegistrosMedicos>
    </div>
  </div>
</template>

<script>
import common_rules from "../scripts/rules";
import tablaRegistrosMedicos from '../components/tablaRegistrosMedicos';

export default {

  components :{
    tablaRegistrosMedicos
  },

  data: function() {
    return {
      valid: true,
      clienteNuevo: false,
      dialog: false,
      pacienteSelected: "",

      clientes: [],
      cliente_seleccionado: [],
      // Formato: nombre_paciente (nombre_cliente rut_cliente)
      pacienteNombreRutClientes: [], 
      rules: common_rules.common_rules,

      //En esta variable se guardan las responses de la request en caso de error
      debug_response: "",

      pacientes: null,

      paciente: {
        nombre: "",
        especie: "",
        raza: "",
        castrado: "No",
        id_cliente: ""
      },

      pacienteDefault: {
        nombre: "",
        especie: "",
        raza: "",
        castrado: "No",
        id_cliente: ""
      },

      //concatenacion del nombre y rut del cliente seleccionado
      cliente_seleccionado: "",

      cliente: {
        rut: "",
        nombre: "",
        apellido_p: "",
        email: "",
        telefono: ""
      }
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$http
        .get("http://localhost:3000/api/pacientes/")
        .then(function(response) {
          this.clientes = response.body;
          this.pacienteNombreRutClientes = response.body.map(function(item) {
            return item.nombre + " (" + item.Cliente.nombre + " " + item.Cliente.apellido_p + " " + item.Cliente.rut + ")";
          });
        });
    }
  },

  computed: {
    PacienteSelected: {
      get: function() {
        return 
      },
      set: function(newValue) {
        this.pacienteSelected = newValue;
      }
    }
  }
};
</script>
