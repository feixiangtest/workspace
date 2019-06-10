const Music = {
  install: function (Vue, options) {
    // 播放音频函数
    Vue.prototype.playMusic = function (playId) {
      if (playId === null || playId === undefined || playId === '') {
        return
      }
      let isOpenMusic = localStorage.getItem('isOpenMusic')
      if (isOpenMusic !== 'true') {
        return
      }
      var music = document.getElementById(playId)
      music.pause()
      music.currentTime = 0 // 播放之前先复位，非常重要
      music.play()

      if (navigator.userAgent.indexOf('UCBrowser') > -1) {
        if (playId === 'winAudio') {
          setTimeout(function () {
            music.pause()
          }, 330)
        } else if (playId === 'duAudio') {
          setTimeout(function () {
            music.pause()
          }, 1140)
        } else if (playId === 'openAudio') {
          setTimeout(function () {
            music.pause()
          }, 1770)
        } else if (playId === 'chatAudio') {
          setTimeout(function () {
            music.pause()
          }, 1250)
        }
      }
    }
  }
}

export default Music
