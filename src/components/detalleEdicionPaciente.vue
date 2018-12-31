<template>
    <v-card flat class="pa-3">
      <!-- El layout exterior -->
      <v-layout row>
        <!-- El primer layout dentro del layout exterior. Los elementos dentro de el estaran en la misma fila. -->
        <v-layout row>
          <v-flex pa-3 xs1>
           
            <v-avatar size="200">
              <img src="https://i.imgur.com/3pwLlj2.jpg">
            </v-avatar>
          </v-flex>
        </v-layout>

        <!-- El segundo layout dentro del layout exterior. Los elementos dentro de el estaran en la misma columna. -->
        <v-layout column wrap>
          
          <v-flex pb-2 xs1 align-self-left=true>
            <div class="caption grey--text">Nombre</div>
            <div>{{ paciente.Nombre }}</div>
          </v-flex>

          <v-flex pb-2 xs1 align-self-left=true>
            <div class="caption grey--text">Especie</div>
            <div>{{ paciente.Especie }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Castrado</div>
            <div>{{ paciente.Castrado }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Raza</div>
            <div>{{ paciente.Raza }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Color</div>
            <div>{{ paciente.Color }}</div>
          </v-flex>


          <v-flex pb-2 xs1>
            <div class="caption grey--text">Fecha de Nacimiento</div>
            <div>{{ paciente.Fecha }}</div>
          </v-flex>

        </v-layout>
        <v-layout column wrap>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Dueño</div>
            <div>{{ paciente.duenio }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <v-text-field
                v-model="paciente.nombre"
                label="Sexo"
              ></v-text-field>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Numero de Chip</div>
            <div>{{ paciente.id }}</div>
          </v-flex>

          <v-flex pb-2 xs1>
            <div class="caption grey--text">Color</div>
            <div>{{ paciente.Color }}</div>
          </v-flex>

        </v-layout>  


      </v-layout>

      <v-btn flat color="warning">
        <v-icon left small>edit</v-icon>Editar
      </v-btn>
      <v-btn flat color="error">
        <v-icon left small>delete</v-icon>Eliminar
      </v-btn>
    </v-card>
</template>

<script>

import '../Utils'
export default {
      props: {
        id: Number
    },

    data: function() {
        return {
        paciente: null
        };
    },

    methods: {
      //Al inicializar, cargar la lista de pacientes.
      initialize() {
        this.$http.get('http://localhost:3000/api/pacientes/' + this.$props.id)
          .then(function (response) {
            this.paciente = response.body;
          });
      },
    },

    created() {
      this.initialize()
    },
};
</script>