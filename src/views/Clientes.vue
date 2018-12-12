<!-- 
Mejor opcion! Reemplazar el container por un data-table.
Ver: https://vuetifyjs.com/en/components/data-tables.
 -->
<template>
  <div class="clientes">
    <h1>Clientes</h1>
    <v-layout row wrap>
      <v-data-table :headers="atributosCliente" :items="listaClientes" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.nombre }}</td>
          <td class="text-xs-left">{{ props.item.rut }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.telefono }}</td>
          <td class="text-xs-left">{{ props.item.direccion }}</td>
        </template>
      </v-data-table>

      <formulario-cliente/>
    </v-layout>
  </div>
</template>

<script>
// Importar la lista de clientes.
// Este json se deberia obtener desde la base de datos. FIXME.
var clientes = require("../assets/listaClientes").listaClientes;

import formularioCliente from "../forms/FormularioCliente";

export default {
  components: {
    formularioCliente
  },
  data() {
    return {
      // La lista de clientes.
      listaClientes: clientes,
      atributosCliente: [
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "RUT", value: "rut", sortable: true },
        { text: "Email", value: "email", sortable: true },
        { text: "Telefono", value: "telefono", sortable: true },
        { text: "Direccion", value: "direccion", sortable: true }
      ]
    };
  },

  methods: {
    ordenarPor(atributo) {
      this.listaClientes.sort((c1, c2) =>
        c1[atributo] < c2[atributo] ? -1 : 1
      );
    },

    // No implementado.
    buscar(_nombre) {
      return this.listaClientes.filter(cliente => {
        if (_nombre) return cliente.nombre === _nombre;
      });
    }
  }
};
</script>
