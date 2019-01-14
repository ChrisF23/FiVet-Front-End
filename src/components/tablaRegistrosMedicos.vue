<template>
  <div>
    <v-dialog v-model="dialogRegistro">
      <v-card>
        <v-card-title>
          <span class="headline">Registro Médico</span>
        </v-card-title>
        <v-form v-if="dialogRegistro">
          
          <v-flex xs3 offset-xs11 justify-right>
            <v-btn icon outline color="red" v-on:click="dialogRegistro=false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>

          <v-card-text>
            <v-container grid-list-md>
              <v-flex v-if="registroSeleccionado.fecha_creacion" xs12 sm6 md4>
                <h4>Fecha: {{registroSeleccionado.fecha_creacion.replace("T", " ").replace("Z", " ")}}</h4>
                <p></p>
              </v-flex>
              <v-flex v-if="registroSeleccionado.motivo" xs12 sm6 md4>
                <h3>Motivo</h3>
                {{registroSeleccionado.motivo}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.anamnesis" xs12 sm6 md4>
                <h3>Anamnesia</h3>
                {{registroSeleccionado.anamnesis}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.peso" xs12 sm6 md4>
                <h3>Peso</h3>
                {{registroSeleccionado.peso}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.temperatura" xs12 sm6 md4>
                <h3>Temperatura</h3>
                {{registroSeleccionado.temperatura}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.hidratacion" xs12 sm6 md4>
                <h3>Hidratación</h3>
                {{registroSeleccionado.hidratacion}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.pulso" xs12 sm6 md4>
                <h3>Pulso</h3>
                {{registroSeleccionado.pulso}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.frecuencia_cardiaca" xs12 sm6 md4>
                <h3>Frecuencia Cardíaca</h3>
                {{registroSeleccionado.frecuencia_cardiaca}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.frecuencia_respiratoria" xs12 sm6 md4>
                <h3>Frecuencia Respiratoria</h3>
                {{registroSeleccionado.frecuencia_respiratoria}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.musocas" xs12 sm6 md4>
                <h3>Mucosas</h3>
                {{registroSeleccionado.mucosas}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.tiempo_llenado_capilar" xs12 sm6 md4>
                <h3>Tiempo de Llenado Capilar</h3>
                {{registroSeleccionado.tiempo_llenado_capilar}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.ganglios" xs12 sm6 md4>
                <h3>Ganglios</h3>
                {{registroSeleccionado.ganglios}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.reflejo_tusigeno" xs12 sm6 md4>
                <h3>Reflejo Tusígeno</h3>
                {{registroSeleccionado.reflejo_tusigeno}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.reflejo_deglutorio" xs12 sm6 md4>
                <h3>Reflejo Deglutorio</h3>
                {{registroSeleccionado.reflejo_deglutorio}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.palpacion_abdominal" xs12 sm6 md4>
                <h3>Palpitación Abdominal</h3>
                {{registroSeleccionado.palpacion_abdominal}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.palmopercusion" xs12 sm6 md4>
                <h3>Palmopercusión</h3>
                {{registroSeleccionado.palmopercusion}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.tonsilas" xs12 sm6 md4>
                <h3>Tonsilas</h3>
                {{registroSeleccionado.tonsilas}}
              </v-flex>

              <v-flex v-if="registroSeleccionado.pulso_por_minuto" xs12 sm6 md4>
                <h3>Pulso</h3>
                {{registroSeleccionado.pulso_por_minuto}}
              </v-flex>
            </v-container>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <v-card>
      <v-text-field v-model="search" append-icon="search" label="Buscar" hide-details></v-text-field>

      <v-data-table
        :headers="headers"
        :items="registrosMedicos"
        :search="search"
        :rows-per-page-items="rows_per_page_items"
        :rows-per-page-text="rows_per_page_text"
        class="elevation-1"
      >
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">No hay registros para mostrar</v-alert>
        </template>
        <template slot="items" slot-scope="props">
          <tr @click="abrirRegistro(props.item)">
            <td>{{ props.item.patologia }}</td>
            <td>{{ props.item.motivo }}</td>
            <td>{{ props.item.anamnesis }}</td>
            <td>{{ props.item.fecha_creacion.replace("T", " ").replace("Z", " ") }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
const utils = require("../Utils");
export default {
  props: ["id", "registroInicial"],

  data: function() {
    return {
      valid: false,
      dialogRegistro: false,
      registroSeleccionado: null,
      search: "",
      headers: [
        { text: "Patología", value: "patologia", sortable: true },
        { text: "Motivo", value: "motivo", sortable: true },
        { text: "Anamnesia", value: "anamnesis", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true }
      ],

      registrosMedicos: [],

      rows_per_page_text: "Registros por página:",
      rows_per_page_items: [5, 10, 20, { text: "Todos", value: -1 }]
    };
  },

  methods: {
    //Al inicializar, cargar la lista de registros.
    initialize() {
      this.$http
        .get("http://192.168.0.33:3000/api/registros")
        .then(function(response) {
          if (this.$props.id == undefined || this.$props.id == null) {
            this.registrosMedicos = response.body;
          } else {
            //this.registrosMedicos = response.body
            response.body.forEach(rm => {
              if (rm.id_paciente == this.$props.id) {
                this.registrosMedicos.push(rm);
              }

              if (
                this.$props.registroInicial != null &&
                this.$props.registroInicial != undefined
              ) {
                this.registroSeleccionado = this.$props.registroInicial;
                this.dialogRegistro = true;
              }
            });
          }
        });
      this.search = "";
    },

    abrirRegistro(registro) {
      this.registroSeleccionado = registro;
      this.dialogRegistro = true;
    }
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.$root.$on("db_update", data => {
      this.initialize();
    });
  }
};
</script>
