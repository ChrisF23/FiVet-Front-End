<template>
  <div class="inicio">
    <v-combobox
      v-model="paciente_seleccionado"
      :items="pacienteNombreRutClientes"
      label="Seleccione Cliente"
      :rules="rules.no_vacio"
      v-if="!clienteNuevo"
    ></v-combobox>
    <div>
    <tablaRegistrosMedicosReactive :id="null"></tablaRegistrosMedicosReactive>
    
    </div>
  </div>
</template>

<script>
import common_rules from "../scripts/rules";
import tablaRegistrosMedicosReactive from '../components/tablaRegistrosMedicosReactive';

export default {

  components :{
    tablaRegistrosMedicosReactive
  },

  data: function() {
    return {
      valid: true,
      clienteNuevo: false,
      dialog: false,

      clientes: [],
      cliente_seleccionado: [],
      nombreRutClientes: [],
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

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {
    // a computed getter
    cliente_a_guardar: function() {
      // `this` points to the vm instance
      return this.clientes.filter(
        cliente => cliente.rut == this.cliente_seleccionado.split(" ")[1]
      )[0].id;
    }
  },

  methods: {
    initialize() {
    }
  }
};
</script>
