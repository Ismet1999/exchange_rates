<template>
  <v-app>

    <v-navigation-drawer
        permanent
        expand-on-hover
        app
    >


      <v-divider></v-divider>

      <v-list
          nav
          dense
      >

        <v-list-item-group
        >
          <v-list-item link @click="$router.push({name :'exchanges'})">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Список валют</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push({name :'converter'})">
            <v-list-item-icon>
              <v-icon>mdi-currency-usd</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Конвертер</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
    <v-container class="mx-16" fluid app>
      <router-view/>
    </v-container>


  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
