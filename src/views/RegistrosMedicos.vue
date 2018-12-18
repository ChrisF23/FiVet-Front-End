<template>
  <div class="registros">
    <h1>Registros Medicos</h1>
  </div>
</template>

<script src= '../scripts/RegistrosMedicos'>
</script>

<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Registros Medicos</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn round slot="activator" color="primario darken-1" dark class="mb-2">
          <v-icon small left>add</v-icon>Nuevo Registro
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <!-- Buscar paciente. -->
              <v-autocomplete
                v-model="buscar_paciente"
                :items="pacientes"
                label="Busque un paciente."
                persistent-hint
                prepend-icon="pets"
              >
                <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>
              </v-autocomplete>

              <v-layout row wrap>
                <v-flex>
                  <v-textarea v-model="editedItem.anamnesia" label="Anamnesia"></v-textarea>
                 </v-flex>
                 
              </v-layout>
              <v-layout wrap>
                
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.peso" label="Peso"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.temperatura" label="Temperatura"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.hidratacion" label="Hidratación"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.pulso" label="Pulso"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.frecuencia_cardiaca"
                    label="Frecuencia Cardiaca"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.frecuencia_respiratoria"
                    label="Frecuencia Respiratoria"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.mucosas" label="Mucosas"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.tiempo_de_llenado_capilar"
                    label="Tiempo de llenado capilar"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.ganglios" label="Ganglios"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.reflejo_tusigeno" label="Reflejo Tusigeno"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.reflejo_deglutorio" label="Reflejo Deglutorio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.palpitacion_abdominal"
                    label="Palpitación Abdominal"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.palmopercusion" label="Palmopercusion"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tonsilas" label="Tonsilas"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.conciencia" label="Pulso"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.condicion_corporal" label="Condicion Corporal"></v-text-field>
                </v-flex>

              </v-layout>
               <v-layout wrap>
                   <v-flex md12 lg6>
                  <v-time-picker v-model="e4" color="green lighten-1"></v-time-picker>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
                  </v-flex>
                </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" v-on:click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" v-on:click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="registrosMedicos"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.paciente }}</td>
        <td class="text-xs-left">{{ props.item.anamnesia }}</td>
        <td class="text-xs-left">{{ props.item.fecha }}</td>

        <td class="justify-center layout">
          <v-tooltip top>
            <v-btn
              slot="activator"
              flat
              icon
              color="primario"
              router
              :to="'/registros/'+props.item.id"
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
      </template>
      <template slot="no-data">
        <!-- FIXME: Se puede dar el caso de lista vacia. -->
        <div>Cargando...</div>
      </template>
      <template
        slot="pageText"
        slot-scope="props"
      >Registros {{ props.pageStart }} - {{ props.pageStop }} (Total: {{ props.itemsLength }})</template>
    </v-data-table>
  </div>

</template>
