<template>
  <section>
    <div>
      <h1 v-once> {{msg}}</h1>
      <h2>Select Tour Test</h2>
      <ul>
        <li v-for="(link, i) in links" :key="i">
          <!-- <a :href="`/test/${link.name}`">{{ `${link.name} Developer`  }}</a> -->
          <router-link :to="`/test/${link.name}`">{{ `${link.name} Developer`  }}</router-link>
        </li>
     </ul>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "dashboard",
  created() {
    this.routeValidations();
  },
  beforeRouteLeave(to, from, next) {
    if(to.path === '/') {
      next(false)
    } else {
      next()
    }
  },
  data() {
    return {
      msg: "Online Test"
    };
  },
  computed: {
    links: function() {
      return (
        (this.$store.state.examTypes.length && this.$store.state.examTypes) || [
          { name: "UI" }
        ]
      );
    }
  },
  methods: {
    updateTypes() {
      this.$store.dispatch("updateTypes");
    },
    routeValidations() {
      if (!this.$store.state.isAuthenticated) {
        this.$router.push("/");
      } else {
        this.updateTypes();
      }
    }
  }
};
</script>
  
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
