<script src= '../scripts/Clientes'>
</script>

<template>
  <div>
    <v-card>
      <v-card-title class="headline">Clientes
        <v-spacer></v-spacer>

        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>

        <v-spacer></v-spacer>

        <!-- Inicio formulario -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-btn slot="activator" color="purple" dark class="mb-2">
            <v-icon small left>add</v-icon>Nuevo Cliente
          </v-btn>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-form v-model="valid">
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.nombre" label="Nombre" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.apellido_paterno"
                        label="Apellido paterno"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.apellido_materno" label="Apellido materno"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.rut" label="Rut" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.direccion" label="Direccion"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-layout justify-center>
                <v-btn right color="error" v-on:click="close">Cancelar</v-btn>
                <v-btn left color="info" v-on:click="save">Guardar</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
    </v-card>

    <!-- Fin formulario -->
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="clientes"
      :search="search"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
    >
      <template slot="items" slot-scope="props">
        <tr @click="abrirDetallePaciente(props.item.id)">
          <td>{{props.item.id}}</td>
          <td>{{ props.item.nombre }}</td>
          <td class="text-xs-left">{{ props.item.apellido_paterno }}</td>
          <td class="text-xs-left">{{ props.item.apellido_materno }}</td>

          <td class="text-xs-left">{{ props.item.rut }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.telefono }}</td>
          <td class="text-xs-left">{{ props.item.direccion }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <v-btn
                slot="activator"
                flat
                icon
                color="primario"
                router
                :to="'/clientes/'+props.item.id"
              >
                <v-icon>remove_red_eye</v-icon>
              </v-btn>
              <span>Ir al detalle</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn slot="activator" flat icon color="warning" @click="editItem(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>Editar</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn slot="activator" flat icon color="error" @click="deleteItem(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
              <span>Eliminar</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="info"
        icon="info"
      >No se encontraron resultados para tu busqueda.</v-alert>
      <template slot="no-data">
        <div v-if="hayDatos()">Cargando...</div>
        <div v-else>No hay datos.</div>
      </template>
      <template
        slot="pageText"
        slot-scope="props"
      >Clientes {{ props.pageStart }} - {{ props.pageStop }} (Total: {{ props.itemsLength }})</template>
    </v-data-table>
  </div>
</template>
