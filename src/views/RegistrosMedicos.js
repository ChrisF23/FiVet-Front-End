export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Registro Médico',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Paciente', value: 'paciente' },
        { text: 'Fecha', value: 'fecha' }
      ],
      registrosMedicos: [],
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
        tiempo_de_llenado_capilar:0,
        ganglios: '',
        reflejo_tusigeno: '',
        reflejo_deglutorio: '',
        palpitacion_abdominal: '',
        palmopercusion: '',
        condicion_corporal:'',
        tonsilas:'',
        conciencia:''
      
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
        tiempo_de_llenado_capilar:0,
        ganglios: '',
        reflejo_tusigeno: '',
        reflejo_deglutorio: '',
        palpitacion_abdominal: '',
        palmopercusion: '',
        condicion_corporal:'',
        tonsilas:'',
        conciencia:''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          this.$http.get('http://localhost:3000/api/registro_medico')
            .then(function(response) {
              this.registrosMedicos = response.body;
          });
        },

      editItem (item) {
        this.editedIndex = this.registrosMedicos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.registrosMedicos.indexOf(item)
        if (confirm('¿Estás seguro que quieres eliminat el registro médico?') && this.registrosMedicos.splice(index, 1)){
          this.$http.delete('http://localhost:3000/api/registro_medico/' + item.id).then(
            function (response) {
              console.log(response);
            }
          );
        }
      },

      cleanedItem(item) {
        var newItem = JSON.parse(JSON.stringify(item));
          for (var propName in newItem) { 
            if (newItem[propName] == null || !newItem[propName] || newItem[propName] == 0) {
              delete newItem[propName];
            }
          }
          return newItem;
      },

      close: function() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },

      save () {
        if (this.editedItem.id) {
          console.log("edited item");
          this.registrosMedicos.push(this.editedItem)
        } else {
          console.log("nuevo item", this.editedItem);
          delete this.editedItem.id;
          this.editedItem.paciente_id = 1;
          this.editedItem.cliente_id = 1;
          this.$http.post('http://localhost:3000/api/registro_medico', this.cleanedItem(this.editedItem))
            .then(function(response) {
              console.log(this.registrosMedicos);
              this.registrosMedicos[this.editedIndex].push(response.body);
          });
        }
        this.close()
      }
    }
}