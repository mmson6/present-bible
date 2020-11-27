<template>
    <b-row class="eng-verse">
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
    props: ['verseHash'],

    computed: {

    }
}
</script>

<style scoped>
.eng-verse{
    align-content: left;
    color: white;
    font-size: 20px;
}
.spn-verse{
    align-content: left;
    color: yellow;
    font-size: 20px;
}
</style>