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
// Importar la lista de clientes. 
// Este json se deberia obtener desde la base de datos. FIXME.
//var clientes = require('../assets/listaClientes').listaClientes;
const axios = require('axios');


import formularioCliente from '../forms/FormularioCliente'

export default {
  components : {
    formularioCliente
  },
  data() {
    return {
      // La lista de clientes.
      listaClientes : [],
      errors: []
    };
  },
// Fetches posts when the component is created.
  created() {
    axios.get(`http://localhost:3000/api/clientes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.listaClientes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  mounted() {
    axios.get(`http://localhost:3000/api/clientes`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.listaClientes = response.data
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
