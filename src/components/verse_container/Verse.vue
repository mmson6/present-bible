<template>
    <b-row class="eng-verse">
        <b-col cols="1" class="text-right">
            <span>{{verseHash.verseNumber}}</span>
        </b-col>
        <b-col cols="11">
            <p>{{verseHash.verse}}</p>
        </b-col>            
    </b-row>
</template>

<script>
export default {
    name: 'Verse',
    props: ['verseHash']
}
</script>

<style scoped>
.eng-verse{
    align-content: left;
    color: white;
    font-size: 20px;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>