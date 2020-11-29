<template>
    <b-row class="verses verse-padding" v-bind:style="{ fontSize: verseFontSize + 'px' }">
        <b-col cols="1" class="text-right">
            <span v-bind:style="{ fontSize: verseNumberFontSize + 'px'}">{{verseHash.verseNumber}}</span>
        </b-col>
        <b-col cols="11">
            <div v-show="showNKJV" class="eng-verse">{{verseHash.nkjvVerse}}</div>
            <div v-show="showKYHG" v-bind:style="{ color: kyhgVerseColor }" class="kor-verse">{{verseHash.kyhgVerse}}</div>
            <div v-show="showRVR" v-bind:style="{ color: rvrVerseColor }" class="spn-verse">{{verseHash.rvrVerse}}</div>
            <br>    
        </b-col>            
    </b-row>
</template>

<script>
export default {
    name: 'Verse',
    props: ['verseHash', 'verseFontSize', 'showNKJV', 'showRVR', 'showKYHG'],

    computed: {
        verseNumberFontSize() {
            var count = 0
            if (this.showNKJV) { count++ }
            if (this.showRVR) { count++ }
            if (this.showKYHG) { count++ }

            if (count > 1) {
                return 30
            } else {
                return 20
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
        }
    }
}
</script>

<style scoped>
.verses {
    /* margin-bottom: 10px; */
    align-content: left;
    color: white;
}
.eng-verse {
    margin-bottom: 10px;
    align-content: left;
    color: white;
}
.spn-verse {
    align-content: left;
}
.kor-verse {
    margin-bottom: 10px;
    align-content: left;
}

.verse-padding {
    padding-top: 12px;
    padding-bottom: 12px;
}

</style>