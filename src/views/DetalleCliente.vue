<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="cliente"></div>
</template>

<script src= '../scripts/DetalleCliente'>
</script>

<template>
  <v-card flat class="pa-3">
    <!-- El layout exterior -->
    <v-layout row wrap>
      <!-- El segundo layout dentro del layout exterior. Los elementos dentro de el estaran en la misma columna. -->
      <v-layout column wrap>
        <v-flex pb-2 xs1>
          <div class="caption grey--text">Nombre</div>
          <div>{{ this.cliente.nombre }}</div>
        </v-flex>

        <v-flex pb-2 xs1>
          <div class="caption grey--text">Rut</div>
          <div>{{ this.cliente.rut }}</div>
        </v-flex>

        <v-flex pb-2 xs1>
          <div class="caption grey--text">Telefono</div>
          <div>{{ this.cliente.telefono }}</div>
        </v-flex>

        <v-flex pb-2 xs1>
          <div class="caption grey--text">Email</div>
          <div>{{ this.cliente.email }}</div>
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
</template>
