<template>
    <b-row class="eng-verse" v-bind:style="{ fontSize: verseFontSize + 'px' }">
        <b-col cols="1" class="text-right">
            <span>{{verseHash.verseNumber}}</span>
        </b-col>
        <b-col cols="11">
            <div><span v-show="showNKJV">{{verseHash.nkjvVerse}}</span></div>
            <div><span v-show="showRVR" class="spn-verse">{{verseHash.rvrVerse}}</span></div>
            <br>
        </b-col>            
    </b-row>
</template>

<script>
export default {
    name: 'Verse',
    props: ['verseHash', 'verseFontSize', 'showNKJV', 'showRVR'],

    computed: {

    }
}
</script>

<style scoped>
.eng-verse{
    align-content: left;
    color: white;
}
.spn-verse{
    align-content: left;
    color: yellow;
}
</style>