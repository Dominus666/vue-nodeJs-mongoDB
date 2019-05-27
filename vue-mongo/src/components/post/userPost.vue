<template>
  <div>
    <v-layout row wrap >
      <v-flex xs12 sm6 md4 lg3 padding-custom v-for="(post, i) in userPosts" :key="i">
        <v-card class="card-custom">

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ post.title }}</h3>
              <p>{{ post.description.substring(0,60) }}...</p>
              <span>{{ post.author }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <app-edit-post :post="post"></app-edit-post>
            <v-spacer></v-spacer>
            <v-btn flat @click="deletePost(post._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      </v-layout>
  </div>
</template>

<script>
  import EditPost from './editPost'
  export default {
    methods: {
      deletePost (post) {
        this.$store.dispatch('deletePost', post)
      }
    },
    computed: {
      userPosts() {
        return this.$store.getters.userPosts
      }
    },
    components: {
      appEditPost: EditPost
    }
  }
</script>