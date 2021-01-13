<template>
    <b-container fluid>
        <div>
            <b-navbar toggleable="lg" type="dark">
                <label id="font-size-down-btn" v-on:click="fontSizeDown" class="setting-btn">
                    <b-tooltip target="font-size-down-btn" delay="700" 
                    variant="info" noninteractive>Decrease font size</b-tooltip>
                    <v-icon color="#ececec" size="25">mdi-format-font-size-decrease</v-icon>
                </label>
                <label id="font-size-reset-btn" v-on:click="fontSizeReset" class="setting-btn">
                    <b-tooltip target="font-size-reset-btn" delay="700" 
                    variant="info" noninteractive>Reset font size</b-tooltip>
                    <v-icon color="#ececec" size="25">mdi-restart</v-icon>
                </label>
                <label id="font-size-up-btn" v-on:click="fontSizeUp" class="setting-btn">
                    <b-tooltip target="font-size-up-btn" delay="700" 
                    variant="info" noninteractive>Increase font size</b-tooltip>
                    <v-icon color="#ececec" size="25">mdi-format-font-size-increase</v-icon>
                </label>
                <label class="setting-btn-filler"></label>
                <label id="verse-width-down-btn" v-on:click="sidePaddingBigger" class="setting-btn">
                    <b-tooltip target="verse-width-down-btn" delay="700" 
                    variant="info" noninteractive>Decrease verse width</b-tooltip>
                    <v-icon color="#ececec" size="32">mdi-unfold-less-vertical</v-icon>
                </label>
                <label id="verse-width-reset-btn" v-on:click="sidePaddingReset" class="setting-btn">
                    <b-tooltip target="verse-width-reset-btn" delay="700" 
                    variant="info" noninteractive>Reset verse width</b-tooltip>
                    <v-icon color="#ececec" size="25">mdi-restart</v-icon>
                </label>
                <label id="verse-width-up-btn" v-on:click="sidePaddingSmaller" class="setting-btn">
                    <b-tooltip target="verse-width-up-btn" delay="700" 
                    variant="info" noninteractive>Increase verse width</b-tooltip>
                    <v-icon color="#ececec" size="32">mdi-unfold-more-vertical</v-icon>
                </label>
            </b-navbar>
        </div>
        <b-row>
            <b-col></b-col>
            <b-col cols="8">
                <SearchByWords @searchVerses="handleSearchRequest"
                               @updateSearchType="updateSearchType"
                               @updateSelectedBible="updateSelectedBible"
                               v-bind:selectedBible="selectedBible"
                               v-bind:searchType="searchType"/>
            </b-col>
            <b-col></b-col>
        </b-row>
        <br>
        <SearchVerseContainer v-bind:searchBibleHash="searchBibleHash"
                              v-bind:fontSize="fontSize"
                              v-bind:versesColumnSize="versesColumnSize"
                              v-bind:showNKJV="showNKJV"
                              v-bind:showKYHG="showKYHG"
                              v-bind:showRVR="showRVR"
                              v-bind:searchBibleType="searchBibleType"
                              :bus="bus"/>
    </b-container>
</template>

<script>

import SearchByWords from './search/SearchByWords.vue'
import SearchVerseContainer from './verse_container/SearchVerseContainer.vue'
import mixins from '../utility/mixins.js'
import { ipcRenderer } from 'electron'
import Constants from '../constants/constants'
import Vue from 'vue'

export default {
    name: 'BibleSearcher',
    mixins: [mixins],
    components: {
        SearchByWords,
        SearchVerseContainer,
    },
    created() { 
        // initial bible set
        this.selectedBible = Constants.SupportedBibles[0]
        this.updateSearchType()

        ipcRenderer.on('shortkey-message', (event, arg) => {
            if (this.$route.name == "Search") {
                if (arg == "font-increase") {
                    this.fontSizeUp()
                } else if (arg == "font-decrease") {
                    this.fontSizeDown()
                } else if (arg == "font-restore") {
                    this.fontSizeReset()
                } else if (arg == "toggle-nkjv") {
                    this.toggleNKJV()
                } else if (arg == "toggle-kyhg") {
                    this.toggleKYHG()
                } else if (arg == "toggle-rvr") {
                    this.toggleRVR()
                } else if (arg == "verse-container-increase") {
                    this.sidePaddingSmaller()
                } else if (arg == "verse-container-decrease") {
                    this.sidePaddingBigger()
                } else if (arg == "verse-container-restore") {
                    this.sidePaddingReset()
                } else if (arg == "suggest-feature") {
                    window.location.href = "mailto:mmson6@gmail.com?subject=Biblos Feature Suggestion&body=message%20goes%20here";
                } else if (arg == "report-issue") {
                    window.location.href = "mailto:mmson6@gmail.com?subject=Biblos Issue Report&body=message%20goes%20here";
                }
            }
        })
    },
    data() {
        return {
            bus: new Vue(),
            selectedBible: "",
            searchType: "",
            searchBibleType: Constants.BibleType.NKJV,
            searchQuery: "",
            searchBibleHash: {},
            fontSize: 20,
            versesColumnSize: 10,
            showNKJV: true,
            showRVR: true,
            showKYHG: true,
        }
    },

    methods: {
        resetPreviousSearch() {
            this.bus.$emit('resetSearch');
        },
        updateSelectedBible(value) {
            this.selectedBible = value
        },
        updateSearchType() {
            this.searchType = Constants.Abbreviation[this.selectedBible]
        },
        showVersesInNKJV() {
            this.showNKJV = true
            this.showKYHG = false
            this.showRVR = false
        },
        showVersesInKYHG() {
            this.showNKJV = false
            this.showKYHG = true
            this.showRVR = false
        },
        showVersesInRVR1960() {
            this.showNKJV = false
            this.showKYHG = false
            this.showRVR = true
        },
        toggleNKJV() {
            this.selectedBible = Constants.SupportedBibles[0]
            this.searchType = Constants.Abbreviation[this.selectedBible]
        },
        toggleKYHG() {
            this.selectedBible = Constants.SupportedBibles[1]
            this.searchType = Constants.Abbreviation[this.selectedBible]
        },
        toggleRVR() {
            this.selectedBible = Constants.SupportedBibles[2]
            this.searchType = Constants.Abbreviation[this.selectedBible]
        },
        sidePaddingBigger() {
            if (this.versesColumnSize == 2) {
                this.versesColumnSize = 2
            } else {
                this.versesColumnSize -= 1
            }
        },
        sidePaddingReset() {
            this.versesColumnSize = 10
        },
        sidePaddingSmaller() {
            if (this.versesColumnSize == 12) {
                this.versesColumnSize = 12
            } else {
                this.versesColumnSize += 1
            }
        },
        fontSizeUp() {
            if ((this.fontSize + 4) > 90) {
                this.fontSize = 90;
            } else {
                this.fontSize += 4;
            }
        },
        fontSizeReset() {
            this.fontSize = 20;
        },
        fontSizeDown() {
            if ((this.fontSize - 4) < 20) {
                this.fontSize = 20;
            } else {
                this.fontSize -= 4;
            }
        },
        sanitizeVerse(verse) {
            let trimmed = verse.trim()
            var sanitized = trimmed.replace(/\[/g,'')
            sanitized = sanitized.replace(/\]/g,'')
            return sanitized
        },
        handleSearchRequest(searchQuery) {
            // reset previous search data
            this.resetPreviousSearch()
            
            let searchResult = {}

            switch (this.searchType) {
                case "NKJV":
                    this.searchBibleType = Constants.BibleType.NKJV
                    searchResult = this.searchInNKJV(searchQuery)
                    this.showVersesInNKJV()
                    break
                case "KYHG":
                    this.searchBibleType = Constants.BibleType.KYHG
                    searchResult = this.searchInKYHG(searchQuery)
                    this.showVersesInKYHG()
                    break
                case "RVR1960":
                    this.searchBibleType = Constants.BibleType.RVR1960
                    searchResult = this.searchInRVR1960(searchQuery)
                    this.showVersesInRVR1960()
                    break
            }
            
            this.searchBibleHash = { OTCount: searchResult.OTCount,
                                     NTCount: searchResult.NTCount,
                                     searchedVersesHash: searchResult.searchedVersesHash }
        },
        searchInNKJV(searchQuery) {
            let nkjvData = this.$store.state.nkjvData
            
            var searchedVersesOutput = []
            for (let i=0; i < nkjvData.length; i++) {
                let bookData = nkjvData[i]
                let chapterData = bookData.CHAPTER
                if (Array.isArray(chapterData)) {
                    chapterData.forEach((chapter) => {
                        const verseData = chapter.VERS
                        verseData.forEach((verse, index) => {
                            const sanitizedVerse = this.sanitizeVerse(verse)
                            const querySplit = searchQuery.split(' ').sort((a, b) => b.length - a.length)
                            let matchFlag = true
                            for(let i=0; i<querySplit.length; i++){
                                const keyword = querySplit[i]
                                const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                                if (match == null) {
                                    matchFlag = false
                                    break
                                }
                            }

                            if (matchFlag) {
                                const splitVerse = sanitizedVerse.split(' ')
                                let finalVerseArray = new Array(splitVerse.length)
                                let takenWordsIndex = {}
                                querySplit.forEach((keyword) => {
                                    splitVerse.forEach((word, verse_index) => {
                                        if (takenWordsIndex[verse_index] == true) { return } // skip taken words

                                        const match = word.match(new RegExp(keyword, 'ig'))
                                        if (match != null) {
                                            const index = word.toLowerCase().indexOf(keyword.toLowerCase())
                                            if (index != -1) {
                                                const replacement = `<b style="color: #ff9d20;">${match[0]}</b>`
                                                const updated = this.replaceAt(word, index, match[0], replacement)
                                                finalVerseArray[verse_index] = updated
                                                takenWordsIndex[verse_index] = true
                                            }
                                        } else {
                                            finalVerseArray[verse_index] = word
                                        }
                                    })
                                })

                                const updatedVerse = finalVerseArray.join(' ')
                                searchedVersesOutput.push({ book: bookData.bname,
                                                            bnumber: bookData.bnumber,
                                                            chapter: chapter.cnumber,
                                                            verseNumber: index+1,
                                                            verse: updatedVerse })
                            }
                        })
                    })
                } else {
                    const verseData = chapterData.VERS
                    verseData.forEach((verse, index) => {
                        const sanitizedVerse = this.sanitizeVerse(verse)
                        const querySplit = searchQuery.split(' ').sort((a, b) => b.length - a.length)
                        let matchFlag = true
                        for(let i=0; i<querySplit.length; i++){
                            const keyword = querySplit[i]
                            const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                            if (match == null) {
                                matchFlag = false
                                break
                            }
                        }

                        if (matchFlag) {
                            const splitVerse = sanitizedVerse.split(' ')
                            let finalVerseArray = new Array(splitVerse.length)
                            let takenWordsIndex = {}
                            querySplit.forEach((keyword) => {
                                splitVerse.forEach((word, verse_index) => {
                                    if (takenWordsIndex[verse_index] == true) { return } // skip taken words

                                    const match = word.match(new RegExp(keyword, 'ig'))
                                    if (match != null) {
                                        const index = word.toLowerCase().indexOf(keyword.toLowerCase())
                                        if (index != -1) {
                                            const replacement = `<b style="color: #ff9d20;">${match[0]}</b>`
                                            const updated = this.replaceAt(word, index, match[0], replacement)
                                            finalVerseArray[verse_index] = updated
                                            takenWordsIndex[verse_index] = true
                                        }
                                    } else {
                                        finalVerseArray[verse_index] = word
                                    }
                                })
                            })

                            const updatedVerse = finalVerseArray.join(' ')
                            searchedVersesOutput.push({ book: bookData.bname,
                                                        bnumber: bookData.bnumber,
                                                        chapter: chapterData.cnumber,
                                                        verseNumber: index+1,
                                                        verse: updatedVerse })
                        }
                    })
                }
            }

            let searchedVersesHash = []
            let OTCount = 0
            let NTCount = 0
            searchedVersesOutput.forEach((verseHash, index) => {
                if (verseHash.bnumber < 40) { OTCount++} 
                else { NTCount++ }
                searchedVersesHash.push({ book: verseHash.book,
                                          bnumber: verseHash.bnumber,
                                          chapter: verseHash.chapter,
                                          verseNumber: verseHash.verseNumber,
                                          nkjvVerse: verseHash.verse,
                                          index: index })
            })

            return { searchedVersesHash: searchedVersesHash, OTCount: OTCount, NTCount: NTCount }
        },
        searchInKYHG(searchQuery) {
            let kyhgData = this.$store.state.kyhgData
            
            var searchedVersesOutput = []
            for (let i=0; i < kyhgData.length; i++) {
                let bookData = kyhgData[i]
                let chapterData = bookData.CHAPTER
                if (Array.isArray(chapterData)) {
                    chapterData.forEach((chapter) => {
                        const verseData = chapter.VERS
                        verseData.forEach((verse, index) => {
                            const sanitizedVerse = this.sanitizeVerse(verse)
                            const querySplit = searchQuery.split(' ').sort((a, b) => b.length - a.length)
                            let matchFlag = true
                            for(let i=0; i<querySplit.length; i++){
                                const keyword = querySplit[i]
                                const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                                if (match == null) {
                                    matchFlag = false
                                    break
                                }
                            }

                            if (matchFlag) {
                                const splitVerse = sanitizedVerse.split(' ')
                                let finalVerseArray = new Array(splitVerse.length)
                                let takenWordsIndex = {}
                                querySplit.forEach((keyword) => {
                                    splitVerse.forEach((word, verse_index) => {
                                        if (takenWordsIndex[verse_index] == true) { return } // skip taken words

                                        const match = word.match(new RegExp(keyword, 'ig'))
                                        if (match != null) {
                                            const index = word.toLowerCase().indexOf(keyword.toLowerCase())
                                            if (index != -1) {
                                                const replacement = `<b style="color: #ff9d20;">${match[0]}</b>`
                                                const updated = this.replaceAt(word, index, match[0], replacement)
                                                finalVerseArray[verse_index] = updated
                                                takenWordsIndex[verse_index] = true
                                            }
                                        } else {
                                            finalVerseArray[verse_index] = word
                                        }
                                    })
                                })

                                const updatedVerse = finalVerseArray.join(' ')
                                searchedVersesOutput.push({ book: bookData.bname,
                                                    bnumber: bookData.bnumber,
                                                    chapter: chapter.cnumber,
                                                    verseNumber: index+1,
                                                    verse: updatedVerse })
                            }
                        })
                    })
                } else {
                    const verseData = chapterData.VERS
                    verseData.forEach((verse, index) => {
                        const sanitizedVerse = this.sanitizeVerse(verse)
                        const querySplit = searchQuery.split(' ').sort((a, b) => b.length - a.length)
                        let matchFlag = true
                        for(let i=0; i<querySplit.length; i++){
                            const keyword = querySplit[i]
                            const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                            if (match == null) {
                                matchFlag = false
                                break
                            }
                        }

                        if (matchFlag) {
                            const splitVerse = sanitizedVerse.split(' ')
                            let finalVerseArray = new Array(splitVerse.length)
                            let takenWordsIndex = {}
                            querySplit.forEach((keyword) => {
                                splitVerse.forEach((word, verse_index) => {
                                    if (takenWordsIndex[verse_index] == true) { return } // skip taken words

                                    const match = word.match(new RegExp(keyword, 'ig'))
                                    if (match != null) {
                                        const index = word.toLowerCase().indexOf(keyword.toLowerCase())
                                        if (index != -1) {
                                            const replacement = `<b style="color: #ff9d20;">${match[0]}</b>`
                                            const updated = this.replaceAt(word, index, match[0], replacement)
                                            finalVerseArray[verse_index] = updated
                                            takenWordsIndex[verse_index] = true
                                        }
                                    } else {
                                        finalVerseArray[verse_index] = word
                                    }
                                })
                            })

                            const updatedVerse = finalVerseArray.join(' ')
                            searchedVersesOutput.push({ book: bookData.bname,
                                                bnumber: bookData.bnumber,
                                                chapter: chapterData.cnumber,
                                                verseNumber: index+1,
                                                verse: updatedVerse })
                        }
                    })
                }
            }

            let searchedVersesHash = []
            let OTCount = 0
            let NTCount = 0
            searchedVersesOutput.forEach((verseHash, index) => {
                if (verseHash.bnumber < 40) { OTCount++} 
                else { NTCount++ }
                searchedVersesHash.push({ book: verseHash.book,
                                          bnumber: verseHash.bnumber,
                                          chapter: verseHash.chapter,
                                          verseNumber: verseHash.verseNumber,
                                          kyhgVerse: verseHash.verse,
                                          index: index })
            })
            
            return { searchedVersesHash: searchedVersesHash, OTCount: OTCount, NTCount: NTCount }
        },
        searchInRVR1960(searchQuery) {
            let rvrData = this.$store.state.rvr1960Data
            
            var searchedVersesOutput = []
            for (let i=0; i < rvrData.length; i++) {
                let bookData = rvrData[i]
                let chapterData = bookData.CHAPTER
                if (Array.isArray(chapterData)) {
                    chapterData.forEach((chapter) => {
                        const verseData = chapter.VERS
                        verseData.forEach((verse, index) => {
                            const sanitizedVerse = this.sanitizeVerse(verse)
                            const querySplit = searchQuery.split(' ').sort((a, b) => b.length - a.length)
                            let matchFlag = true
                            for(let i=0; i<querySplit.length; i++){
                                const keyword = querySplit[i]
                                const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                                if (match == null) {
                                    matchFlag = false
                                    break
                                }
                            }

                            if (matchFlag) {
                                const splitVerse = sanitizedVerse.split(' ')
                                let finalVerseArray = new Array(splitVerse.length)
                                let takenWordsIndex = {}
                                querySplit.forEach((keyword) => {
                                    splitVerse.forEach((word, verse_index) => {
                                        if (takenWordsIndex[verse_index] == true) { return } // skip taken words

                                        const match = word.match(new RegExp(keyword, 'ig'))
                                        if (match != null) {
                                            const index = word.toLowerCase().indexOf(keyword.toLowerCase())
                                            if (index != -1) {
                                                const replacement = `<b style="color: #ff9d20;">${match[0]}</b>`
                                                const updated = this.replaceAt(word, index, match[0], replacement)
                                                finalVerseArray[verse_index] = updated
                                                takenWordsIndex[verse_index] = true
                                            }
                                        } else {
                                            finalVerseArray[verse_index] = word
                                        }
                                    })
                                })

                                const updatedVerse = finalVerseArray.join(' ')
                                searchedVersesOutput.push({ book: bookData.bname, 
                                                    bnumber: bookData.bnumber,
                                                    chapter: chapter.cnumber,
                                                    verseNumber: index+1,
                                                    verse: updatedVerse })
                            }
                        })
                    })
                } else {
                    const verseData = chapterData.VERS
                    verseData.forEach((verse, index) => {
                        const sanitizedVerse = this.sanitizeVerse(verse)
                        const querySplit = searchQuery.split(' ').sort((a, b) => b.length - a.length)
                        let matchFlag = true
                        for(let i=0; i<querySplit.length; i++){
                            const keyword = querySplit[i]
                            const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                            if (match == null) {
                                matchFlag = false
                                break
                            }
                        }

                        if (matchFlag) {
                            const splitVerse = sanitizedVerse.split(' ')
                            let finalVerseArray = new Array(splitVerse.length)
                            let takenWordsIndex = {}
                            querySplit.forEach((keyword) => {
                                splitVerse.forEach((word, verse_index) => {
                                    if (takenWordsIndex[verse_index] == true) { return } // skip taken words

                                    const match = word.match(new RegExp(keyword, 'ig'))
                                    if (match != null) {
                                        const index = word.toLowerCase().indexOf(keyword.toLowerCase())
                                        if (index != -1) {
                                            const replacement = `<b style="color: #ff9d20;">${match[0]}</b>`
                                            const updated = this.replaceAt(word, index, match[0], replacement)
                                            finalVerseArray[verse_index] = updated
                                            takenWordsIndex[verse_index] = true
                                        }
                                    } else {
                                        finalVerseArray[verse_index] = word
                                    }
                                })
                            })

                            const updatedVerse = finalVerseArray.join(' ')
                            searchedVersesOutput.push({ book: bookData.bname,
                                                bnumber: bookData.bnumber,
                                                chapter: chapterData.cnumber,
                                                verseNumber: index+1,
                                                verse: updatedVerse })
                        }
                    })
                }
            }

            let searchedVersesHash = []
            let OTCount = 0
            let NTCount = 0
            searchedVersesOutput.forEach((verseHash, index) => {
                if (verseHash.bnumber < 40) { OTCount++} 
                else { NTCount++ }
                searchedVersesHash.push({ book: verseHash.book,
                                          bnumber: verseHash.bnumber,
                                          chapter: verseHash.chapter,
                                          verseNumber: verseHash.verseNumber,
                                          rvrVerse: verseHash.verse,
                                          index: index })
            })
            
            return { searchedVersesHash: searchedVersesHash, OTCount: OTCount, NTCount: NTCount }
        }
    }
}
</script>

<style scoped>

.setting-btn-filler {
    width: 50px; 
    height: 50px;
    font-size: 20px;
}

.setting-btn {
    width: 50px; 
    height: 50px;
    font-size: 20px;
    cursor: pointer;
}

.lang-item-check {
    padding-left: 5px;
    padding-bottom: 5px;
}
</style>