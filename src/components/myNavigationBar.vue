<template>
  <nav>
    <v-toolbar app class="primario">
      <!-- Al hacer click en el icono, el drawer cambia al estado contrario del actual -->
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title>
        <span>FiVet :</span>
        <span class="font-weight-light">Sistema de Control Veterinario</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout column>
        <GoogleLogin
          v-if="hayUsuario"
          :client_id="client_id"
          :onSuccess="onLoginSuccess"
          :onFailure="onLoginFailure"
          :logoutButton="true"
        ></GoogleLogin>
        <div>{{UsuarioActual}}</div>
      </v-layout>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="secundario">
      <v-list>
        <!-- Renderiza un nuevo tile en la lista por cada link en links. -->
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icono }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.texto }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import GoogleLogin from "../components/vue-google-login/src/GoogleLogin.vue";
export default {
  components: {
    GoogleLogin
  },

  data() {
    return {
      // Por defecto, el drawer se encuentra escondido (false).
      client_id:
        "522114999150-8bao53rb2r1vmeufbveuoqh9j0c9cvu9.apps.googleusercontent.com",
      hayUser: false,

      drawer: false,

      // La lista de links. Los iconos se obtienen de https://material.io/tools/icons/.
      links: [
        { icono: "dashboard", texto: "Inicio", route: "/" },
        { icono: "pets", texto: "Pacientes", route: "/pacientes" },
        { icono: "face", texto: "Clientes", route: "/clientes" },
        {
          icono: "description",
          texto: "Registros Medicos",
          route: "/registros"
        }
      ]
    };
  },

  methods: {
    onLoginSuccess(googleUser) {
      this.$session.destroy();
      this.$session.clear();
      this.$router.push("/login");
    },

    onLoginFailure() {
      this.LoginFailure = true;
    },

    hasUser() {
      return this.$session.has("fivet-user");
    }
  },

  computed: {
    // a computed getter
    UsuarioActual: function() {
      if (this.$session.has("fivet-user")) {
        return this.$session.get("fivet-user");
      }
      return "";
    },

    hayUsuario: function() {
      return this.$session.has("fivet-user");
    }
  },

  mounted() {
    this.$root.$on("user_login", data => {
      this.$forceUpdate();
    });
  }
};
</script>
