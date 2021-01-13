<template>
    <b-row>
        <div v-show="showResultResultInfo" class="verseInfo text-left">
            <div class="search-result-info">
                <span><b>{{searchResultVersesCount}}</b> results from <b>{{searchBibleType}}</b></span>
            </div>
            <div class="filter-btn col-sm-0">
                <span style="padding-right: 10px;">Filter by :</span>
                <b-dropdown v-bind:text="selectedSection" variant="outline-secondary">
                    <b-dropdown-item v-on:click="allSectionsClicked">
                        {{allSectionsText}}
                    </b-dropdown-item>
                    <div class="dropdown-divider"></div>
                    <b-dropdown-item v-show="OTSectionCount > 0" v-on:click="OTSectionClicked">
                        {{OTSectionText}}
                    </b-dropdown-item>
                    <b-dropdown-item v-show="NTSectionCount > 0" v-on:click="NTSectionClicked">
                        {{NTSectionText}}
                    </b-dropdown-item>
                </b-dropdown>
                <div style="display: inline-block; width: 15px"></div>
                <b-dropdown v-bind:text="selectedBook" variant="outline-secondary">
                    <b-dropdown-item v-on:click="allBooksClicked">
                        {{allBooksText}}
                    </b-dropdown-item>
                    <div v-show="!this.NTSectionSelected">
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item v-on:click="bookClicked(OTBookData.bname, OTBookData.bnumber)" :key="OTBookData.bname" v-for="OTBookData in OTSectionBookCountHash">
                            <span>{{SectionBookText(OTBookData.bname, OTBookData.bookCount)}}</span>
                        </b-dropdown-item>
                    </div>
                    <div v-show="!this.OTSectionSelected">
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item v-on:click="bookClicked(NTBookData.bname, NTBookData.bnumber)" :key="NTBookData.bname" v-for="NTBookData in NTSectionBookCountHash">
                            <span>{{SectionBookText(NTBookData.bname, NTBookData.bookCount)}}</span>
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
            </div>
        </div>
        <br>
        <b-row class="verse-padding">
            <b-col v-show="showVersesPaddingColumns"></b-col>
            <b-col v-bind:cols="versesColumnSize" class="text-left">
                <div v-show="showBookFiltered">
                    <template v-for="verseHash in bookFilteredHash.searchedVersesHash">
                        <SearchVerse :key="verseHash.index" 
                                v-bind:verseHash="verseHash"
                                v-bind:verseFontSize="fontSize"
                                v-bind:showNKJV="showNKJV"
                                v-bind:showRVR="showRVR"
                                v-bind:showKYHG="showKYHG"/>
                    </template>
                </div>
                <div v-show="showSectionFiltered">
                    <template v-for="verseHash in sectionFilteredHash.searchedVersesHash">
                        <SearchVerse :key="verseHash.index" 
                                v-bind:verseHash="verseHash"
                                v-bind:verseFontSize="fontSize"
                                v-bind:showNKJV="showNKJV"
                                v-bind:showRVR="showRVR"
                                v-bind:showKYHG="showKYHG"/>
                    </template>
                </div>
                <div v-show="showAllVerses" >
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
    props: ["searchBibleType", "searchBibleHash", "versesColumnSize", "fontSize",
    "showNKJV", "showRVR", "showKYHG", "bus"],
    components: {
        SearchVerse,
    },
    data() {
        return {
            bookSelected: false,
            OTSectionSelected: false,
            NTSectionSelected: false,
            allSectionsSelected: true,
            allBooksSelected: true,
            selectedBook: "All Books",
            selectedSection: "All Sections",
            bookFilteredHash: [],
            sectionFilteredHash: [],
        }
    },
    created() {
        this.bus.$on('resetSearch', () => {
            this.allSectionsSelected = true
            this.allBooksSelected = true
            this.OTSectionSelected = false
            this.NTSectionSelected = false
            this.bookSelected = false
            this.selectedBook = "All Books"
            this.selectedSection = "All Sections"
        });
    },
    computed: {
        showAllVerses() {
            if (this.allBooksSelected == true && this.allSectionsSelected == true) {
                return true
            } else {
                return false
            }
        },
        showBookFiltered() {
            if (this.allBooksSelected == false) {
                return true
            } else {
                return false
            }
        },
        showSectionFiltered() {
            if (this.allBooksSelected == true && this.allSectionsSelected == false) {
                return true
            } else {
                return false
            }
        },
        OTSectionCount() {
            return this.searchBibleHash.OTCount
        },
        NTSectionCount() {
            return this.searchBibleHash.NTCount
        },
        OTSectionBookCountHash() {
            if (this.NTSectionSelected == true) { return [] }

            const OTBooks = this.getAllOTBooks()

            let filtered = {}
            OTBooks.forEach((item) => {
                if (Object.prototype.hasOwnProperty.call(filtered, item.book)) {
                    filtered[item.book] = { bookCount: filtered[item.book].bookCount + 1, bnumber: item.bnumber }
                } else {
                    filtered[item.book] = { bookCount: 1, bnumber: item.bnumber }
                }
            })
            
            let toArray = []
            for (const key in filtered) {
                toArray.push({ bname: key, bookCount: filtered[key].bookCount, bnumber: filtered[key].bnumber })
            }

            return toArray
        },
        NTSectionBookCountHash() {
            if (this.OTSectionSelected == true) { return [] }

            const NTBooks = this.getAllNTBooks()

            let filtered = {}
            NTBooks.forEach((item) => {
                if (Object.prototype.hasOwnProperty.call(filtered, item.book)) {
                    filtered[item.book] = { bookCount: filtered[item.book].bookCount + 1, bnumber: item.bnumber }
                } else {
                    filtered[item.book] = { bookCount: 1, bnumber: item.bnumber }
                }
            })
            
            let toArray = []
            for (const key in filtered) {
                toArray.push({ bname: key, bookCount: filtered[key].bookCount, bnumber: filtered[key].bnumber })
            }

            return toArray
        },
        allSectionsText() {
            return `All Sections (${this.searchResultVersesCount})`
        },
        OTSectionText() {
            return `Old Testament (${this.OTSectionCount})`
        },
        NTSectionText() {
            return `New Testament (${this.NTSectionCount})`
        },
        allBooksText() {
            if (this.allSectionsSelected) {
                return `All Books (${this.searchResultVersesCount})`
            } else if (this.OTSectionSelected) {
                return `All Books (${this.OTSectionCount})`
            } else {
                return `All Books (${this.NTSectionCount})`
            }
        },
        showResultResultInfo() {
            return this.searchBibleHash.searchedVersesHash != undefined
        },
        searchResultVersesCount() {
            if (this.searchBibleHash.searchedVersesHash == undefined) { return }

            return this.searchBibleHash.searchedVersesHash.length
        },
        showVersesPaddingColumns() {
            return this.versesColumnSize != 12
        },
    },
    methods: {
        SectionBookText(bname, bookCount) {
            return `${bname} (${bookCount})`
        },
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
        bookClicked(bname, bnumber) {
            this.allBooksSelected = false
            this.bookSelected = true
            this.selectedBook = bname
            
            if (this.searchBibleHash.searchedVersesHash == undefined) { return [] }

            let filtered = []
            this.searchBibleHash.searchedVersesHash.forEach((item) => {
                if (item.bnumber == bnumber) {
                    filtered.push(item)
                }
            })

            this.bookFilteredHash.searchedVersesHash = filtered
        },
        allBooksClicked() {
            this.allBooksSelected = true
            this.bookSelected = false
            this.selectedBook = "All Books"
        },
        allSectionsClicked() {
            if (this.bookSelected && !this.allSectionsSelected) {
                this.allBooksClicked()
            }
            
            this.allSectionsSelected = true
            this.OTSectionSelected = false
            this.NTSectionSelected = false
            this.selectedSection = "All Sections"
        },
        OTSectionClicked() {
            if (this.bookSelected && !this.OTSectionSelected) {
                this.allBooksClicked()
            }

            this.allSectionsSelected = false
            this.OTSectionSelected = true
            this.NTSectionSelected = false
            this.selectedSection = "Old Testament"

            this.sectionFilteredHash.searchedVersesHash = this.getAllOTBooks()
        },
        NTSectionClicked() {
            if (this.bookSelected && !this.NTSectionSelected) {
                this.allBooksClicked()
            }
            
            this.allSectionsSelected = false
            this.OTSectionSelected = false
            this.NTSectionSelected = true
            this.selectedSection = "New Testament"

            this.sectionFilteredHash.searchedVersesHash = this.getAllNTBooks()
        },
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