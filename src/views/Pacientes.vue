<script src= '../scripts/Pacientes'>
</script>

<template>
  <div>
    <v-card>
      <v-card-title class="headline">Pacientes
        <v-spacer></v-spacer>

        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>

        <v-spacer></v-spacer>

        <!-- Inicio formulario -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-btn round slot="activator" color="primario darken-1" dark class="mb-2">
            <v-icon small left>add</v-icon>Nuevo Paciente
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
                      <v-text-field v-model="editedItem.numero_chip" label="Numero de chip"></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.especie" label="Especie" required></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.raza" label="Raza"></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.color" label="Color"></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-select
                        v-model="editedItem.castrado"
                        :items="['Si', 'No']"
                        label="Castrado:"
                        outline
                      ></v-select>
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
      </v-card-title>
    </v-card>

    <!-- Fin formulario -->
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="pacientes"
      :search="search"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
    >
      <template slot="items" slot-scope="props">
        <td>{{props.item.id}}</td>
        <td>{{ props.item.nombre }}</td>
        <td>{{props.item.numero_chip}}</td>
        <td>{{props.item.especie}}</td>
        <td>{{props.item.raza}}</td>
        <td>{{props.item.color}}</td>
        <td>{{props.item.castrado}}</td>

        <!-- 
          id: '',
        nombre: '',
        numero_chip: '',
        especie: '',
        raza: '',
        color: '',
        castrado: ''
        -->
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <v-btn
              slot="activator"
              flat
              icon
              color="primario"
              router
              :to="'/pacientes/'+props.item.id"
            >
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
            <span>Ver detalle</span>
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
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="info"
        icon="info"
      >No se encontraron resultados para tu busqueda.</v-alert>
      <template slot="no-data">
        <div>Cargando...</div>
      </template>
      <template
        slot="pageText"
        slot-scope="props"
      >Pacientes {{ props.pageStart }} - {{ props.pageStop }} (Total: {{ props.itemsLength }})</template>
    </v-data-table>
  </div>
</template>
