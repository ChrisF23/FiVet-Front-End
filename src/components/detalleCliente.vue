<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="cliente"></div>
</template>

<script src= '../scripts/DetalleCliente'>
</script>

<template>
  <div flat class="pa-3">
    <!-- El layout exterior -->
      <!-- El segundo layout dentro del layout exterior. Los elementos dentro de el estaran en la misma columna. -->
      <div v-if="editing">
        <v-container grid-list-md>
        <v-layout row wrap>
        <v-btn @click="remove" color="red" dark>
          <v-icon left small>delete</v-icon>Eliminar
        </v-btn>
        </v-layout>
          <v-layout row wrap>
            <v-flex>
              <v-text-field v-model="cliente.nombre" label="Nombre"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="cliente.rut" label="Rut"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="cliente.telefono" label="Teléfono"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="cliente.email" label="Email"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="cliente.direccion" label="Dirección"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-btn @click="save" color="green" dark>
            <v-icon left small>save</v-icon>GUARDAR
          </v-btn>
          <v-btn @click="cancel" color="red" dark>
            <v-icon left small>cancel</v-icon>CANCELAR
          </v-btn>
          </v-layout row wrap>
        </v-container>
      </div>
      <div v-else>
        <v-layout row wrap pa-5 justify-center align-center>
          <v-flex>
            <div class="caption grey--text">Nombre</div>
            <div>{{ this.cliente.nombre }}</div>
          </v-flex>

          <v-flex>
            <div class="caption grey--text">Rut</div>
            <div>{{ this.cliente.rut }}</div>
          </v-flex>

          <v-flex >
            <div class="caption grey--text">Telefono</div>
            <div>{{ this.cliente.telefono }}</div>
          </v-flex>

          <v-flex >
            <div class="caption grey--text">Email</div>
            <div>{{ this.cliente.email }}</div>
          </v-flex>

          <v-flex>
            <div class="caption grey--text">Direccion</div>
            <div>{{ cliente.direccion }}</div>
          </v-flex>
        </v-layout>

        <v-layout row justify-end>
          <v-btn @click="edit" color="warning">
            <v-icon left absolute small>edit</v-icon>Editar
          </v-btn>
        </v-layout>
      </div>
  </div>
</template>

