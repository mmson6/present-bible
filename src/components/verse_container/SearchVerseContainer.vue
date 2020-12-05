<template>
    <b-row>
        <div v-show="showResultResultInfo" class="verseInfo text-left">
            <div class="search-result-info">
                <span><b>{{searchResultCount}}</b> results from <b>{{searchBibleType}}</b></span>
            </div>
            <div class="filter-btn col-sm-0">
                <span style="padding-right: 10px;">Filter by :</span>
                <b-dropdown v-bind:text="selectedSection" variant="outline-secondary">
                    <b-dropdown-item v-on:click="allSectionsSelected">
                        {{allSections}}
                    </b-dropdown-item>
                    <div class="dropdown-divider"></div>
                    <b-dropdown-item v-show="oldTestamentCount > 0" v-on:click="OTbibleSectionSelected">
                        {{oldTestamentSection}}
                    </b-dropdown-item>
                    <b-dropdown-item v-show="newTestamentCount > 0" v-on:click="NTbibleSectionSelected">
                        {{newTestamentSection}}
                    </b-dropdown-item>
                </b-dropdown>
                <div style="display: inline-block; width: 15px"></div>
                <b-dropdown text="All Books" variant="outline-secondary">
                    <b-dropdown-item v-on:click="allBooksSelected">
                        {{allBooks}}
                    </b-dropdown-item>
                    <!-- <b-dropdown-item v-on:click="filterBookSelected" v-for="hashData in availableBookFilters" :key="hashData.bname">
                        <span>{{hashData.bname}}</span>
                    </b-dropdown-item> -->
                    <!-- <b-dropdown-item>Action C</b-dropdown-item>
                    <div class="dropdown-divider"></div>
                    <b-dropdown-item>Action D</b-dropdown-item> -->
                </b-dropdown>
            </div>
        </div>
        <br>
        <b-row class="verse-padding">
            <b-col v-show="showVersesPaddingColumns"></b-col>
            <b-col v-bind:cols="versesColumnSize" class="text-left">
                <div v-show="showFilteredVerses">
                    <template v-for="verseHash in filteredSectionHash.searchedVersesHash">
                        <SearchVerse :key="verseHash.index" 
                                v-bind:verseHash="verseHash"
                                v-bind:verseFontSize="fontSize"
                                v-bind:showNKJV="showNKJV"
                                v-bind:showRVR="showRVR"
                                v-bind:showKYHG="showKYHG"/>
                    </template>
                </div>
                <div v-show="!showFilteredVerses" >
                    <template v-for="verseHash in searchBibleHash.searchedVersesHash">
                        <SearchVerse :key="verseHash.index" 
                                v-bind:verseHash="verseHash"
                                v-bind:verseFontSize="fontSize"
                                v-bind:showNKJV="showNKJV"
                                v-bind:showRVR="showRVR"
                                v-bind:showKYHG="showKYHG"/>
                    </template>
                </div>
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
        searchBibleType: String,
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
            selectedBook: "All Books",
            selectedSection: "All Sections",
            filteredBookHash: [],
            filteredSectionHash: [],
            showFilteredVerses: false,
            OTSectionSelected: false,
            NTSectionSelected: false
        }
    },
    computed: {
        // availableBookFilters() {
        //     // let filtered = {}
        //     // console.log("m111?")
        //     // this.searchBibleHash.searchedVersesHash.forEach((item) => {
        //     //     if (Object.prototype.hasOwnProperty.call(filtered, item.book)) {
        //     //         filtered[item.book] = filtered[item.book] + 1
        //     //     } else {
        //     //         filtered[item.book] = 1
        //     //     }
        //     // })
        //     // console.log("m222?")
        //     // let toArray = []
        //     // for (let key in Object.keys(filtered)) {
        //     //     toArray.push({ bname: key, count: filtered[key]})
        //     // }

        //     // return toArray
        //     return 2
        // },
        // filteredData() {
        //     return this.filteredSectionHash
        // },
        allBooks() {
            let finalLength = 0
            console.log("mike called allBooks() entry")
            if (this.showFilteredVerses) {
                console.log("mike called allBooks()")
                if (this.filteredSectionHash.searchedVersesHash == undefined) { return }
                console.log("mike called allBooks() 2222")
                finalLength = this.filteredSectionHash.searchedVersesHash.length
            } else {
                finalLength = this.getAllOTBooks().length + this.getAllNTBooks().length
            }
            
            return `All Books (${finalLength})`
        },
        allSections() {
            return `All Sections (${this.searchResultCount})`
        },
        oldTestamentSection() {
            return `Old Testament (${this.oldTestamentCount})`
        },
        newTestamentSection() {
            return `New Testament (${this.newTestamentCount})`
        },
        oldTestamentCount() {
            return this.searchBibleHash.OTCount
        },
        newTestamentCount() {
            return this.searchBibleHash.NTCount
        },
        showResultResultInfo() {
            return this.searchBibleHash.searchedVersesHash != undefined
        },
        searchResultCount() {
            if (this.searchBibleHash.searchedVersesHash != undefined) {
                return this.searchBibleHash.searchedVersesHash.length
            } else {
                return ""
            }
        },
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
    },
    methods: {
        getAllOTBooks() {
            if (this.searchBibleHash.searchedVersesHash == undefined) { return [] }

            let filtered = []
            this.searchBibleHash.searchedVersesHash.forEach((item) => {
                if (item.bnumber < 40) {
                    filtered.push(item)
                }
            })
            return filtered
        },
        getAllNTBooks() {
            if (this.searchBibleHash.searchedVersesHash == undefined) { return [] }
            
            let filtered = []
            this.searchBibleHash.searchedVersesHash.forEach((item) => {
                if (item.bnumber >= 40) {
                    filtered.push(item)
                }
            })
            return filtered
        },
        filterBookSelected() {
        },
        allBooksSelected() {
            this.selectedBook = "All Books"
            // this.showFilteredVerses = 
        },
        allSectionsSelected() {
            this.selectedSection = "All Sections"
            this.showFilteredVerses = false
            this.OTSectionSelected = false
            this.NTSectionSelected = false
        },
        OTbibleSectionSelected() {
            this.filteredSectionHash.searchedVersesHash = this.getAllOTBooks()
            this.showFilteredVerses = true
            this.OTSectionSelected = true
            this.NTSectionSelected = false
            this.selectedSection = "Old Testament"
            this.$forceUpdate()
        },
        NTbibleSectionSelected() {
            this.filteredSectionHash.searchedVersesHash = this.getAllNTBooks()
            this.showFilteredVerses = true
            this.OTSectionSelected = false
            this.NTSectionSelected = true
            this.selectedSection = "New Testament"
            this.$forceUpdate()
        },
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

.filter-btn {
    display: inline-block;
    float: right;
    margin-right: 100px;
}

.search-result-info {
    display: inline-block;
    padding-bottom: 10px;
}
</style>