<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="paciente">

    <datosPaciente :id="paciente_id"></datosPaciente>
    <!-- FIXME: Debe enviarse un evento para recargar la tabla de registros -->
    <dialog-agregar-registro-medico :id_paciente="paciente_id"></dialog-agregar-registro-medico>
    <tablaRegistrosMedicos :id="paciente_id" v-on:db_updatet="initialize"></tablaRegistrosMedicos>

  </div>
</template>

<script>

import tablaRegistrosMedicos from '../components/tablaRegistrosMedicos'
import datosPaciente from '../components/detalleEdicionPaciente'
import dialogAgregarRegistroMedico from '../components/agregarRegistroMedico'
export default {
  props: {
        id: Number
    },

  components :{
    tablaRegistrosMedicos,
    datosPaciente,
    dialogAgregarRegistroMedico,
  },

  data: () => ({
      update_db: false,
      paciente_id: null,
      paciente: null,
    }),

  watch: {
    dialog(val) {
      val || this.close()
    }
  },


  methods: {
    //Al inicializar, cargar la lista de registros.
    initialize() {
      this.paciente_id = this.$props.id;
    },
  },

  created() {
    this.initialize()
  },
}

  
</script>