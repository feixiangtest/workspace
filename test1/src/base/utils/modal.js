class modal {
  constructor (options = {}, $this) {
    this.options = options
  }

  init ($this) {
    $this.modalOptions = ''
  }

  hide ($this) {
    $this.modalOptions = 'animated fadeOutDownBig'
    setTimeout(function () {
     // $this.modalOptions = ''
    }, 520)
  }

  show ($this) {
    console.info('show', this, $this)
    $this.modalOptions = ''
    $this.modalOptions = 'active animated fadeInUpBig'
  }
}

export default modal
