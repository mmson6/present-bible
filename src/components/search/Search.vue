<template>
    <div>
        <b-form-input v-model="searchQuery" v-on:change="handleUserSearch" placeholder="Genesis 1:1.."></b-form-input>
    </div>
</template>

<script>
export default {
    name: "Search",
    data() {
        return {
            searchQuery: "",
        }
    },

    created() {

    },

    methods: {
        handleUserSearch() {
            this.$emit('showSearchedVerses', this.searchQuery)
        }
    },

    computed: {
    }
}
</script>