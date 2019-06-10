<<template>
  <div>
    <audio id="chatAudio">
        <source :src="'//sytl3.com'+imgUrl+'/chipin.ogg'" type="audio/ogg">
        <source :src="'//sytl3.com'+imgUrl+'/chipin.mp3'" type="audio/mpeg">
        <source :src="'//sytl3.com'+imgUrl+'/chipin.wav'" type="audio/wav">
    </audio>
    <audio id="duAudio">
        <source :src="'//sytl3.com'+imgUrl+'/du.ogg'" type="audio/ogg">
        <source :src="'//sytl3.com'+imgUrl+'/du.mp3'" type="audio/mpeg">
        <source :src="'//sytl3.com'+imgUrl+'/du.wav'" type="audio/wav">
    </audio>
    <audio id="winAudio">
        <source :src="'//sytl3.com'+imgUrl+'/win.ogg'" type="audio/ogg">
        <source :src="'//sytl3.com'+imgUrl+'/win.mp3'" type="audio/mpeg">
        <source :src="'//sytl3.com'+imgUrl+'/win.wav'" type="audio/wav">
    </audio>
    <audio id="openAudio">
        <source :src="'//sytl3.com'+imgUrl+'/open.ogg'" type="audio/ogg">
        <source :src="'//sytl3.com'+imgUrl+'/open.mp3'" type="audio/mpeg">
        <source :src="'//sytl3.com'+imgUrl+'/open.wav'" type="audio/wav">
    </audio>
  </div>
</template>
<script>
export default {
  computed: {
    imgUrl () {
      return this.$store.state.home.commonMusicUrl
    }
  }
}
</script>
