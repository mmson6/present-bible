<template>
    <b-row>
        <div class="verseInfo text-left">
            <!-- <span v-show="showNKJV">{{nkjvVersesInfo}}</span> -->
            <span v-show="showFirstInfoSplitter" style="margin-left: 25px; margin-right: 25px;">{{infoSplitter}}</span>
            <!-- <span v-show="showKYHG" v-bind:style="{ color: kyhgVerseColor }">{{kyhgVersesInfo}}</span> -->
            <span v-show="showSecondInfoSplitter" style="margin-left: 25px; margin-right: 25px;">{{infoSplitter}}</span>
            <!-- <span v-show="showRVR" v-bind:style="{ color: rvrVerseColor }">{{rvrVersesInfo}}</span> -->
        </div>
        <br>
        <b-row class="verse-padding">
            <b-col v-show="showVersesPaddingColumns"></b-col>
            <b-col v-bind:cols="versesColumnSize" class="text-left">
                <template v-for="verseHash in searchBibleHash.searchedVersesHash">
                    <SearchVerse :key="verseHash.index" 
                            v-bind:verseHash="verseHash"
                            v-bind:verseFontSize="fontSize"
                            v-bind:showNKJV="showNKJV"
                            v-bind:showRVR="showRVR"
                            v-bind:showKYHG="showKYHG"/>
                </template>
            </b-col>
            <b-col v-show="showVersesPaddingColumns"></b-col>
        </b-row>
    </b-row>
</template>

<script>

import SearchVerse from './SearchVerse.vue'

export default {
    name: 'SearchVerseContainer',
    props: {
        searchBibleHash: Object,
        versesColumnSize: Number,
        fontSize: Number,
        showNKJV: Boolean,
        showRVR: Boolean,
        showKYHG: Boolean,
    },
    components: {
        SearchVerse,
    },
    data() {
        return {
        }
    },
    computed: {
        rvrVerseColor() {
            if (this.showNKJV == false && this.showKYHG == false) { return "white" }
            
            return "yellow"
        },
        kyhgVerseColor() {
            if (this.showNKJV == true) {
                return "#ecd3b2"
            } else {
                return "white"
            }
        },
        showVersesPaddingColumns() {
            return this.versesColumnSize != 12
        },
        showFirstInfoSplitter() {
            if (this.showNKJV == true && (this.showKYHG == true || this.showRVR == true)) { return true }
            if (this.showKYHG == false && this.showRVR == false) { return false }
            
            return false
        },
        showSecondInfoSplitter() {
            var count = 0
            if (this.showNKJV) { count++ }
            if (this.showRVR) { count++ }
            if (this.showKYHG) { count++ }

            return count == 3 || (this.showNKJV == false && this.showKYHG == true && this.showRVR == true)
        },
        infoSplitter() {
            if (this.nkjvVersesInfo != "") {
                return "|"
            }
            return ""
        },
        // nkjvVersesInfo() {
        //     console.log("mike 1")
        //     if (this.bibleHash.book == undefined || this.bibleHash.invalidSearch == true) {
        //         return ""
        //     }

        //     if (this.bibleHash.verses == "") {
        //         return `${this.camelizeNKJV(this.bibleHash.book.nkjv)} ${this.bibleHash.chapter}`
        //     } else {
        //         return `${this.camelizeNKJV(this.bibleHash.book.nkjv)} ${this.bibleHash.chapter}:${this.bibleHash.verses}`
        //     }
        // },
        // rvrVersesInfo() {
        //     console.log("mike 2")
        //     if (this.bibleHash.book == undefined || this.bibleHash.invalidSearch == true) {
        //         return ""
        //     }

        //     if (this.bibleHash.verses == "") {
        //         return `${this.camelizeRVR(this.bibleHash.book.rvr)} ${this.bibleHash.chapter}`
        //     } else {
        //         return `${this.camelizeRVR(this.bibleHash.book.rvr)} ${this.bibleHash.chapter}:${this.bibleHash.verses}`
        //     }
        // },
        // kyhgVersesInfo() {
        //     console.log("mike 3")
        //     if (this.bibleHash.book == undefined || this.bibleHash.invalidSearch == true) {
        //         return ""
        //     }

        //     if (this.bibleHash.verses == "") {
        //         return `${this.bibleHash.book.kyhg} ${this.bibleHash.chapter}`
        //     } else {
        //         return `${this.bibleHash.book.kyhg} ${this.bibleHash.chapter}:${this.bibleHash.verses}`
        //     }
            
        // }
    },
    methods: {
        camelizeNKJV(str) {
            if (str == undefined) { return "" }
            
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word) {
                return word.toUpperCase()
            })
        },
        camelizeRVR(str) {
            if (str == undefined) { return "" }

            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                return (index === 0) ? word.toUpperCase() : word.toLowerCase()
            })
        }
    }
}
</script>

<style scoped>

.verseInfo {
    width: 100%;
    margin-left: 10%;
    color: white;
    font-size: 20px;
}

.verse-padding {
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
}

</style>