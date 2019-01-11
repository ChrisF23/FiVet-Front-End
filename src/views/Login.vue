<template>
  <div>
    <v-layout :align-center="true" column>
      <img src="../assets/logo.png">

      <GoogleLogin
        :client_id="client_id"
        :onSuccess="onLoginSuccess"
        :onFailure="onLoginFailure"
      >Login</GoogleLogin>
    </v-layout>
  </div>
</template>
<script>
import GoogleLogin from "../components/vue-google-login/src/GoogleLogin.vue";
export default {
  components: {
    GoogleLogin
  },
  data: () => ({
    client_id:
      "522114999150-8bao53rb2r1vmeufbveuoqh9j0c9cvu9.apps.googleusercontent.com",
    LoginFailure: false,
    google: null
  }),

  methods: {
    onLoginSuccess(googleUser) {
      this.$http
        .get("http://localhost:3000/api/usuarios")
        .then(function(response) {
          var usuariosRegistrados = response.body.map(function(item) {
            return item.email;
          });
          var emailUsuario = googleUser.getBasicProfile().U3;
          //Si el usuario loggeado esta entre los usuarios registrados
          if (usuariosRegistrados.indexOf(emailUsuario) > -1) {
            this.$session.set("jwt", googleUser.getBasicProfile().U3)
            this.google = true
            this.$router.push("/");
          }
        });
    },

    onLoginFailure() {
      this.LoginFailure = true;
    }
  }
};
</script>