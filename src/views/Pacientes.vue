<template>
  <div class="pacientes">
    <h1>Pacientes</h1>  
   
   
    <v-container>
      <!-- Dentro del siguiente tag se debe agregar el buscador y los metodos de ordenamiento. -->
      <v-layout row class="mb-3">
        <formulario-paciente/>

        <!-- Boton para ordenar por nombre. -->
        <v-btn small flat color="grey" @click="ordenarPor('nombre')">
          <v-icon small left>sort_by_alpha</v-icon>
          <span class="caption text-lowercase">por Nombre</span>
        </v-btn>
      </v-layout>

      <!-- Renderiza una tarjeta por cada paciente en la listaPacientes -->
      <v-card flat class="pa-3" v-for="paciente in listaPacientes" :key="paciente.id">
        <v-layout row wrap>
          <!-- Columnas -->
          <v-flex xs6 md3>
            <div class="caption grey--text">Nombre</div>
            <div>{{ paciente.nombre }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Dueño</div>
 
            <!-- FIXME: llamar a nombre de dueño a traves de id -->
            <div>{{ paciente.duenio }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Especie</div>
            <div>{{ paciente.especie }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Sexo</div>
            <div>{{ paciente.sexo }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Castrado</div>
            <div>{{ paciente.castrado }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Fecha de Nacimiento</div>
            
            <!-- FIXME: obtención por ultimo registro -->
            <div>{{ paciente.fechaNacimiento }}</div>
          </v-flex>

          <!-- Boton para ingresar al detalle del paciente. TODO. -->
          <v-flex xs1 sm1>
            <!-- No es la mejor forma de linkear. FIXME. -->
            <v-btn small flat icon color="warning" router :to="'/pacientes/'+paciente.id">
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
          </v-flex>

        </v-layout>
      </v-card>
    </v-container>
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
      listaPacientes : pacientes
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
