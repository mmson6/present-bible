<template>
    <b-container fluid>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="">
                <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav> -->
                <b-navbar-nav>
                    <b-nav-item v-on:click="fontSizeDown" class="fontsize-btn">-</b-nav-item>
                    <b-nav-item v-on:click="fontSizeReset" class="fontsize-btn">O</b-nav-item>
                    <b-nav-item v-on:click="fontSizeUp" class="fontsize-btn">+</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!-- <b-row>
                        <b-col></b-col>
                        <b-col cols="8">
                            <Search @showSearchedVerses="searchVerses"/>
                        </b-col>
                        <b-col></b-col>
                    </b-row> -->
                    <!-- <b-nav-form>
                        <b-row>
                            <b-col></b-col>
                            <b-col cols="8">
                                <Search @showSearchedVerses="searchVerses"/>
                                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                            </b-col>
                            <b-col></b-col>
                        </b-row> -->
                    <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
                    <!-- </b-nav-form> -->

                    <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item >ENG</b-dropdown-item>
                    <b-dropdown-item >SPN</b-dropdown-item>
                    <!-- <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item> -->
                    </b-nav-item-dropdown>
<!-- 
                    <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                </b-navbar-nav>
                <!-- </b-collapse> -->
            </b-navbar>
            </div>
        <b-row>
            <b-col></b-col>
            <b-col cols="8">
                <Search @showSearchedVerses="searchVerses"/>
            </b-col>
            <b-col></b-col>
        </b-row>
        <br>
        <VerseContainer v-bind:nkjvHash="nkjvHash"
                        v-bind:bibleHash="bibleHash"
                        v-bind:fontSize="fontSize"/>
    </b-container>
</template>

<script>

import Search from './search/Search.vue'
import VerseContainer from './verse_container/VerseContainer.vue'


export default {
    name: 'BibleViwer',

    data() {
        return {
            searchQuery: "",
            nkjvHash: {},
            bibleHash: {},
            fontSize: 20,
        }
    },

    components: {
        Search,
        VerseContainer,
    },

    methods: {
        hoverTest() {
            console.log("testttt")
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
                const maxVerses = verseData.length
                if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    const min = Number(verseRange[0])
                    const max = Number(verseRange[1])

                    if (min > maxVerses || max > maxVerses) { return [] }
                    if (min > max || min < 1) { return [] }

                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    if (Number(verses) > maxVerses) { return [] }

                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            } else {
                // handle books with only one chapter
                const maxChapter = 1

                if (Number(chapter) > maxChapter) { return [] }

                const verseData = chapterData.VERS
                const maxVerses = verseData.length
                if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    const min = Number(verseRange[0])
                    const max = Number(verseRange[1])

                    if (min > maxVerses || max > maxVerses) { return [] }
                    if (min > max || min < 1) { return [] }

                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    if (Number(verses) > maxVerses) { return [] }

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
                if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    const min = Number(verseRange[0])
                    const max = Number(verseRange[1])
                    
                    for (let i=0; i <= max-min; i++) {
                        let target = min + i - 1
                        verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(verseData[target]) })
                    }
                } else {
                    verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(verseData[Number(verses)-1]) })
                }
            } else {
                const verseData = chapterData.VERS
                if (verses.includes("-")) {
                    // handle verses with range
                    let verseRange = verses.split('-', 2)
                    const min = Number(verseRange[0])
                    const max = Number(verseRange[1])

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
        searchVerses(searchQuery) {
            let nkjvData = this.$store.state.nkjvData
            // this.searchQuery = searchQuery

            const regex = /(([A-Za-z]+ [A-Za-z]+ [A-Za-z]+)|([0-9]\s[A-Za-z]+)|([A-Za-z]+))\s[0-9]{1,3}:[0-9]{1,3}(-[0-9]{1,3})?/g
            let verseText = searchQuery.match(regex)
            
            var nkjvBookName = ""
            var chapter = ""
            var bookNumber = 0
            var verses = ""
            var nkjvVerseOutput = []
            if (verseText != null) {
                let splitText = verseText[0].split(' ', 4)
                if (splitText.length > 3) {
                    // Song of Solomon
                    nkjvBookName = `${splitText[0]} ${splitText[1]} ${splitText[2]}`
                    const remainder = splitText[3].split(':', 2)
                    chapter = remainder[0]
                    verses = remainder[1]
                } else if (splitText.length > 2) {
                    nkjvBookName = `${splitText[0]} ${splitText[1]}`
                    const remainder = splitText[2].split(':', 2)
                    chapter = remainder[0]
                    verses = remainder[1]
                } else {
                    nkjvBookName = splitText[0]
                    const remainder = splitText[1].split(':', 2)
                    chapter = remainder[0]
                    verses = remainder[1]
                }
            }

            if (nkjvBookName == "") { return }
            if (this.sameVerseInRange(verses)) {
                verses = this.getMinVerseString(verses)
            }
    
            for (let i=0; i < nkjvData.length; i++) {
                let bookData = nkjvData[i]
                console.log(bookData.bname)
                if (bookData.bname.toLowerCase() == nkjvBookName.toLowerCase()) {
                    bookNumber = Number(bookData.bnumber)
                    nkjvVerseOutput = this.fetchNKJVVerses(bookData, chapter, verses)
                    break
                }
            }
            console.log(JSON.stringify(nkjvVerseOutput))
            if (nkjvVerseOutput.length == 0) {
                this.bibleHash = { invalidSearch: true }
                // this.nkjvHash = { invalidSearch: true }
            } else {
                let rvrOutput = this.fetchRVRVerses(bookNumber, chapter, verses)
                let searchedVersesHash = []

                // re-organize both nkjv and rvr data
                for (let i=0; i<nkjvVerseOutput.length; i++) {
                    let nkjvVerseData = nkjvVerseOutput[i]
                    let rvrVerseData = rvrOutput.rvrVerseOutput[i]
                    searchedVersesHash.push({ verseNumber: nkjvVerseData.verseNumber,
                                              nkjvVerse: nkjvVerseData.verse,
                                              rvrVerse: rvrVerseData.verse })
                }
                this.bibleHash = { book: { nkjv: nkjvBookName.trim(),
                                           rvr: rvrOutput.bookName.trim() },
                                   chapter: chapter.trim(),
                                   verses: verses.trim(),
                                   searchedVersesHash: searchedVersesHash }
                this.nkjvHash = { book: nkjvBookName.trim(), chapter: chapter.trim(), verses: verses.trim(), searchedVersesHash: nkjvVerseOutput }
            }
        }
    }
}
</script>

<style scoped>

.fontsize-btn {
    width: 50px; 
    height: 50px;
    font-size: 20px;
}
/* 
.lang-item:hover {
    background: green;
    background-color: green;
} */
</style>