<template>
    <b-container fluid>
        <b-row>
            <b-col></b-col>
            <b-col cols="8">
                <Search @showSearchedVerses="showSearchedVerses"/>
            </b-col>
            <b-col></b-col>
        </b-row>
        <br>
        <VerseContainer v-bind:nkjvHash="nkjvHash"/>
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
        }
    },

    components: {
        Search,
        VerseContainer,
    },

    methods: {
        sanitizeVerse(verse) {
            let trimmed = verse.trim()
            var sanitized = trimmed.replace(['['],'')
            sanitized = sanitized.replace([']'],'')
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
        fetchNKJVVerses(nkjvData, bookName, chapter, verses) {
            var verseOutput = []
            for (let i=0; i < nkjvData.length; i++) {
                let book = nkjvData[i]
                if (book.bname.toLowerCase() == bookName.toLowerCase()) {
                    let chapters = book.CHAPTER
                    if (Array.isArray(chapters)) {
                        const maxChapter = chapters.length

                        // check if chapter given is bigger than max chapter
                        if (Number(chapter) > maxChapter) { return [] }

                        const searchedChapter = chapters[Number(chapter)-1]
                        const searchedVerses = searchedChapter.VERS
                        const maxVerses = searchedVerses.length
                        if (verses.includes("-")) {
                            // handle verses with range
                            let verseRange = verses.split('-', 2)
                            const min = Number(verseRange[0])
                            const max = Number(verseRange[1])

                            if (min > maxVerses || max > maxVerses) { return [] }
                            if (min > max || min < 1) { return [] }

                            for (let i=0; i <= max-min; i++) {
                                let target = min + i - 1
                                verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(searchedVerses[target]) })
                            }
                        } else {
                            if (Number(verses) > maxVerses) { return [] }

                            verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(searchedVerses[Number(verses)-1]) })
                        }
                    } else {
                        // handle books with only one chapter
                        const maxChapter = 1

                        if (Number(chapter) > maxChapter) { return [] }

                        const searchedVerses = chapters.VERS
                        const maxVerses = searchedVerses.length
                        if (verses.includes("-")) {
                            // handle verses with range
                            let verseRange = verses.split('-', 2)
                            const min = Number(verseRange[0])
                            const max = Number(verseRange[1])

                            if (min > maxVerses || max > maxVerses) { return [] }
                            if (min > max || min < 1) { return [] }

                            for (let i=0; i <= max-min; i++) {
                                let target = min + i - 1
                                verseOutput.push({ verseNumber: target+1, verse: this.sanitizeVerse(searchedVerses[target]) })
                            }
                        } else {
                            if (Number(verses) > maxVerses) { return [] }

                            verseOutput.push({ verseNumber: Number(verses), verse: this.sanitizeVerse(searchedVerses[Number(verses)-1]) })
                        }
                    }
                    break
                }
            }
            return verseOutput
        },
        showSearchedVerses(searchQuery) {
            let nkjvData = this.$store.state.nkjvData
            // this.searchQuery = searchQuery

            const regex = /(([A-Za-z]+ [A-Za-z]+ [A-Za-z]+)|([0-9]\s[A-Za-z]+)|([A-Za-z]+))\s[0-9]{1,3}:[0-9]{1,3}(-[0-9]{1,3})?/g
            let verseText = searchQuery.match(regex)
            
            var bookName = ""
            var chapter = ""
            var verses = ""
            var verseOutput = []
            if (verseText != null) {
                let splitText = verseText[0].split(' ', 4)
                if (splitText.length > 3) {
                    // Song of Solomon
                    bookName = `${splitText[0]} ${splitText[1]} ${splitText[2]}`
                    const remainder = splitText[3].split(':', 2)
                    chapter = remainder[0]
                    verses = remainder[1]
                } else if (splitText.length > 2) {
                    bookName = `${splitText[0]} ${splitText[1]}`
                    const remainder = splitText[2].split(':', 2)
                    chapter = remainder[0]
                    verses = remainder[1]
                } else {
                    bookName = splitText[0]
                    const remainder = splitText[1].split(':', 2)
                    chapter = remainder[0]
                    verses = remainder[1]
                }
            }
            
            if (bookName == "") { return }
            if (this.sameVerseInRange(verses)) {
                verses = this.getMinVerseString(verses)
            }
    
            verseOutput = this.fetchNKJVVerses(nkjvData, bookName, chapter, verses)

            if (verseOutput.length == 0) {
                this.nkjvHash = { invalidSearch: true }
            } else {
                this.nkjvHash = { book: bookName.trim(), chapter: chapter.trim(), verses: verses.trim(), searchedVersesHash: verseOutput }
            }
        }
    }
}
</script>