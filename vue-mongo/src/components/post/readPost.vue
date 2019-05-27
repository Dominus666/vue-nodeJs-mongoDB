<template>
  <v-container>
    <section mt-3 elevation-10>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <div class="post">
            <h4 class="post-title">{{ post.title }}</h4>
            <p class="post-description">{{ post.description }}</p>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    post () {
      const id = this.id
      return this.$store.getters.postById(id)
    }
  }
}
</script>
