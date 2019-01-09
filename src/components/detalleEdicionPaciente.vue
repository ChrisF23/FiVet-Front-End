<template>
<div>
  <!--Fila de datos de paciente y cliente.-->
      <!--Tarjeta del paciente.-->
      
      <v-card class="pa-2 ">
            <v-btn
            class="mb-4"
              flat
              absolute
              bottom
              right
              color="warning"
            >
              <v-icon top left absolute small>edit</v-icon>Editar
            </v-btn>
        
        <v-layout row >
          <v-layout column>
            <v-flex pa-3 xs1>
              <v-avatar size="100">
                <img src="https://i.imgur.com/3pwLlj2.jpg">
              </v-avatar>
            </v-flex>
          </v-layout>
          

          <v-layout column>
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
          <v-layout column>
            <v-flex v-if="paciente.raza" pb-1 xs1>
              <div class="caption grey--text">Raza</div>
              <div>{{ paciente.raza }}</div>
            </v-flex>

            <v-flex v-if="paciente.fecha_nacimiento" pb-2 xs1>
              <div class="caption grey--text">Fecha de Nacimiento</div>
              <div>{{ paciente.fecha_nacimiento }}</div>
            </v-flex>

            <v-flex v-if="paciente.sexo" pb-2 xs1>
              <div class="caption grey--text">Sexo</div>
              <div>{{ paciente.sexo }}</div>
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-flex v-if="paciente.id" pb-2 xs1>
              <div class="caption grey--text">Numero de Chip</div>
              <div>{{ paciente.id }}</div>
            </v-flex>

            <v-flex v-if="paciente.color"pb-2 xs1>
              <div class="caption grey--text">Color</div>
              <div>{{ paciente.color }}</div>
            </v-flex>
          </v-layout>
              <!--Tarjeta del cliente.-->
          <v-layout column >
            <v-flex pb-2 xs1>
              <div class="caption grey--text">Nombre dueño</div>
              <div>{{ cliente.nombre }} {{cliente.apellido_p}} {{cliente.apellido_m}}</div>
            </v-flex>

            <v-flex v-if="cliente.email" pb-2 xs1>
              <div class="caption grey--text">Email dueño</div>
              <div>{{ cliente.email }}</div>
            </v-flex>

            <v-flex v-if="cliente.telefono" pb-2 xs1>
              <div class="caption grey--text">Telefono dueño</div>
              <div>{{ cliente.telefono }}</div>
            </v-flex>
          </v-layout>

        </v-layout >
      <!--Fin de tarjeta del cliente.-->

        </v-layout>
      <!--Fin de tarjeta del paciente.-->

      </v-card>
  <!--Fin fila de datos de paciente y cliente.-->
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
      cliente: null
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
    }
  },

  created() {
    this.initialize();
  },

 watch: {
    id: function (newId) {
      this.initialize();
    }
  },

  // updated() {
  //   //Reinicializa el componente para reflejas cambios en la base de datos
  //   this.$root.$on("db_update", () => {
  //     this.initialize();
  //   });
  // }
};
</script>