<!-- 
Mejor opcion! Reemplazar el container por un data-table.
Ver: https://vuetifyjs.com/en/components/data-tables.
 -->
<template>
  <div class="clientes">
    <h1>Clientes</h1>

    <v-container>
      <!-- Dentro del siguiente tag se debe agregar el buscador y los metodos de ordenamiento. -->
      <v-layout row class="mb-3">
        <formulario-cliente/>

        <!-- Boton para ordenar por nombre. -->
        <v-btn small flat color="grey" @click="ordenarPor('nombre')">
          <v-icon small left>sort_by_alpha</v-icon>
          <span class="caption text-lowercase">por Nombre</span>
        </v-btn>
      </v-layout>

      <!-- Renderiza una tarjeta por cada cliente en la listaClientes -->
      <v-card flat class="pa-3" v-for="cliente in listaClientes" :key="cliente.id">
        <v-layout row wrap>
          <!-- Columnas -->
          <v-flex xs6 md3>
            <div class="caption grey--text">Nombre</div>
            <div>{{ cliente.nombre }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Rut</div>
            <div>{{ cliente.rut }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Telefono</div>
            <div>{{ cliente.telefono }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Email</div>
            <div>{{ cliente.email }}</div>
          </v-flex>

          <v-flex xs6 md2>
            <div class="caption grey--text">Direccion</div>
            <div>{{ cliente.direccion }}</div>
          </v-flex>

          <!-- Boton para ingresar al detalle del cliente. TODO. -->
          <v-flex xs1 sm1>
            <!-- No es la mejor forma de linkear. FIXME. -->
            <v-btn small flat icon color="warning" router :to="'/clientes/'+cliente.id">
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
var clientes = require('../assets/listaClientes').listaClientes;

import formularioCliente from '../forms/FormularioCliente'

export default {
  components : {
    formularioCliente
  },
  data() {
    return {
      // La lista de clientes.
      listaClientes : clientes
    };
  },

  methods: {
    ordenarPor(atributo) {
      this.listaClientes.sort((c1, c2) => c1[atributo] < c2[atributo] ? -1 : 1);
      
    },

    // No implementado.
    buscar (_nombre){
      return this.listaClientes.filter(cliente => {
        if (_nombre)
        return cliente.nombre === _nombre;
      })
    }
  }
};
</script>
