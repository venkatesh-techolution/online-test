<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <a :href="`test/${link.test}`" @click="selectedTest = link.test">{{ link.test }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Techolution Online Test',
      selectedTest: undefined,
      links: [
        {
          test: 'UI Developer',
          description: 'UI Developer'
        },
        {
          test: 'Java Developer',
          description: 'Java Developer'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
