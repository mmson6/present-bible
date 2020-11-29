import bibleData from '../data/bible_data.json'

export default {
    methods: {
        isFullName: (bookName) => {
            return bibleData.Books.FullName.includes(bookName.toLowerCase())
        },
        getFullName: (bookName) => {
            const fullName = bibleData.Books.Abbreviated[bookName]
            return fullName
        },
        searchRegex: () => {
            return /(([\u3131-\uD79D]+[0-9]?[\u3131-\uD79D]*)|([A-Za-z]+ [A-Za-z]+ [A-Za-z]+)|([0-9]\s?[A-Za-z]+)|([A-Za-z]+))\s[0-9]{1,3}(:[0-9]{1,3}(-[0-9]{1,3})?)?/g
        },
        getVerseCountInt: (bookNumber, chapter) => {
            return bibleData.VerseCount[bookNumber][chapter]
        },
        getBookNumberString: (bookName) => {
            return bibleData.BookNumber[bookName.toLowerCase()]
        }
    }
  }