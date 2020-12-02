<template>
    <div>
        <b-form-input autofocus ref="searchBar" type="text" v-model="searchQuery" v-on:change="handleUserSearch" placeholder="Genesis 1, 요 3:16, ps 119:9-11..."></b-form-input>
    </div>
</template>

<script>

import { ipcRenderer } from 'electron'

export default {
    name: "Search",
    created() {
        ipcRenderer.on('shortkey-message', (event, arg) => {
            if (arg == "search") {
                this.$refs.searchBar.focus();
            }
        })
    },
    data() {
        return {
            searchQuery: "",
        }
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