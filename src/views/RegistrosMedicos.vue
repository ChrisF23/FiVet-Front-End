<template>
  <div class="registros">
    <h1>Registros Medicos</h1>
  </div>
</template>

<script src= '../scripts/RegistrosMedicos'>
</script>
<!-- Antiguo. TODO: Actualizar esta vista. -->
<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Registros Médicos</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <dialogAgregarRegistroMedico/>

    </v-toolbar>
    <tablaRegistros></tablaRegistros>
  </div>
</template>
