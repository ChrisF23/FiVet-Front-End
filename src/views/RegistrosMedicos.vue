<template>
import bridge from './vue-temp/vue-editor-bridge';
  <div class="registros">
    <h1>Registros Medicos</h1>    
  </div>
</template>

<script>
  export default {
  }
</script>

<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Registros Medicos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Registro</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text >
            <v-container grid-list-md >
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
                  <v-text-field v-model="editedItem.frecuencia_cardiaca" label="Frecuencia Cardiaca"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.frecuencia_respiratoria" label="Frecuencia Respiratoria"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.mucosas" label="Mucosas"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tiempo_de_llenado_capilar" label="Tiempo de llenado capilar"></v-text-field>
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
                  <v-text-field v-model="editedItem.palpitacion_abdominal" label="Palpitación Abdominal"></v-text-field>
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
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" v-on:click="close()">Cancelar</v-btn>
            <v-btn color="blue darken-1" @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data"></template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Registro Médico',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Paciente', value: 'paciente' },
        { text: 'Fecha', value: 'fecha' }
      ],
      registrosMedicos: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        paciente_id: '',
        cliente_id: '',
        fecha: '',
        anamnesia: '',
        peso: 0,
        temperatura: 0,
        hidratacion: '',
        pulso: 0,
        frecuencia_cardiaca: 0,
        frecuencia_respiratoria: 0,
        mucosas: 0,
        tiempo_de_llenado_capilar:0,
        ganglios: '',
        reflejo_tusigeno: '',
        reflejo_deglutorio: '',
        palpitacion_abdominal: '',
        palmopercusion: '',
        condicion_corporal:'',
        tonsilas:'',
        conciencia:''
      
      },
      defaultItem: {
         id: '',
        paciente_id: '',
        cliente_id: '',
        fecha: '',
        anamnesia: '',
        peso: 0,
        temperatura: 0,
        hidratacion: '',
        pulso: 0,
        frecuencia_cardiaca: 0,
        frecuencia_respiratoria: 0,
        mucosas: 0,
        tiempo_de_llenado_capilar:0,
        ganglios: '',
        reflejo_tusigeno: '',
        reflejo_deglutorio: '',
        palpitacion_abdominal: '',
        palmopercusion: '',
        condicion_corporal:'',
        tonsilas:'',
        conciencia:''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          this.$http.get('http://localhost:3000/api/registroMedico')
            .then(function(response) {
              console.log(response)
          });
        }
      },

      editItem (item) {
        this.editedIndex = this.registrosMedicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.registrosMedicos.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.registrosMedicos.splice(index, 1)
      },

      close: function() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.registrosMedicos[this.editedIndex], this.editedItem)
        } else {
          this.registrosMedicos.push(this.editedItem)
        }
        this.close()
      }
    }
  
</script>