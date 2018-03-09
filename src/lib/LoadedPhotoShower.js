import $ from 'jquery'
import imagesLoaded from 'imagesloaded'

class LoadedPhotoShower {
  constructor(containerSelector, photoSelector) {
    this.photoContainer = document.querySelector(containerSelector)
    this.$photoContainer = $(containerSelector)
    this.loadedIndices = []
    this.$photosArray = $(photoSelector)
    imagesLoaded(this.photoContainer).on('progress', (instance, image) => {
      this.addPhotoIndex($(image.img.parentElement).index())
    })
  }

  addPhotoIndex(index) {
    this.loadedIndices.push(index)
    this.loadedIndices.sort((a, b) => { return a-b })
    for(let i = 0; i < this.loadedIndices.length; i++)
      if(this.loadedIndices[i] == i + 1)
        this.showImageAtIndex(i)
      else
        break
  }

  showImageAtIndex(index) {
    this.$photosArray.eq(index).removeClass('gallery-galleryTile-loading')
  }
}

export default LoadedPhotoShower
