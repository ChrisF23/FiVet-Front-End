<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="cliente">
    <v-card flat class="pa-3">
      <!-- El layout exterior -->
      <v-layout row wrap>
        <!-- El primer layout dentro del layout exterior. Los elementos dentro de el estaran en la misma fila. -->
        <v-layout row>
          <v-flex pa-3 xs1>
            <!-- FIXME: Imagen se ve aplastada. -->
            <v-avatar size="200">
              <img :src="cliente.imageUrl">
            </v-avatar>
          </v-flex>
        </v-layout>

        <!-- El segundo layout dentro del layout exterior. Los elementos dentro de el estaran en la misma columna. -->
        <v-layout column wrap>
          <v-flex pb-2 xs1>
            <div class="caption grey--text">Nombre</div>
            <div>{{ cliente.nombre }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Rut</div>
            <div>{{ cliente.rut }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Telefono</div>
            <div>{{ cliente.telefono }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Email</div>
            <div>{{ cliente.email }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Direccion</div>
            <div>{{ cliente.direccion }}</div>
          </v-flex>
        </v-layout>
      </v-layout>

      <v-btn flat color="warning">
        <v-icon left small>edit</v-icon>Editar
      </v-btn>
      <v-btn flat color="error">
        <v-icon left small>delete</v-icon>Eliminar
      </v-btn>
    </v-card>
  </div>
</template>

<script>
//FIXME.
var clientes = require("../assets/listaClientes").listaClientes;
export default {
  props: ["id"],
  data() {
    return {
      cliente: clientes.find(cli => cli.id === this.id)
    };
  }
};
</script>
