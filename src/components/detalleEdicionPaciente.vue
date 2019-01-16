<template>
<v-card class="mt-5">
  <v-container grid-list-xs align-content-center>

    <v-dialog v-model="detalleClienteDialog" persistent>
      <v-card>
        <v-flex xs1>
          <v-btn icon outline color="red" v-on:click="closeClienteDialog()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
      <detalleCliente :id="cliente.id" v-if="detalleClienteDialog"></detalleCliente>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editing" persistent>
      <v-card class="pa-3">
        <v-layout row>

          <v-layout row mb-2>
            <v-flex>
              <v-btn color="red" v-on:click="deleting=true">
                <v-icon top absolute small>delete</v-icon>ELIMINAR
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-end row>
              <v-btn icon outline color="red" v-on:click="closePacienteDialog()">
                <v-icon>close</v-icon>
              </v-btn>
          </v-layout>
        </v-layout>

          <v-flex d-flex v-if="editing">
            <v-layout row >
              <v-avatar size="100" class="mr-3">
                <img src="../images/placeholder.png">
              </v-avatar>
              <v-layout row wrap>
              <v-flex d-flex>
                  <v-text-field
                      v-model="pacienteOnEdit.nombre"
                      label="Nombre"
                      required
                  ></v-text-field>
                </v-flex>

                <v-flex d-flex>
                  <v-text-field
                      v-model="pacienteOnEdit.especie"
                      label="Especie"
                      required
                    ></v-text-field>
                </v-flex>

                <v-flex d-flex>
                    <v-combobox
                    v-model="pacienteOnEdit.castrado"
                    :items="['SI', 'NO']"
                    label="Castrado"
                    ></v-combobox>
                </v-flex>

                <v-flex d-flex>
                  <v-text-field
                      v-model="pacienteOnEdit.raza"
                      label="Raza"
                      required
                    ></v-text-field>
                </v-flex>

                <v-flex d-flex>
                    <v-combobox
                    v-model="pacienteOnEdit.sexo"
                    :items="['F', 'M']"
                    label="Sexo"
                    ></v-combobox>
                </v-flex>

                <v-flex>
                  <div class="caption grey--text pb-2">Fecha de Nacimiento</div>
                  <input v-model="pacienteOnEdit.fecha_nacimiento"  id="date" type="date">
                </v-flex>

              </v-layout>
            </v-layout>
          </v-flex> 
        <v-layout row justify-end>
          <v-btn color="green" v-on:click="savePaciente()">
              <v-icon top left absolute small>save</v-icon>GUARDAR
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="deleting" persistent>
      <v-card class="pa-3">
        <h2 align="center" class="pt-2 pb-2">¿Está seguro que desea eliminar al paciente?</h2>
        <v-layout pb-2 row justify-center>
          <v-btn color="green" v-on:click="deletePaciente()">
            <h2>SI</h2>
          </v-btn>
          <v-btn class="ml-5" color="red" v-on:click="deleting=false">
            <h2>NO</h2>
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-layout row align-center wrap>
      <v-flex d-flex mr-3 > 
        <v-card color="transparent" flat>
          <v-layout column justify-center wrap>
            <v-avatar size="100">
              <img src="../images/placeholder.png">
            </v-avatar>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex d-flex>
        <v-layout row wrap>
          <v-flex d-flex xs ml-1 mr-1 v-for="(data, key) of computedPacienteClienteData()">
            <v-card color="transparent" flat>
                <div class="caption grey--text">{{key}}</div>
                <div>{{data}}</div>
            </v-card>
          </v-flex>

          <v-flex d-flex xs ml-1 mr-1>
            <v-card color="transparent" flat>
                <div  class="caption grey--text">Nombre Dueño</div>
                <a class="blue--text" @click="showClienteDialog()">{{nombreCliente()}}</a>
                
            </v-card>
          </v-flex>

          <v-flex d-flex xs ml-1 mr-1>
            <v-card color="transparent" flat>
                <div class="caption grey--text">Fecha de Nacimiento</div>
                <div>{{fechaToString()}}</div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex> 
    
    </v-layout>

    <v-layout row justify-end>
      <v-btn color="warning" v-on:click="edit()">
        <v-icon top left small>edit</v-icon>Editar
      </v-btn>
    </v-layout>
  </v-container>
</v-card >
</template>

<script>
import "../Utils";
import detalleCliente from "../components/detalleCliente.vue"
export default {
  props: {
    id: Number
  },

  components: {
    detalleCliente
  },

  data: function() {
    return {
      paciente: null,
      cliente: null,
      pacienteOnEdit: null,
      editing: false,
      deleting:false,
      detalleClienteDialog: false,
      pacienteLabels: {
        nombre: "Nombre",
        especie: "Especie",
        raza: "Raza",
        sexo: "Sexo",
        castrado: "Castrado"
      }
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
          console.log("PACIENTE",this.paciente);
          //obtenemos el cliente basado en la id_cliente que retornó la request getPaciente
          this.$http
            .get(
              "http://localhost:3000/api/clientes/" + this.paciente.id_cliente
            )
            .then(function(response) {
              this.cliente = response.body;
              console.log("CLIENTE",this.cliente);
              this.computedPacienteClienteData() 
            });
        });
    },

    edit: function() {
      this.pacienteOnEdit = JSON.parse(JSON.stringify(this.paciente));
      this.editing = true;
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
          });
    },

    deletePaciente() {
      this.$http.delete("http://localhost:3000/api/pacientes/"+this.paciente.id).bind(this).then(function (response) {
        this.$router.push("/");
      }).bind(this);
    },

    closePacienteDialog() {
      this.editing = false;
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

    nombreCliente() {
      if(this.cliente != null && this.cliente != undefined) {
        return this.cliente.nombre + " " + this.cliente.apellido_p + " " + this.cliente.apellido_m;
      }
    },

    rutaCliente() {
      return "/clientes/" + this.cliente.id;
    },

    showClienteDialog() {
      this.detalleClienteDialog = true;
    },

    closeClienteDialog() {
      this.detalleClienteDialog = false;
      this.updateCliente();
    },

    updateCliente() {
      this.$http
        .get(
          "http://localhost:3000/api/clientes/" + this.paciente.id_cliente
        )
        .then(function(response) {
          this.cliente = response.body;
          this.computedPacienteClienteData();
        });
    },

    computedPacienteClienteData() {
      var data = {};
      
      Object.keys(this.paciente).forEach(function (key) {
        if(this.paciente[key] != null && this.paciente[key] != undefined) {
          if(this.pacienteLabels[key] != null && this.pacienteLabels[key] != undefined)
          data[this.pacienteLabels[key]] = this.paciente[key];
        }
      }, this);

      if (this.cliente.rut != null && this.cliente.rut != undefined) {
        data["Rut Dueño"] = this.cliente.rut;
      }

      if (this.cliente.email != null && this.cliente.email != undefined) {
        data["Email Dueño"] = this.cliente.email;
      }
      
      if (this.cliente.telefono != null && this.cliente.telefono != undefined) {
        data["Teléfono Dueño"] = this.cliente.telefono;
      }

      console.log("AVAIBLE DATA", data);
      return data;
    }
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