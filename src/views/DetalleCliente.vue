<!-- FIXME: Hacer que ambos layouts queden mas unidos. -->
<template>
  <div class="cliente"></div>
</template>

<script src= '../scripts/DetalleCliente'>
</script>

<template>
<div>
  <v-card flat class="pa-3">
    <!-- El layout exterior -->
      <!-- El segundo layout dentro del layout exterior. Los elementos dentro de el estaran en la misma columna. -->
      <div v-if="editing">
        <v-layout row justify-center>
          <v-flex pl-2 xs4>
              <v-text-field
                  v-model="cliente.nombre"
                  label="Nombre"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex pl-2 xs4>
              <v-text-field
                  v-model="cliente.rut"
                  label="Rut"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex pl-2 xs4>
              <v-text-field
                  v-model="cliente.telefono"
                  label="Teléfono"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex pl-2 xs4>
              <v-text-field
                  v-model="cliente.email"
                  label="Email"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex pl-2 xs4>
              <v-text-field
                  v-model="cliente.direccion"
                  label="Dirección"
                  required
              ></v-text-field>
            </v-flex>
        </v-layout>
      </div>  
      <div v-else>
        <v-layout row justify-center>
          <v-flex ml-1 mr-1 v-for="(data, key) of computedClienteData()">
            <div class="caption grey--text">{{key}}</div>
            <div>{{data}}</div>
          </v-flex>
        </v-layout>
      </div>

    <div v-if="editing">
    <v-btn @click="save" color="green" >
        <v-icon top left absolute small>save</v-icon>
        GUARDAR
      </v-btn>
      <v-btn @click="cancel" color="error" >
        <v-icon left absolute small>remove_circle</v-icon>CANCELAR
      </v-btn>
    </div>
    <div v-else>
    <v-btn @click="edit" color="warning">
      <v-icon left absolute  small>edit</v-icon>Editar
    </v-btn>
    </div>
  </v-card>
  </div>
</template>
