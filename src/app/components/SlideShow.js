import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

var FAIcon = require('react-fontawesome');

export default class SlideShow extends Component {
  constructor(props) {
    super(props);
  }

  renderItem(item) {
    return (
      <div className="content__slideshow__container">
        <img src={item.original} className="content__slideshow" />
      </div>
    )
  }

  render() {
    const { images, wrapperStyles } = this.props;

    return (
        <ImageGallery
          renderItem={(i) => this.renderItem(i)}
          items={images}
          showNav={true}
          renderLeftNav={(onClick, disabled) => {
            return (
              <div onClick={onClick} className='content__slideshow__nav--left'>
                <FAIcon name={'arrow-circle-o-left'} style={{color: 'white', fontSize: 25}}/>
              </div>
            )
          }}
          renderRightNav={(onClick, disabled) => {
            return (
              <div onClick={onClick} className='content__slideshow__nav--right'>
                <FAIcon name={'arrow-circle-o-right'} style={{color: 'white', fontSize: 25}}/>
              </div>
            )
          }}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={false}
          autoPlay={true}
          slideInterval={5000}
          swipingTransitionDuration={200}
        />
    );
  }
}
