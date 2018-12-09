<template>
  <div class="inicio">
    <h1>Inicio</h1>
    <v-container fluid grid-list-md>
      <v-layout row>
        <v-flex xs3>
          <v-card flat color="primary darken-2" class="white--text">
            <v-card-title primary-title>
              <div>               
                <div class="headline">109</div>
                <span>Pacientes</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs3>
          <v-card flat color="primario darken-1" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">85</div>
                <span>Clientes</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs3>
          <v-card flat color="warning darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">124</div>
                <span>Registros medicos</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs3>
          <v-card flat color="error darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">298</div>
                <span>Visitas</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>
