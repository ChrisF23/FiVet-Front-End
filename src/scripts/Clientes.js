export default {
  data: () => ({
    valid: false,
    dialog: false,
    search: '',
    headers: [
      { text: "ID", value: "id", sortable: true },
      { text: "Nombre", value: "nombre", sortable: true },
      { text: "Apellido Paterno", value: "apellido_paterno", sortable: true },
      { text: "Apellido Materno", value: "apellido_materno", sortable: true },
      { text: "RUT", value: "rut", sortable: true },
      { text: "Email", value: "email", sortable: true },
      { text: "Telefono", value: "telefono", sortable: true },
      { text: "Direccion", value: "direccion", sortable: true },
      { text: 'Acciones', width: "5%"}
    ],
    clientes: [],
    rows_per_page_text: "Clientes por pagina:",
    rows_per_page_items: [5, 10, 20, { 'text': 'Todos', 'value': -1 }],
    editedIndex: -1,

    //---------------------

    editedItem: {
      id: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      rut: '',
      email: '',
      telefono: '',
      direccion: ''
    },
    defaultItem: {
      id: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      rut: '',
      email: '',
      telefono: '',
      direccion: ''
    }
  }),



  //--------------------------------

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Editar Cliente'
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
    //Al inicializar, cargar la lista de clientes.
    initialize() {
      this.$http.get('http://localhost:3000/api/clientes')
        .then(function (response) {
          this.clientes = response.body;
        });
      this.search = '';
    },

    // Carga el cliente seleccionado y lo muestra en el dialogo para editarlo.
    editItem(item) {
      this.editedIndex = this.clientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // Muestra un mensaje para confirmar la eliminacion del cliente. Al aceptar, se envia la peticion al backend.
    deleteItem(item) {
      const index = this.clientes.indexOf(item)
      if (confirm('¿Estás seguro de que quieres eliminar el cliente?') && this.clientes.splice(index, 1)) {
        this.$http.delete('http://localhost:3000/api/clientes/' + item.id).then(
          function (response) {
            console.log(response);
          }
        );
      }
    },

    //Limpia el item de datos nulos o vacios (strings = "")
    cleanedItem(item) {
      var newItem = JSON.parse(JSON.stringify(item));
      for (var propName in newItem) {
        if (newItem[propName] == null || !newItem[propName] || newItem[propName] == 0 || newItem[propName] == "") {
          delete newItem[propName];
        }
      }

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

    // Guarda el cliente en la base de datos.
    save() {
      if (this.editedItem.id) {
        console.log("edited item");
        this.$http.put('http://localhost:3000/api/clientes', this.cleanedItem(this.editedItem))
          .then(function (response) {
            this.clientes.splice(this.editedIndex, 1, this.editedItem);

            // Actualiza la lista.
            this.initialize();
          });
      } else {
        console.log("nuevo item", this.editedItem);
        delete this.editedItem.id;
        this.$http.post('http://localhost:3000/api/clientes', this.cleanedItem(this.editedItem))
          .then(function (response) {
            //if (response.status==200){}
            this.clientes.push(response.body);

            // Actualiza la lista.
            this.initialize();
          });
      }
      this.close()
    },

    hayDatos() {
      if (this.clientes == null || this.clientes == undefined){
        return false;
      } else {
        return this.clientes.length > 0;
      }
    }
  }
}

//TODO: Responder a errores del el backend. Por ejemplo, al ingresar un cliente con rut invalido.