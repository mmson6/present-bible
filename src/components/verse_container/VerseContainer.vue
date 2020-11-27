<template>
    <b-row>
        <b-col></b-col>
        <b-col cols="10" class="text-left">
            <b-row class="verseInfo">
                <b-col cols="4">
                    <span>{{versesInfo}}</span>
                </b-col>
            </b-row>
            <br>
            <template v-for="verseHash in nkjvHash.searchedVersesHash">
                <Verse :key="verseHash.verseNumber" v-bind:verseHash="verseHash"/>
            </template>
        </b-col>
        <b-col></b-col>
    </b-row>
</template>

<script>

import Verse from './Verse.vue'

export default {
    name: 'VerseContainer',
    props: {
        nkjvHash: Object
    },
    data() {
        return {
        }
    },
    computed: {
        versesInfo() {
            if (this.nkjvHash.book == undefined || this.nkjvHash.invalidSearch == true) {
                return ""
            }

            return `${this.camelize(this.nkjvHash.book)} ${this.nkjvHash.chapter}:${this.nkjvHash.verses}`
        }
    },
    components: {
        Verse,
    },
    methods: {
        camelize(str) {
            if (str == undefined) {
                return ""
            }
            
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word) {
                return word.toUpperCase()
            })
        },
    }
}
</script>

<style scoped>

.verseInfo {
    color: white;
    font-size: 20px;
}

</style>