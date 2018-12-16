<template>
  <div class="registros">
    <h1>Registros Medicos</h1>
  </div>
</template>

<script src= '../scripts/Clientes'>
</script>

<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Clientes</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="600px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Cliente</v-btn>
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
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" v-on:click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" v-on:click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="clientes"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
    >
      <template slot="items" slot-scope="props">
        <td>{{props.item.id}}</td>
        <td>{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.apellido_paterno }}</td>
        <td class="text-xs-left">{{ props.item.apellido_materno }}</td>

        <td class="text-xs-left">{{ props.item.rut }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.telefono }}</td>
        <td class="text-xs-left">{{ props.item.direccion }}</td>
        <td class="justify-center layout px-0">
          <v-btn flat icon color="warning" @click="editItem(props.item)"> 
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="error" @click="deleteItem(props.item)"> 
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <div>Cargando...</div>
      </template>
      <template
        slot="pageText"
        slot-scope="props"
      >Clientes {{ props.pageStart }} - {{ props.pageStop }} (Total: {{ props.itemsLength }})</template>
    </v-data-table>
  </div>
</template>
