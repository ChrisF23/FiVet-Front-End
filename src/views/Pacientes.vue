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
      <dialogoAgregarPaciente></dialogoAgregarPaciente>
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
        <tr @click="editItem(props.item)">
        <td>{{props.item.id}}</td>
        <td>{{ props.item.nombre }}</td>
        <td>{{props.item.numero_chip}}</td>
        <td>{{props.item.especie}}</td>
        <td>{{props.item.raza}}</td>
        <td>{{props.item.color}}</td>
        <td>{{props.item.castrado}}</td>
        
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
        </tr>
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
