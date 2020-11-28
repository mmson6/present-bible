<template>
    <b-row class="eng-verse" v-bind:style="{ fontSize: verseFontSize + 'px' }">
        <b-col cols="1" class="text-right">
            <span>{{verseHash.verseNumber}}</span>
        </b-col>
        <b-col cols="11">
            <span>{{verseHash.nkjvVerse}}</span>
            <p class="spn-verse">{{verseHash.rvrVerse}}</p>
            <br>
        </b-col>            
    </b-row>
</template>

<script>
export default {
    name: 'Verse',
    props: ['verseHash', 'verseFontSize'],

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