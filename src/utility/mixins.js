import bibleData from '../data/bible_data.json'

export default {
    methods: {
        printMessage: (message) => {
            console.log(message)
        },
        isFullName: (bookName) => {
            console.log(bibleData.Books.FullName.includes(bookName.toLowerCase()))
            return bibleData.Books.FullName.includes(bookName.toLowerCase())
        },
        getFullName: (bookName) => {
            const fullName = bibleData.Books.Abbreviated[bookName]
            console.log(`full name check : ${fullName}`)
            return fullName
        },
        searchRegex: () => {
            return /(([\u3131-\uD79D]+[0-9]?[\u3131-\uD79D]*)|([A-Za-z]+ [A-Za-z]+ [A-Za-z]+)|([0-9]\s[A-Za-z]+)|([A-Za-z]+))\s[0-9]{1,3}:[0-9]{1,3}(-[0-9]{1,3})?/g
        }
    }
  }