<template>
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
                <v-text-field
                  v-model="paciente.nombre"
                  label="Nombre"
                  :rules="rules.no_vacio"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="paciente.numero_chip" label="Numero de chip"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="paciente.especie" label="Especie" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="paciente.raza" label="Raza"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="paciente.color" label="Color"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-select
                  v-model="paciente.castrado"
                  :items="['Si', 'No']"
                  label="Castrado:"
                  outline
                ></v-select>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex xs12>
                <v-combobox
                  v-model="select"
                  :items="clientes"
                  label="Seleccione Cliente"
                  :rules="rules.no_vacio"
                  v-if="!clienteNuevo"
                ></v-combobox>
                <v-btn
                  color="purple"
                  dark
                  v-on:click="clienteNuevo=true"
                  v-if="!clienteNuevo"
                >El cliente es nuevo</v-btn>
              </v-flex>

              <v-flex xs12 sm6 md4 v-if="clienteNuevo">
                <v-text-field
                  v-model="cliente.nombre"
                  label="Nombre cliente"
                  :rules="rules.no_vacio"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4 v-if="clienteNuevo">
                <v-text-field v-model="cliente.rut" label="Rut" :rules="rules.rut"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4 v-if="clienteNuevo">
                <v-text-field
                  v-model="cliente.email"
                  label="Correo Electronico"
                  :rules="rules.correo"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4 v-if="clienteNuevo">
                <v-text-field v-model="cliente.telefono" label="Telefono" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" v-on:click="close">Cancelar</v-btn>
        <v-btn v-if="valid" color="green" v-on:click="save">Guardar</v-btn>
        <v-btn v-if="!valid" disabled="true" v-on:click="save">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import common_rules from "../scripts/rules";

export default {
  props: {
    //id del registroMedico a editar
    id_paciente: Number,
    id_registro: Number,
    update_db: Boolean
  },

  data: function() {
    return {
      valid: true,
      clienteNuevo: false,
      dialog: false,

      clientes: [],

      rules: common_rules.common_rules,

      pacientes: null,

      paciente: {
        nombre: "",
        numero_chip: "",
        especie: "",
        raza: "",
        color: "",
        castrado: "No",
        id_cliente: ""
      },

      pacienteDefault: {
        nombre: "",
        numero_chip: "",
        especie: "",
        raza: "",
        color: "",
        castrado: "No",
        id_cliente: ""
      },

      cliente: {
        rut: "",
        nombre: "",
        email: "",
        telefono: ""
      }
    };
  },

  created() {
    this.initialize();
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    initialize() {
      this.$http
        .get("http://localhost:3000/api/clientes/")
        .then(function(response) {
          this.clientes = response.body.map(function(item) {
            return item.nombre + " (" + item.rut + ")";
          });
        });
    },

    //Limpia el item de datos nulos o vacios (strings = "")
    cleanedItem(item) {
      var newItem = JSON.parse(JSON.stringify(item));
      for (var propName in newItem) {
        if (
          newItem[propName] == null ||
          !newItem[propName] ||
          newItem[propName] == 0 ||
          newItem[propName] == ""
        ) {
          delete newItem[propName];
        }
      }

      return newItem;
    },

    // Cierra el dialogo.
    close: function() {
      this.dialog = false;
      this.clienteNuevo = false;
      this.paciente = this.pacienteDefault;
    },

    savePaciente: function() {
      this.$http
        .post(
          "http://localhost:3000/api/pacientes",
          this.cleanedItem(this.paciente)
        )
        .then(function(response) {
          this.$root.$emit("db_update");
        });
      this.close();
    },

    save: function() {
      if (valid == true) {
        return;
      }
      this.$http
        .post(
          "http://localhost:3000/api/clientes",
          this.cleanedItem(this.cliente)
        )
        .then(function(response) {
          this.$root.$emit("db_update");
          this.paciente.id_cliente = response.id;
          savePaciente();
        });
    }
  }
};
</script>