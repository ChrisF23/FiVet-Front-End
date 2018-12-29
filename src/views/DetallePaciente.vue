<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="paciente">

    <datosPaciente :id="paciente_id"></datosPaciente>
    <tablaRegistrosMedicos :id="paciente_id"></tablaRegistrosMedicos>

  </div>
</template>

<script>

import tablaRegistrosMedicos from '../components/tablaRegistrosMedicos'
import datosPaciente from '../components/detalleEdicionPaciente'
export default {
  props: {
        id: Number
    },

  components :{
    tablaRegistrosMedicos,
    datosPaciente
  },

  data: () => ({
      paciente_id: null,
      paciente: null,
    }),

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