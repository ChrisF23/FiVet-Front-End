<template>
  <div>
    <v-card>
      <v-card-title class="headline">Pacientes
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="search"
          label="Nombre de paciente, Raza, Nombre del dueño, etc..."
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <!-- Inicio formulario -->
        <dialogoAgregarPaciente></dialogoAgregarPaciente>
      </v-card-title>
    </v-card>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :pagination.sync="pagination"
      :items="pacientes"
      :search="search"
      :rows-per-page-items="rows_per_page_items"
      :rows-per-page-text="rows_per_page_text"
    >
      <template slot="items" slot-scope="props">
        <tr @click="redireccionDetallePaciente(props.item.id)">
          <td>{{ props.item.nombre }}</td>
          <td>{{ obtenerNombreyRutDelDuenio(props.item.Cliente)}}</td>
          <td>{{props.item.especie}}</td>
          <td>{{props.item.raza}}</td>
          <!-- El backend se asegura de que el registro en la posicion 0 sea el mas reciente. -->
          <td>{{obtenerFechaEdicionUltimoRegistro(props.item.RegistroMedicos[0])}}</td>
        </tr>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="info"
        icon="info"
      >No se encontraron resultados para tu búsqueda.</v-alert>
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
import dialogoAgregarPaciente from "../components/nuevoPaciente.vue";
import tablaRegistrosMedicosReactive from "../components/tablaRegistrosMedicosReactive.vue";
export default {
  components: {
    dialogoAgregarPaciente,
    tablaRegistrosMedicosReactive
  },

  beforeCreate: function() {
    if (!this.$session.exists()) {
      //Desactivado mientras estemos en desarrollo
      //this.$router.push("/login");
    }
  },

  data: () => ({
    valid: false,
    dialog: false,
    dialogoDetalle: false,
    search: "",
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Dueño", value: "duenio" },
      { text: "Especie", value: "especie" },
      { text: "Raza", value: "raza" },
      {
        text: "Fecha de último registro",
        value: "RegistroMedicos[0].fecha_edicion"
      }
    ],

    // Para ordenar por defecto desde este atributo.
    pagination: { sortBy: "RegistroMedicos[0].id", descending: true },

    pacientes: [],
    id_paciente: null,

    rows_per_page_text: "Pacientes por página:",
    rows_per_page_items: [5, 10, 20, { text: "Todos", value: -1 }],
    editedIndex: -1,

    //---------------------

    editedItem: {
      id: "",
      nombre: "",
      numero_chip: "",
      especie: "",
      raza: "",
      color: "",
      castrado: "No"
    },
    defaultItem: {
      id: "",
      nombre: "",
      numero_chip: "",
      especie: "",
      raza: "",
      color: "",
      castrado: "No"
    }
  }),

  //--------------------------------

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Paciente" : "Editar Paciente";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    /*
    
    //FIXED. Ir al metodo initialize para saber como se implemento.
    
    filteredPacientes() {
      this.search = this.search.toLowerCase();
      //TODO: Ineficiencie en su maxima expresion.
      let filtered = this.pacientes.filter(p => {
        let text = (
          p.nombre +
          p.Cliente.nombre +
          p.Cliente.rut +
          p.Cliente.apellido_p
        ).toLowerCase();
        return text.indexOf(this.search) != -1;
      });
      return filtered;
    },
    */

    //Al inicializar, cargar la lista de pacientes.
    initialize() {
      this.$http
        .get("http://localhost:3000/api/pacientes")
        .then(function(response) {
          this.pacientes = response.body;

          // Para cada paciente, crear el atributo duenio.
          // Esto sirve para asignarlo a la columna Dueño de la datatable
          // Y asi poder completar la metabusqueda.
          this.pacientes.forEach(p => {
            p.duenio =
              p.Cliente.nombre +
              " " +
              p.Cliente.apellido_p +
              " " +
              p.Cliente.apellido_m +
              " " +
              p.Cliente.rut;
          });

          this.search = "";
        });
    },

    // Se encarga de obtener la fecha de edicion del ultimo registro medico de un paciente.
    obtenerFechaEdicionUltimoRegistro(_registro) {
      if (_registro != null) {
        var options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return new Date(_registro.fecha_edicion).toLocaleDateString(
          "es-ES",
          options
        );
      }
      return "Sin registros";
    },

    obtenerNombreyRutDelDuenio(_duenio) {
      // El duenio nunca sera nulo.
      // Apellido materno puede ser nulo. En ese caso, no mostrarlo.
      return (
        _duenio.nombre +
        " " +
        _duenio.apellido_p +
        " " +
        (_duenio.apellido_m || "") +
        " (" +
        _duenio.rut +
        ")"
      );
    },

    redireccionDetallePaciente(id_paciente) {
      this.$router.push("/pacientes/" + id_paciente);
    },

    mostrarDetallePaciente(id_paciente) {
      this.id_paciente = id_paciente;
      this.$root.$emit("db_update");
      //setTimeout(() => {this.dialogoDetalle = true;}, 2500);
      this.dialogoDetalle = true;
    },

    // Carga el paciente seleccionado y lo muestra en el dialogo para editarlo.
    editItem(item) {
      this.editedIndex = this.pacientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // Muestra un mensaje para confirmar la eliminacion del paciente. Al aceptar, se envia la peticion al backend.
    deleteItem(item) {
      const index = this.pacientes.indexOf(item);
      if (
        confirm("¿Estás seguro de que quieres eliminar al paciente?") &&
        this.pacientes.splice(index, 1)
      ) {
        this.$http
          .delete("http://localhost:3000/api/pacientes/" + item.id)
          .then(function(response) {
            console.log(response);
          });
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
    close: function() {
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
        this.$http
          .put(
            "http://localhost:3000/api/pacientes",
            this.cleanedItem(this.editedItem)
          )
          .then(function(response) {
            this.pacientes.splice(this.editedIndex, 1, this.editedItem);

            // Actualiza la lista.
            this.initialize();
          });
      } else {
        console.log("nuevo item", this.editedItem);
        delete this.editedItem.id;
        this.$http
          .post(
            "http://localhost:3000/api/pacientes",
            this.cleanedItem(this.editedItem)
          )
          .then(function(response) {
            //if (response.status==200){}
            this.pacientes.push(response.body);

            // Actualiza la lista.
            this.initialize();
          });
      }
      this.close();
    }
  }
};
</script>
