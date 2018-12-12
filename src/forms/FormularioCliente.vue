<template>
  <v-layout justify-end>
    <!-- Se crea un enlace con el dialogo a traves de v-model="dialog" -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn round slot="activator" color="primario darken-1" dark>
        <v-icon left>add</v-icon>Agregar Cliente
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Nombres"
                  v-model="tf_nombres"
                  required
                  :rules="this.reglasNombre"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  label="Apellidos"
                  v-model="tf_apellidos"
                  required
                  :rules="this.reglasApellido"
                ></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field
                  label="Rut"
                  v-model="tf_rut"
                  hint="12.345.678-0"
                  required
                  :rules="this.reglasRut"
                ></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field label="Telefono" v-model="tf_telefono" hint="+56X XXXXXXXX"></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field label="Email" v-model="tf_email"></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field label="Direccion" v-model="tf_direccion" hint="Calle #XXXX"></v-text-field>
              </v-flex>
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

    reglasNombre: [v => !!v || "Se requiere un nombre."],
    reglasApellido: [v => !!v || "Se requiere un apellido."],
    reglasRut: [v => !!v || "Se requiere un rut."]
  }),

  methods: {
  }
};
</script>

