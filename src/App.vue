<!-- Vista general de la app. Contiene un toolbar y la vista del router. -->
<template>
  <v-app class="grey lighten-3">
    <!-- Utilizar mi navigationbar -->
    <navigationBar></navigationBar>
    <!-- 
      El contenido sera la vista del router.
      Aplica un margen de 4 a los bordes laterales y un margen de 2 al borde superior e inferior.
      Mas info: https://vuetifyjs.com/en/layout/spacing
    -->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

// Importar mi toolbar.
import navigationBar from '@/components/myNavigationBar'

export default {
  name: 'App',

  components :{
    navigationBar
  },

  data () {return {}}
}
</script>
