<template>
  <div id="app">
    <h1>HackerNews Tech Trends</h1>
    <TechFilter @checked="toggleTech" :techs="techs" />
    <div class="graph-container">
      <TechGraph :techs="generateTechs" />
    </div>
    <p style="text-decoration: underline; margin-bottom: 8px">How is this graph calculated?</p>
    <p style="margin-top: 8px">
      Data comes from the first page of each 'Who is hiring?' HackerNews thread every month. Each
      top-level comment is searched for matching technologies.
    </p>
  </div>
</template>

<script>
import TechGraph from './components/TechGraph.vue'
import TechFilter from './components/TechFilter.vue'
import { techs } from './utils'

// require('./data/generate')

export default {
  name: 'App',
  components: {
    TechGraph,
    TechFilter
  },
  data: function () {
    return {
      techs: Object.keys(techs).map(t => ({ name: t, label: techs[t].label, checked: false }))
    }
  },
  methods: {
    toggleTech(index) {
      this.techs[index].checked = !this.techs[index].checked
    }
  },
  computed: {
    // if all techs are unchecked (default) we display all
    generateTechs() {
      const checked = this.techs.filter(e => e.checked)

      if (checked.length <= 0) {
        return this.techs.map(e => e.name)
      } else {
        return checked.map(e => e.name)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.graph-container {
  width: 70%;
  margin: 50px auto;
}

@media screen and (max-width: 1000px) {
  .graph-container {
    width: 85%;
    margin: 40px auto;
  }
}

@media screen and (max-width: 600px) {
  .graph-container {
    width: 95%;
    margin: 30px auto;
  }
}
</style>
