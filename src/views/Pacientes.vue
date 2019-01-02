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

    <v-card>
      <v-dialog v-model="dialogoDetalle" >
        <detallePaciente :id="id_paciente"></detallePaciente>
        <v-btn flat icon color="yellow" @click="redireccionDetallePaciente()">
          <v-icon left small>delete</v-icon>Mas detalles
        </v-btn>
      </v-dialog>
    </v-card>

    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="filteredPacientes()"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
    >
      <template slot="items" slot-scope="props">
        <tr @click="redireccionDetallePaciente(props.item.id)">
          <td>{{ props.item.nombre }}</td>
          <td>{{props.item.Cliente.nombre}} {{props.item.Cliente.apellido_p}} ({{props.item.Cliente.rut}})</td>
          <td>{{props.item.especie}}</td>
          <td>{{props.item.raza}}</td>
          <td>{{props.item.color}}</td>
          <td v-if="props.item.castrado">{{'Si'}}</td>
          <td v-else>{{'No'}}</td>
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
