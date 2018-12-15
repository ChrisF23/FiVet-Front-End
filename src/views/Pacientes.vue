<template>
  <div class="pacientes">
    <h1>Pacientes</h1>  
   
  <v-layout column>
      <v-data-table :headers="atributosPaciente" :items="listaPacientes" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.nombre }}</td>
          <td class="text-xs-left">{{ props.item.duenio }}</td>
          <td class="text-xs-left">{{ props.item.especie }}</td>
          <td class="text-xs-left">{{ props.item.sexo }}</td>
          <td class="text-xs-left">{{ props.item.castrado }}</td>
          <td class="text-xs-left">{{ props.item.fechaNacimiento }}</td>
        </template>
      </v-data-table>
    </v-layout>
    <formulario-paciente/>
  </div>
</template>
<script>
// Importar la lista de Pacientes. 
// Este json se deberia obtener desde la base de datos. FIXME.
//var clientes = require('../assets/listaClientes').listaClientes;
const axios = require('axios');


import formularioPaciente from '../forms/FormularioPaciente'

export default {
  components : {
    formularioPaciente
  },
  data() {
    return {
      // La lista de pacientes.
      listaPacientes : [],
       atributosPaciente: [
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Dueño", value: "duenio", sortable: true },
        { text: "Especie", value: "especie", sortable: true },
        { text: "Sexo", value: "sexo", sortable: true },
        { text: "Castrado", value: "castrado", sortable: true },
        { text: "Fecha de Nacimiento", value: "fechaNacimiento", sortable: true }
      ]
    };
  },
// Fetches posts when the component is created.
  created() {
    axios.get(`http://localhost:3000/api/pacientes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.listaPacientes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  mounted() {
    axios.get(`http://localhost:3000/api/pacientes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.listaPacientes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    actualizarLista(){
      
    }
  }
};
</script>
