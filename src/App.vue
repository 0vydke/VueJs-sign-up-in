<template>
<v-app id="inspire">
    <v-app-bar app>
      <router-link v-if="authenticated" to="/" v-on:click.native="logout()" replace>
        <button>Logout</button>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view @authenticated="setAuthenticated" :person-data="person"/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
      name: 'App',
      data() {
          return {
              authenticated: false,
              person: {
                name: "",
                email: ""
              }
          }
      },
      mounted() {
          if(!this.authenticated) {
            const path = "/LoginForm";
            if (this.$route.path !== path) this.$router.replace({ name: "LoginForm" });  
          }
      },
      methods: {
          setAuthenticated(status) {
              this.authenticated = status;
          },
          logout() {
              this.authenticated = false;
          }
      }
  }
</script>

<style lang="scss">

</style>
