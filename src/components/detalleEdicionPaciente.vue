<template>
<div>
      <v-card class="pa-2 ">
            <v-btn
            v-if="!editing"
            class="mb-4"
              flat
              absolute
              bottom
              right
              color="warning"
              v-on:click="edit()"
            >
              <v-icon top left absolute small>edit</v-icon>Editar
            </v-btn>
            <div v-else>
             <v-btn
            class="mb-4"
              absolute
              bottom
              right
              color="green"
              v-on:click="savePaciente()"
            >
              <v-icon top left absolute small></v-icon>GUARDAR
            </v-btn>
            </div>
        
        <v-layout row >
          <v-layout column>
            <v-flex pa-3 xs1>
              <v-avatar size="100">
                <img src="https://i.imgur.com/3pwLlj2.jpg">
              </v-avatar>
            </v-flex>
          </v-layout>

          <v-layout column v-if="editing">
            <v-flex pb-1 xs1 align-self-left="true">
              <v-text-field
                  v-model="pacienteOnEdit.nombre"
                  label="Nombre"
                  required
                ></v-text-field>
            </v-flex>

            <v-flex pb-1 xs1 align-self-left="true">
              <v-text-field
                  v-model="pacienteOnEdit.especie"
                  label="Especie"
                  required
                ></v-text-field>
            </v-flex>

            <v-flex pb-1 xs1 align-self-left="true">
              <v-text-field
                  v-model="pacienteOnEdit.castrado"
                  label="Castrado"
                  required
                ></v-text-field>
            </v-flex>
          </v-layout >
          <v-layout column v-else>
            <v-flex v-if="paciente.nombre" pb-1 xs1 align-self-left="true">
              <div class="caption grey--text">Nombre</div>
              <div>{{ paciente.nombre }}</div>
            </v-flex>

            <v-flex v-if="paciente.especie" pb-1 xs1 align-self-left="true">
              <div class="caption grey--text">Especie</div>
              <div>{{ paciente.especie }}</div>
            </v-flex>

            <v-flex v-if="paciente.castrado" pb-1 xs1>
              <div class="caption grey--text">Castrado</div>
              <div>{{ paciente.castrado }}</div>
            </v-flex>
          </v-layout >
          <v-layout column pl-3 v-if="editing">
            <v-flex pb-1 xs1 align-self-left="true">
              <v-text-field
                  v-model="pacienteOnEdit.raza"
                  label="Raza"
                  required
                ></v-text-field>
            </v-flex>

            <v-flex pb-1 xs1 align-self-left="true">
              <div class="caption grey--text">Fecha de Nacimiento</div>
              <input v-model="pacienteOnEdit.fecha_nacimiento"  id="date" type="date">
            </v-flex>

            <v-flex pb-1 xs1 align-self-left="true">
                <v-combobox
                v-model="select"
                :items="['F', 'M']"
                label="Sexo"
                ></v-combobox>
            </v-flex>
          </v-layout >
          <v-layout column v-else>
            <v-flex v-if="paciente.raza" pb-1 xs1>
              <div class="caption grey--text">Raza</div>
              <div>{{ paciente.raza }}</div>
            </v-flex>

            <v-flex v-if="paciente.fecha_nacimiento" pb-2 xs1>
              <div class="caption grey--text">Fecha de Nacimiento</div>
              <div>{{ fechaToString() }}</div>
            </v-flex>

            <v-flex v-if="paciente.sexo" pb-2 xs1>
              <div class="caption grey--text">Sexo</div>
              <div>{{ paciente.sexo }}</div>
            </v-flex>
          </v-layout>
          <v-layout column pl-3 v-if="editing">
            <v-flex pb-1 xs1 align-self-left="true">
              <v-text-field
                  v-model="pacienteOnEdit.color"
                  label="Color"
                  required
                ></v-text-field>
            </v-flex>
          </v-layout >
          <v-layout column v-else>
            <v-flex v-if="paciente.color" pb-2 xs1>
              <div class="caption grey--text">Color</div>
              <div>{{ paciente.color }}</div>
            </v-flex>
          </v-layout>
          <v-layout column >
            <v-flex pb-2 xs1>
              <div class="caption grey--text">Nombre dueño</div>
              <div>{{ cliente.nombre }} {{cliente.apellido_p}} {{cliente.apellido_m}}</div>
            </v-flex>

            <v-flex v-if="cliente.email" pb-2 xs1>
              <div class="caption grey--text">Correo electrónico dueño</div>
              <div>{{ cliente.email }}</div>
            </v-flex>

            <v-flex v-if="cliente.telefono" pb-2 xs1>
              <div class="caption grey--text">Teléfono dueño</div>
              <div>{{ cliente.telefono }}</div>
            </v-flex>
          </v-layout>
        </v-layout >

      </v-card>
</div>
</template>

<script>
import "../Utils";
export default {
  props: {
    id: Number
  },

  data: function() {
    return {
      paciente: null,
      cliente: null,
      pacienteOnEdit: null,
      editing: false
    };
  },

  methods: {
    //Al inicializar, cargar la lista de pacientes.
    initialize() {
      //obtenemos el paciente baso en el prop
      this.$http
        .get("http://localhost:3000/api/pacientes/" + this.$props.id)
        .then(function(response) {
          this.paciente = response.body;
          //obtenemos el cliente basado en la id_cliente que devolvio la reques getPaciente
          this.$http
            .get(
              "http://localhost:3000/api/clientes/" + this.paciente.id_cliente
            )
            .then(function(response) {
              this.cliente = response.body;
            });
        });
    },
    edit: function() {
    
    this.pacienteOnEdit = JSON.parse(JSON.stringify(this.paciente));
    this.editing = true;
    console.log("EDIT");
    },

    cancelEditMode(){
      this.editing = false;
    },

    savePaciente(){
      this.editing = false;
      delete this.pacienteOnEdit.Cliente;
      delete this.pacienteOnEdit.RegistrosMedicos;
      console.log(this.pacienteOnEdit);
      this.$http
          .put("http://localhost:3000/api/pacientes", this.pacienteOnEdit)
          .then(function(response) {
            this.pacienteOnEdit = response.body;
            this.pacienteOnEdit.Clientes = this.paciente.Clientes;
            this.pacienteOnEdit.RegistrosMedicos = this.paciente.RegistrosMedicos;
            this.paciente = this.pacienteOnEdit;
            console.log("FUNCIONA", response.body);
          });
    },
    fechaToString() {
        var options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: 'UTC'
        };
        return new Date(this.paciente.fecha_nacimiento).toLocaleString(
          "es-ES",
          options
        );
    },
  },

  created() {
    this.initialize();
  },

 watch: {
    id: function (newId) {
      this.initialize();
    }
  }

  // updated() {
  //   //Reinicializa el componente para reflejas cambios en la base de datos
  //   this.$root.$on("db_update", () => {
  //     this.initialize();
  //   });
  // }
};
</script>