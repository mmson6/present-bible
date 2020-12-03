import bibleData from '../data/bible_data.json'

export default {
    methods: {
        isFullNKJVBookName: (bookName) => {
            return bibleData.Books.FullName.includes(bookName.toLowerCase())
        },
        getFullNKJVBookName: (bookName) => {
            const fullName = bibleData.Books.Abbreviated[bookName]
            return fullName
        },
        searchRegex: () => {
            return /(([\u3131-\uD79D]+[0-9]?[\u3131-\uD79D]*)|([A-Za-z]+ [A-Za-z]+ [A-Za-z]+)|([0-9]\s?[A-Za-z]+)|([A-Za-z]+))\s[0-9]+(:[0-9]+(-[0-9]+)?)?/g
        },
        getVerseCountInt: (bookNumberString, chapter) => {
            return bibleData.VerseCount[bookNumberString][chapter]
        },
        getBookNumberString: (bookFullNameNKJV) => {
            return bibleData.BookNumber[bookFullNameNKJV.toLowerCase()]
        },
        replaceAt: (string, index, original, replacement) => {
            return string.substring(0, index) + replacement + string.substring(index + original.length)
            // return string.substr(0, index) + replacement + string.substr(index + replacement.length);
        },
    }
  }