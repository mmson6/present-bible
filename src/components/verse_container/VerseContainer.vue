<template>
    <b-row>
        <b-col></b-col>
        <b-col cols="10" class="text-left">
            <b-row class="verseInfo">
                <b-col>
                    <span>{{nkjvVersesInfo}}</span><span style="margin-left: 25px; margin-right: 25px;">{{infoSplitter}}</span><span class="spn-verse">{{rvrVersesInfo}}</span>
                </b-col>
            </b-row>
            <br>
            <template v-for="verseHash in bibleHash.searchedVersesHash">
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
        nkjvHash: Object,
        bibleHash: Object
    },
    data() {
        return {
        }
    },
    computed: {
        infoSplitter() {
            if (this.nkjvVersesInfo != "") {
                return "|"
            }
            return ""
        },
        nkjvVersesInfo() {
            if (this.bibleHash.book == undefined || this.bibleHash.invalidSearch == true) {
                return ""
            }
console.log(JSON.stringify(this.bibleHash))
            return `${this.camelize(this.bibleHash.book.nkjv)} ${this.bibleHash.chapter}:${this.bibleHash.verses}`
        },
        rvrVersesInfo() {
            if (this.bibleHash.book == undefined || this.bibleHash.invalidSearch == true) {
                return ""
            }
console.log(JSON.stringify(this.bibleHash))
            return `${this.camelize(this.bibleHash.book.rvr)} ${this.bibleHash.chapter}:${this.bibleHash.verses}`
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
.spn-verse{
    /* align-content: left; */
    color: yellow;
    /* font-size: 20px; */
}

</style>