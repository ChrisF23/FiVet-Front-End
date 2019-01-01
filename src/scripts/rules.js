const utils = require('../Utils')

export default {
    common_rules: {
        no_vacio: [
            v => !!v || 'El campo es obligatorio',
        ],

        correo: [
            v => !!v || 'El campo es obligatorio',
            v => /.+@.+/.test(v) || 'Debe ingresar un correo valido'
        ],

        rut: [
            v => utils.checkRut(v) || 'Debe ingresar un RUT valido'
        ]
    
    }
}