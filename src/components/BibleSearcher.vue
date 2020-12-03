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

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown style="color: #ececec;" text="Bibles" right>
                        <b-dropdown-item v-on:click="toggleNKJV">
                            NKJV<v-icon v-show="showNKJV" class="lang-item-check" color="#3cb371" size="25">mdi-check</v-icon>
                        </b-dropdown-item>
                        <b-dropdown-item v-on:click="toggleKYHG">
                            개역한글<v-icon v-show="showKYHG" class="lang-item-check" color="#3cb371" size="25">mdi-check</v-icon>
                        </b-dropdown-item>
                        <b-dropdown-item v-on:click="toggleRVR">
                            RVR1960<v-icon v-show="showRVR" class="lang-item-check" color="#3cb371" size="25">mdi-check</v-icon>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <b-row>
            <b-col></b-col>
            <b-col cols="8">
                <SearchByWords @searchVerses="handleSearchRequest"/>
            </b-col>
            <b-col></b-col>
        </b-row>
        <br>
        <SearchVerseContainer v-bind:searchBibleHash="searchBibleHash"
                              v-bind:fontSize="fontSize"
                              v-bind:versesColumnSize="versesColumnSize"
                              v-bind:showNKJV="showNKJV"
                              v-bind:showKYHG="showKYHG"
                              v-bind:showRVR="showRVR"/>
    </b-container>
</template>

<script>

import SearchByWords from './search/SearchByWords.vue'
import SearchVerseContainer from './verse_container/SearchVerseContainer.vue'
import mixins from '../utility/mixins.js'
import { ipcRenderer } from 'electron'
// import Constants from '../constants/constants'

// const BookType = {
//   NKJV: 0,
//   KYHG: 1,
//   RVR: 2,
// };



export default {
    name: 'BibleSearcher',
    mixins: [mixins],
    components: {
        SearchByWords,
        SearchVerseContainer,
    },
    created() { 
        ipcRenderer.on('shortkey-message', (event, arg) => {
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
            } else if (arg == "show-all") {
                this.showAllBibles()
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
        })
    },
    data() {
        return {
            searchTypeShow: false,
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
        showAllBibles() {
            this.showNKJV = true
            this.showKYHG = true
            this.showRVR = true
        },
        toggleNKJV() {
            // prevent toggling all languages
            if (!this.showRVR && !this.showKYHG && this.showNKJV) { return }

            this.showNKJV = !this.showNKJV
        },
        toggleKYHG() {
            // prevent toggling all languages
            if (!this.showNKJV && !this.showRVR && this.showKYHG) { return }

            this.showKYHG = !this.showKYHG
        },
        toggleRVR() {
            // prevent toggling all languages
            if (!this.showNKJV && !this.showKYHG && this.showRVR) { return }

            this.showRVR = !this.showRVR
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
        getChapterVerseCount(bookFullNameNKJV, chapter) {
            const bookNumberString = this.getBookNumberString(bookFullNameNKJV)
            return this.getVerseCountInt(bookNumberString, chapter)
        },
        getMinVerseString(verses) {
            if (!verses.includes("-")) { return null }

            let verseRange = verses.split('-', 2)
            return verseRange[0]
        },
        sameVerseInRange(verses) {
            if (!verses.includes("-")) { return false }
        
            let verseRange = verses.split('-', 2)
            return Number(verseRange[0]) == Number(verseRange[1])
        },
        fetchNKJVVerses(bookData, chapter, verses) {
            var verseOutput = []
            let chapterData = bookData.CHAPTER
            if (Array.isArray(chapterData)) {
                const maxChapter = chapterData.length

                // check if chapter given is bigger than max chapter
                if (Number(chapter) > maxChapter) { return [] }

                const searchedChapter = chapterData[Number(chapter)-1]
                const verseData = searchedChapter.VERS
                if (verses == "") {
                    // return all verses of the chapter
                    verseData.forEach((verse, index) => {
                        verseOutput.push({ verseNumber: index+1, verse: this.sanitizeVerse(verse) })
                    })
                } else if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    let min = Number(verseRange[0])
                    let max = Number(verseRange[1])

                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            } else {
                // handle books with only one chapter
                const maxChapter = 1

                if (Number(chapter) > maxChapter) { return [] }

                const verseData = chapterData.VERS
                if (verses == "") {
                    // return all verses of the chapter
                    verseData.forEach((verse, index) => {
                        verseOutput.push({ verseNumber: index+1, verse: this.sanitizeVerse(verse) })
                    })
                } else if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    let min = Number(verseRange[0])
                    let max = Number(verseRange[1])

                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            }

            return verseOutput
        },
        fetchRVRVerses(bookNumber, chapter, verses) {
            var verseOutput = []
            let rvrData = this.$store.state.rvrData
            let bookData = rvrData[bookNumber-1]
            var bookName = ""

            // find spanish book name
            for(let i=0; i<rvrData.length; i++) {
                if (Number(rvrData[i].bnumber) == bookNumber) {
                    bookName = rvrData[i].bname
                    break
                }
            }

            let chapterData = bookData.CHAPTER
            if (Array.isArray(chapterData)) {
                const searchedChapter = chapterData[Number(chapter)-1]
                const verseData = searchedChapter.VERS
                if (verses == "") {
                    // return all verses of the chapter
                    verseData.forEach((verse, index) => {
                        verseOutput.push({ verseNumber: index+1, verse: this.sanitizeVerse(verse) })
                    })
                } else if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    let min = Number(verseRange[0])
                    let max = Number(verseRange[1])
                    
                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            } else {
                const verseData = chapterData.VERS
                if (verses == "") {
                    // return all verses of the chapter
                    verseData.forEach((verse, index) => {
                        verseOutput.push({ verseNumber: index+1, verse: this.sanitizeVerse(verse) })
                    })
                } else if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    let min = Number(verseRange[0])
                    let max = Number(verseRange[1])

                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            }
            return { bookName: bookName, rvrVerseOutput: verseOutput }
        },
        fetchKYHGVerses(bookNumber, chapter, verses) {
            var verseOutput = []
            let kyhgData = this.$store.state.kyhgData
            let bookData = kyhgData[bookNumber-1]
            var bookName = ""

            // find korean book name
            for(let i=0; i<kyhgData.length; i++) {
                if (Number(kyhgData[i].bnumber) == bookNumber) {
                    bookName = kyhgData[i].bname
                    break
                }
            }

            let chapterData = bookData.CHAPTER
            if (Array.isArray(chapterData)) {
                const searchedChapter = chapterData[Number(chapter)-1]
                const verseData = searchedChapter.VERS
                if (verses == "") {
                    // return all verses of the chapter
                    verseData.forEach((verse, index) => {
                        verseOutput.push({ verseNumber: index+1, verse: this.sanitizeVerse(verse) })
                    })
                } else if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    let min = Number(verseRange[0])
                    let max = Number(verseRange[1])

                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            } else {
                const verseData = chapterData.VERS
                if (verses == "") {
                    // return all verses of the chapter
                    verseData.forEach((verse, index) => {
                        verseOutput.push({ verseNumber: index+1, verse: this.sanitizeVerse(verse) })
                    })
                } else if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    let min = Number(verseRange[0])
                    let max = Number(verseRange[1])
                    
                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            }
            return { bookName: bookName, kyhgVerseOutput: verseOutput }
        },
        handleSearchRequest(searchQuery, searchType) {
            console.log(searchType)

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
                            const querySplit = searchQuery.split(' ')
                            let matchFlag = true
                            for(let i=0; i<querySplit.length; i++){
                                const keyword = querySplit[i]
                                const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                                if (match == null) {
                                    matchFlag = false
                                    break
                                }
                            }

                            let updatedVerse = sanitizedVerse
                            if (matchFlag) {
                                querySplit.forEach((keyword) => {
                                    const match = updatedVerse.match(new RegExp(keyword, 'ig'))
                                    let indexPosition = 0
                                    let partiallyUpdated = updatedVerse
                                    for(let i=0; i < match.length; i++) {
                                        const index = partiallyUpdated.toLowerCase().indexOf(keyword.toLowerCase(), indexPosition)
                                        if (index != -1) {
                                            const replacement = `<b style="color: #ff9d20;">${match[i]}</b>`
                                            partiallyUpdated = this.replaceAt(partiallyUpdated, index, match[i], replacement)
                                            indexPosition = index + replacement.length
                                        }
                                    }
                                    updatedVerse = partiallyUpdated
                                })
                                searchedVersesOutput.push({ book: bookData.bname, 
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
                        const querySplit = searchQuery.split(' ')
                        let matchFlag = true
                        for(let i=0; i<querySplit.length; i++){
                            const keyword = querySplit[i]
                            const match = sanitizedVerse.match(new RegExp(keyword, 'ig'))
                            if (match == null) {
                                matchFlag = false
                                break
                            }
                        }

                        let updatedVerse = sanitizedVerse
                        if (matchFlag) {
                            querySplit.forEach((keyword) => {
                                const match = updatedVerse.match(new RegExp(keyword, 'ig'))
                                let indexPosition = 0
                                let partiallyUpdated = updatedVerse
                                for(let i=0; i < match.length; i++) {
                                    const index = partiallyUpdated.toLowerCase().indexOf(keyword.toLowerCase(), indexPosition)
                                    if (index != -1) {
                                        const replacement = `<b style="color: #ff9d20;">${match[i]}</b>`
                                        partiallyUpdated = this.replaceAt(partiallyUpdated, index, match[i], replacement)
                                        indexPosition = index + replacement.length
                                    }
                                }
                                updatedVerse = partiallyUpdated
                            })
                            searchedVersesOutput.push({ book: bookData.bname, 
                                                chapter: chapterData.cnumber,
                                                verseNumber: index+1,
                                                verse: updatedVerse })
                        }
                    })
                }
            }
            console.log(searchedVersesOutput.length)
            console.log("whathtttttt "+JSON.stringify(searchedVersesOutput))

            let searchedVersesHash = []
            searchedVersesOutput.forEach((verseHash, index) => {
                searchedVersesHash.push({ book: verseHash.book,
                                          chapter: verseHash.chapter,
                                          verseNumber: verseHash.verseNumber,
                                          nkjvVerse: verseHash.verse,
                                          index: index })
            })
            console.log("mike check after parse : " + JSON.stringify(searchedVersesHash))
            this.searchBibleHash = { searchedVersesHash: searchedVersesHash }
        },
        // performSearchByFullName(searchQuery, nkjvBookName, chapter, verses) {
        //     let nkjvData = this.$store.state.nkjvData
        //     var bookNumber = 0
        //     var nkjvVerseOutput = []
            
        //     for (let i=0; i < nkjvData.length; i++) {
        //         let bookData = nkjvData[i]
        //         if (bookData.bname.toLowerCase() == nkjvBookName.toLowerCase()) {
        //             bookNumber = Number(bookData.bnumber)
        //             nkjvVerseOutput = this.fetchNKJVVerses(bookData, chapter, verses)
        //             break
        //         }
        //     }

        //     if (nkjvVerseOutput.length == 0) {
        //         this.bibleHash = { invalidSearch: true }
        //     } else {
        //         let rvrOutput = this.fetchRVRVerses(bookNumber, chapter, verses)
        //         let kyhgOutput = this.fetchKYHGVerses(bookNumber, chapter, verses)
                
        //         let searchedVersesHash = []

        //         // re-organize all bible data
        //         for (let i=0; i<nkjvVerseOutput.length; i++) {
        //             let nkjvVerseData = nkjvVerseOutput[i]
        //             let rvrVerseData = rvrOutput.rvrVerseOutput[i]
        //             let kyhgVerseData = kyhgOutput.kyhgVerseOutput[i]
        //             searchedVersesHash.push({ verseNumber: nkjvVerseData.verseNumber,
        //                                       nkjvVerse: nkjvVerseData.verse,
        //                                       rvrVerse: rvrVerseData.verse,
        //                                       kyhgVerse: kyhgVerseData.verse })
        //         }

        //         this.bibleHash = { book: { nkjv: nkjvBookName.trim(),
        //                                    rvr: rvrOutput.bookName.trim(),
        //                                    kyhg: kyhgOutput.bookName.trim() },
        //                            chapter: chapter.trim(),
        //                            verses: verses.trim(),
        //                            searchedVersesHash: searchedVersesHash }
        //         this.copyToClipboard()
        //     }
        // }
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