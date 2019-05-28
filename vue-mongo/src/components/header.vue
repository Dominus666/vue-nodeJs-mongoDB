<template>
  <div>
    <v-navigation-drawer 
      app
      temporary
      v-model="sideNav">
          <v-list>
            <v-list-tile
              flat v-for="(link, i) in links" 
              :key="i" 
              :to="link.url"
            >
              <v-list-tile-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="link.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="this.user != null" @click="logOut">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="'Log-Out'"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
   </v-content>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      links () {
        if(this.user != null) {
          return [
            {title: 'Home', icon: 'home', url: '/'},
            {title: 'Create Post', icon: 'add', url: '/create-post'},
            {title: 'User Post', icon: 'list', url: '/user-post'},
          ]  
        } else {
          return [
            {title: 'Home', icon: 'home', url: '/'},
            {title: 'Registration', icon: 'face', url: '/registration'},
            {title: 'Login', icon: 'account_box', url: '/login'}
          ]
        }
        
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('logOut', null).then(() => {
          this.$router.push('/')
        }).catch(() => {})
      }
    }
  }
</script>