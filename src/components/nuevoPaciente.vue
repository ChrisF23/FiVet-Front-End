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
                <v-text-field v-model="paciente.especie" label="Especie" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field v-model="paciente.raza" label="Raza"></v-text-field>
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
                  v-model="cliente_seleccionado"
                  :items="nombreRutClientes"
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
                <v-text-field
                  v-model="cliente.apellido_p"
                  label="Apellido Pater"
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
        <v-btn v-if="valid" color="green" v-on:click="save()">Guardar</v-btn>
        <v-btn v-if="!valid" disabled="true" v-on:click="save()">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import common_rules from "../scripts/rules";

export default {
  props: {
    //paciente en caso de que estemos editando
    id_paciente: Number
  },

  data: function() {
    return {
      valid: true,
      clienteNuevo: false,
      dialog: false,

      clientes: [],
      cliente_seleccionado: [],
      nombreRutClientes: [],
      rules: common_rules.common_rules,

      //En esta variable se guardan las responses de la request en caso de error
      debug_response: "",

      pacientes: null,

      paciente: {
        nombre: "",
        especie: "",
        raza: "",
        castrado: "No",
        id_cliente: ""
      },

      pacienteDefault: {
        nombre: "",
        especie: "",
        raza: "",
        castrado: "No",
        id_cliente: ""
      },

      //concatenacion del nombre y rut del cliente seleccionado
      cliente_seleccionado: "",

      cliente: {
        rut: "",
        nombre: "",
        apellido_p: "",
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

  computed: {
    // a computed getter
    cliente_a_guardar: function() {
      // `this` points to the vm instance
      return this.clientes.filter(
        cliente => cliente.rut == this.cliente_seleccionado.split(" ")[1]
      )[0].id;
    }
  },

  methods: {
    initialize() {
      this.$http
        .get("http://localhost:3000/api/clientes/")
        .then(function(response) {
          this.clientes = response.body;
          this.nombreRutClientes = response.body.map(function(item) {
            return item.nombre + " " + item.rut;
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

    // Cierra el dialogo y limpia los datos.
    close: function() {
      this.dialog = false;
      this.clienteNuevo = false;
      this.paciente = this.pacienteDefault;
      this.cliente_seleccionado = "";
    },

    //guardar el paciente en la base de datos
    savePaciente: function() {
      this.$http
        .post("http://localhost:3000/api/pacientes", this.paciente)
        .then(function(response) {
          this.$root.$emit("db_update");
          this.debug_response = response;
          this.$router.push("/pacientes/" + response.body.id);
        });
      //this.close();
    },

    //Guarda al cliente en la base de datos y luego al paciente para mantener integridad en la db
    save: function() {
      //Si el formulario esta mal llenado
      if (!this.valid) {
        return;
      }

      //FIXME: agregar un metodo buscar por rut desde la api rest

      // si el cliente ya existe
      if (!this.clienteNuevo) {
        this.paciente.id_cliente = this.cliente_a_guardar;
        this.savePaciente();
        return;
      }
      //Si el cliente es nuevo
      this.$http.post("http://localhost:3000/api/clientes", this.cliente).then(
        function(response) {
          this.$root.$emit("db_update");
          this.debug_response = response;
          this.paciente.id_cliente = response.body.id;
          this.savePaciente();
          //En este punto debug response contiene la response de la request para guardar el paciente
          // y por lo tanto su id
          //redireccionamos a la pagina del paciente
        },
        function(response) {
          this.debug_response = response;
        }
      );
      // this.close();
    }
  }
};
</script>