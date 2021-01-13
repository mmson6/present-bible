<template>
    <b-row class="verses verse-padding" v-bind:style="{ fontSize: verseFontSize + 'px' }">
        <div class="verse-info test-left">
            <span v-bind:style="{ fontSize: verseNumberFontSize + 'px'}">{{verseInfo}}</span>
        </div>
        <div class="verses">
            <div v-show="showNKJV" class="found-verses"><span v-html="verseHash.nkjvVerse"></span></div>
            <div v-show="showKYHG" lass="found-verses"><span v-html="verseHash.kyhgVerse"></span></div>
            <div v-show="showRVR" lass="found-verses"><span v-html="verseHash.rvrVerse"></span></div>
        </div>
    </b-row>
</template>

<script>
export default {
    name: 'SearchVerse',  
    props: ['verseHash', 'verseFontSize', 'showNKJV', 'showRVR', 'showKYHG'],

    created() { 
    },
    computed: {
        verseInfo() {
            return `${this.verseHash.book} ${this.verseHash.chapter}:${this.verseHash.verseNumber}`
        },
        verseNumberFontSize() {
            return 20
        },
    }
}
</script>

<style scoped>
.verses {
    flex: 80%;
    color: white;
}

.found-verses {
    margin-bottom: 10px;
    align-content: left;
    color: white;
}

.verse-padding {
    padding-top: 12px;
    padding-bottom: 12px;
}

.verse-info {
    color: yellow;
    display: block;
    flex: 20%;
    word-wrap: break-word;
    min-width: 175px;
    max-width: 225px;
}

</style>