<template>
  <section>
    <div>
      <h1>{{ msg }}</h1>
      <h2>Select Tour Test</h2>
      <ul>
        <li v-for="(link, i) in links" :key="i">
          <a :href="`/test/${link.test}`">{{ link.test }}</a>
        </li>
     </ul>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Techolution Online Test',
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
