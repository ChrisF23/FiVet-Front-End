<template>
  <v-layout row justify-center>
    <!-- Se crea un enlace con el dialogo a traves de v-model="dialog" -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn round slot="activator" color="primario darken-1" dark>
        <v-icon left>add</v-icon>Agregar Paciente
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Paciente</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Nombre"
                  v-model="tf_nombre"
                  required
                  :rules="this.reglasNombre"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  label="Especie"
                  v-model="tf_especie"
                  required
                  :rules="this.reglasEspecie"
                ></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field label="Raza" v-model="tf_raza"></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field label="Color" v-model="tf_color"></v-text-field>
              </v-flex>
              
              <v-flex xs6>
                <v-text-field label="Número de Chip" v-model="tf_id"></v-text-field>
              </v-flex>
              
              
              <v-flex xs12 sm6 d-flex>
                <v-select
                  :items="items"
                  label="Castrado:"
                  outline
                ></v-select>
              </v-flex>


              <!-- Corregir: Poner la ultima fecha de registro medico -->
              <v-date-picker label="Ultima Visita:" v-model="ultimaVisitaInput" :reactive="reactive" ></v-date-picker> 
              
              

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success darken-1" flat @click="dialog = false">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  // Validaciones + submit.
  // Ver: https://vuetifyjs.com/en/components/forms#examples.
  data: () => ({
    dialog: false,
    valid: false,

    items: ['Si', 'No'],

    reglasNombre: [v => !!v || "Se requiere un nombre."],
    reglasEspecie: [v => !!v || "Especifique una especie."]
  }),

  methods: {
  }
};
</script>

