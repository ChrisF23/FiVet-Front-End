<template>
  <div>
    <v-card>
      <v-card-title class="headline">Pacientes
        <v-spacer></v-spacer>

        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>

        <v-spacer></v-spacer>

        <!-- Inicio formulario -->
        <dialogoAgregarPaciente></dialogoAgregarPaciente>
      </v-card-title>
    </v-card>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="filteredPacientes()"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
    >
      <template slot="items" slot-scope="props">
        <tr @click="redireccionDetallePaciente(props.item.id)">
          <td>{{ props.item.nombre }}</td>
          <td>{{props.item.Cliente.nombre}} {{props.item.Cliente.apellido_p}} ({{props.item.Cliente.rut}})</td>
          <td>{{props.item.especie}}</td>
          <td>{{props.item.raza}}</td>
          <td>{{props.item.color}}</td>
          <td v-if="props.item.castrado">{{'Si'}}</td>
          <td v-else>{{'No'}}</td>
        </tr>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="info"
        icon="info"
      >No se encontraron resultados para tu busqueda.</v-alert>
      <template slot="no-data">
        <div>Cargando...</div>
      </template>
      <template
        slot="pageText"
        slot-scope="props"
      >Pacientes {{ props.pageStart }} - {{ props.pageStop }} (Total: {{ props.itemsLength }})</template>
    </v-data-table>
    <p></p>
    <template>
    <tablaRegistrosMedicosReactive :id="null"></tablaRegistrosMedicosReactive>
    </template>
  </div>
</template>

<script>
import common_rules from "../scripts/rules";
import dialogoAgregarPaciente from '../components/nuevoPaciente.vue';
import tablaRegistrosMedicosReactive from '../components/tablaRegistrosMedicosReactive.vue';
export default {

  components :{
    dialogoAgregarPaciente,
    tablaRegistrosMedicosReactive
  },

  data: () => ({
    valid: false,
    dialog: false,
    dialogoDetalle: false,
    search: '',
    headers: [
      { text: "Nombre", value: "nombre", sortable: true },
      { text: "Dueño", value: "dueño", sortable: true },
      { text: "Especie", value: "especie", sortable: true },
      { text: "Raza", value: "raza", sortable: true },
      { text: "Color", value: "color", sortable: true },
      { text: "Castrado", value: "castrado", sortable: true }
    ],

    pacientes: [],
    id_paciente: null,

    rows_per_page_text: "Pacientes por pagina:",
    rows_per_page_items: [5, 10, 20, { 'text': 'Todos', 'value': -1 }],
    editedIndex: -1,

    //---------------------

    editedItem: {
      id: '',
      nombre: '',
      numero_chip: '',
      especie: '',
      raza: '',
      color: '',
      castrado: 'No'
    },
    defaultItem: {
      id: '',
      nombre: '',
      numero_chip: '',
      especie: '',
      raza: '',
      color: '',
      castrado: 'No'
    }
  }),

  //--------------------------------

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Paciente' : 'Editar Paciente'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    filteredPacientes() {
      this.search = this.search.toLowerCase();
      //TODO: Ineficiencie en su maxima expresion.
      let filtered = this.pacientes.filter((p) => {
        let text = (p.nombre + p.Cliente.nombre + p.Cliente.rut + p.Cliente.apellido_p).toLowerCase();
        return text.indexOf(this.search) != -1;
      });
      return filtered;
    },

    //Al inicializar, cargar la lista de pacientes.
    initialize() {
      this.$http.get('http://localhost:3000/api/pacientes')
        .then(function (response) {
          this.pacientes = response.body;
          this.search = '';
        });
    },
    

    redireccionDetallePaciente(id_paciente) {
      this.$router.push('/pacientes/'+id_paciente)
    },

    mostrarDetallePaciente(id_paciente) {
      this.id_paciente=id_paciente
      this.$root.$emit("db_update")
      //setTimeout(() => {this.dialogoDetalle = true;}, 2500);
      this.dialogoDetalle = true;
    },

    // Carga el paciente seleccionado y lo muestra en el dialogo para editarlo.
    editItem(item) {
      this.editedIndex = this.pacientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // Muestra un mensaje para confirmar la eliminacion del paciente. Al aceptar, se envia la peticion al backend.
    deleteItem(item) {
      const index = this.pacientes.indexOf(item)
      if (confirm('¿Estás seguro de que quieres eliminar al paciente?') && this.pacientes.splice(index, 1)) {
        this.$http.delete('http://localhost:3000/api/pacientes/' + item.id).then(
          function (response) {
            console.log(response);
          }
        );
      }
    },

    //---
    cleanedItem(item) {
      var newItem = JSON.parse(JSON.stringify(item));
      //Para dejar una propiedad vacia, habria que borrar esto.
      //El backend se encarga de que no se ingresen datos invalidos.
      /*
    for (var propName in newItem) {
      if (newItem[propName] == null || !newItem[propName] || newItem[propName] == 0) {
        delete newItem[propName];
      }
    }
    */

      return newItem;
    },

    // Cierra el dialogo.
    close: function () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    // Guarda el paciente en la base de datos.
    save() {
      if (this.editedItem.id) {
        console.log("edited item");
        this.$http.put('http://localhost:3000/api/pacientes', this.cleanedItem(this.editedItem))
          .then(function (response) {
            this.pacientes.splice(this.editedIndex, 1, this.editedItem);

            // Actualiza la lista.
            this.initialize();
          });
      } else {
        console.log("nuevo item", this.editedItem);
        delete this.editedItem.id;
        this.$http.post('http://localhost:3000/api/pacientes', this.cleanedItem(this.editedItem))
          .then(function (response) {
            //if (response.status==200){}
            this.pacientes.push(response.body);

            // Actualiza la lista.
            this.initialize();
          });
      }
      this.close()
    }
  }
}
</script>
