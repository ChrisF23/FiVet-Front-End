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
      <div v-if="editing">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="cliente.nombre" label="Nombre"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="cliente.rut" label="Rut"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="cliente.telefono" label="Teléfono"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="cliente.email" label="Email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="cliente.direccion" label="Dirección"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <div v-else>
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
      </div>
    </v-layout>

    <div v-if="editing">
      <v-btn @click="save" flat color="primary" dark>
        <v-icon left small>check_circle</v-icon>Aceptar
      </v-btn>
      <v-btn @click="cancel" flat color="error" dark>
        <v-icon left small>remove_circle</v-icon>Cancelar
      </v-btn>
    </div>
    <div v-else>
      <v-btn @click="edit" flat color="warning">
        <v-icon left small>edit</v-icon>Editar
      </v-btn>
      <v-btn @click="remove" flat color="error">
        <v-icon left small>delete</v-icon>Eliminar
      </v-btn>
    </div>
  </v-card>
</template>

