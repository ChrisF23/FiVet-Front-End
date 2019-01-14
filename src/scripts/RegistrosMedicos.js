import tablaRegistros from '../components/tablaRegistrosMedicos'
import dialogAgregarRegistroMedico from "../components/agregarRegistroMedico";

export default {

  components: {
    tablaRegistros,
    dialogAgregarRegistroMedico
  },

  beforeCreate: function() {
    if (!this.$session.exists()) {
      //Desactivado mientras estemos en desarrollo
      //this.$router.push("/login");
    }
  },

  data: () => ({
    dialog: false,
    headers: [
      { text: 'ID', value: 'id', sortable: true, width:"5%" },
      { text: 'Paciente', value: 'paciente', sortable: true },
      { text: 'Anamnesia', value: 'anamnesia', sortable: true },
      { text: 'Fecha', value: 'fecha', sortable: true, width: "20%" },
      { text: 'Acciones', sortable: false, width: "5%"}
    ],

    rows_per_page_text: "Registros por pagina:",
    rows_per_page_items: [10, 15, 20, { 'text': 'Todos', 'value': -1 }],

    registrosMedicos: [],
    pacientes: [],
    
    // Array de strings en el siguiente formato: "NombrePaciente (NombreDuenio)"
    editedIndex: -1,
    editedItem: {
      id: '',
      paciente: '',
      paciente_id: '',
      cliente_id: '',
      fecha: '',
      anamnesia: '',
      peso: 0,
      temperatura: 0,
      hidratacion: '',
      pulso: 0,
      frecuencia_cardiaca: 0,
      frecuencia_respiratoria: 0,
      mucosas: 0,
      tiempo_de_llenado_capilar: 0,
      ganglios: '',
      reflejo_tusigeno: '',
      reflejo_deglutorio: '',
      palpitacion_abdominal: '',
      palmopercusion: '',
      condicion_corporal: '',
      tonsilas: '',
      conciencia: ''

    },
    defaultItem: {
      id: '',
      paciente: '',
      paciente_id: '',
      cliente_id: '',
      fecha: '',
      anamnesia: '',
      peso: 0,
      temperatura: 0,
      hidratacion: '',
      pulso: 0,
      frecuencia_cardiaca: 0,
      frecuencia_respiratoria: 0,
      mucosas: 0,
      tiempo_de_llenado_capilar: 0,
      ganglios: '',
      reflejo_tusigeno: '',
      reflejo_deglutorio: '',
      palpitacion_abdominal: '',
      palmopercusion: '',
      condicion_corporal: '',
      tonsilas: '',
      conciencia: ''
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
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
    initialize() {
      
        this.$http.get('http://192.168.0.33:3000/api/pacientes')
          .then(function(response) {
            this.pacientes = response.body;
            this.$http.get('http://192.168.0.33:3000/api/registros')
              .then(function(response) {
                this.registrosMedicos = response.body;
                console.log(this.registrosMedicos);
                this.registrosMedicos.forEach(registro => {
                  let paciente = this.pacientes.find(function(p) {
                    return p.id == registro.paciente_id;
                  });
                  console.log('paciente', paciente);
                  registro.paciente = paciente.nombre;
                });
            });
        });
    },

    editItem(item) {
      this.editedIndex = this.registrosMedicos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.registrosMedicos.indexOf(item)
      if (confirm('¿Estás seguro de que quieres eliminar el registro médico?') && this.registrosMedicos.splice(index, 1)) {
        this.$http.delete('http://192.168.0.33:3000/api/registros/' + item.id).then(
          function (response) {
            console.log(response);
          }
        );
      }
    },

    cleanedItem(item) {
      var newItem = JSON.parse(JSON.stringify(item));
      for (var propName in newItem) {
        if (newItem[propName] == null || !newItem[propName] || newItem[propName] == 0 || newItem[propName] == "") {
          delete newItem[propName];
        }
      }
      return newItem;
    },

    close: function () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedItem.id) {
        console.log("edited item");
        this.$http.put('http://192.168.0.33:3000/api/registros', this.cleanedItem(this.editedItem))
          .then(function (response) {
            console.log('updated reg', this.registrosMedicos);
            this.registrosMedicos.splice(this.editedIndex, 1, this.editedItem);
            console.log('registro de arreglo', this.registrosMedicos[this.editedIndex]);
            this.initialize();
          });
      } else {
        console.log("nuevo item", this.editedItem);
        delete this.editedItem.id;
        this.$http.post('http://192.168.0.33:3000/api/registros', this.cleanedItem(this.editedItem))
          .then(function (response) {
            console.log(this.registrosMedicos);
            this.registrosMedicos.push(response.body);
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