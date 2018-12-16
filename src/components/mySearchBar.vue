<template>
  <v-autocomplete
    v-model="model"
    :items="states"
    label="Busque un paciente."
    persistent-hint
    prepend-icon="pets"
  >
    <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
    </v-slide-x-reverse-transition>
  </v-autocomplete>
</template>
