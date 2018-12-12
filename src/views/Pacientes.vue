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
  // Importar la lista de pacientes. 
// Este json se deberia obtener desde la base de datos. FIXME.
var pacientes = require('../assets/listaPacientes').listaPacientes;

import formularioPaciente from '../forms/FormularioPaciente'

export default {
  components : {
    formularioPaciente
  },
  data() {
    return {
      // La lista de pacientes.
      listaPacientes : pacientes,
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

  methods: {
    ordenarPor(atributo) {
      this.listaPacientes.sort((c1, c2) => c1[atributo] < c2[atributo] ? -1 : 1);
      
    },

    // No implementado.
    buscar (_nombre){
      return this.listaPacientes.filter(paciente => {
        if (_nombre)
        return paciente.nombre === _nombre;
      })
    }
  }
};
</script>
