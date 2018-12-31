<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="paciente">

    <datosPaciente :id="paciente_id"></datosPaciente>
    <dialog-agregar-registro-medico :id_paciente="paciente_id"></dialog-agregar-registro-medico>
    <tablaRegistrosMedicos :id="paciente_id"></tablaRegistrosMedicos>

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
    //se carga el id del paciente para ser usado por los components
    initialize() {
      this.paciente_id = this.$props.id;
    },
  },

  created() {
    this.initialize()
  },
}

  
</script>