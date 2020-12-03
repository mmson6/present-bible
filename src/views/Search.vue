<template>
  <div class="search">
    <BibleSearcher/>
  </div>
</template>

<script>

import BibleSearcher from '../components/BibleSearcher.vue'

export default {
  name: 'Search',
  components: {
    BibleSearcher,
  }
}
</script>
