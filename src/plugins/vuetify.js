import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  
  // Aqui van los colores del tema.
  theme : {
    primario : "#52CD10",
    secundario : "#393424",
    extra1 : "#47682C",
    extra2 : "#EF3054",
  }
})
