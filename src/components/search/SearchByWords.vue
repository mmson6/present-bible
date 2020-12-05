<template>
    <b-input-group>
        <b-form-input autofocus class="search-input" ref="searchBar" type="text" v-model="searchQuery" @keydown.native="handleUserSearch" placeholder="Search the Scripture..."></b-form-input>
        <template #append>
            <!-- <b-dropdown text="Dropdown" variant="outline-secondary" v-for="i in 2" :key="i"> -->
            <b-dropdown class="dropDownBibleItem" v-bind:text="selectedBible" variant="warning">
                <b-dropdown-item v-on:click="bibleSelected"  style="color: white;" v-for="i in countSupportedBibles" :key="i">
                    {{bibleFullTitle(i)}}
                </b-dropdown-item>
            </b-dropdown>
        </template>
    </b-input-group>
</template>

<script>

import { ipcRenderer } from 'electron'
import Constants from '../../constants/constants'

export default {
    name: "SearchByWords",
    created() {
        ipcRenderer.on('shortkey-message', (event, arg) => {
            if (arg == "search") {
                this.$refs.searchBar.focus();
            }
        })
    },
    props: {
        selectedBible: String,
        searchType: String,
    },
    data() {
        return {
            searchQuery: "",
        }
    },
    methods: {
        bibleSelected(e) {
            if (e.target.text.trim() == this.bibleFullTitle(1)) {
                this.$emit('updateSelectedBible', Constants.SupportedBibles[0])
                this.updateSearchType()
            } else if (e.target.text.trim() == this.bibleFullTitle(2)) {
                this.$emit('updateSelectedBible', Constants.SupportedBibles[1])
                this.updateSearchType()
            } else if (e.target.text.trim() == this.bibleFullTitle(3)) {
                this.$emit('updateSelectedBible', Constants.SupportedBibles[2])
                this.updateSearchType()
            }
        },
        updateSearchType() {
            this.$emit('updateSearchType')
        },
        handleUserSearch(e) {
            // only handle 'Enter' key 
            if (e.which === 13) {
                if (this.searchQuery.length > 1) {
                    this.$emit('searchVerses', this.searchQuery)               
                }
            }
        },
        bibleFullTitle(index) {
            return `${Constants.SupportedBibles[index-1]} (${Constants.Abbreviation[Constants.SupportedBibles[index-1]]})`
        },
    },
    computed: {
        countSupportedBibles() {
            return Constants.SupportedBibles.length
        },
        currentRoute() {
            return this.$route.name;
        }
    }
}
</script>

<style scoped>

.search-input {
    min-width: 330px;
}

.dropDownBibleItem {
    width: 210px;
}

</style>