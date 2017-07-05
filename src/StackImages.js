import React, {Component} from 'react';
import classNames from 'classnames';

class StackImages extends Component {
  state = {
    images: [
      {file: require('./img/wolt-partner-prebooked-hours.png'), alt: 'Wolt Partner tuntien varaus'},
      {file: require('./img/wolt-partner-map.png'), alt: 'Wolt Partner karttanäkymä'},
      {file: require('./img/wolt-partner-login.png'), alt: 'Wolt Partner kirjautumisnäkymä'},
    ]
  }

  activeImage = activateIndex => {
    this.setState({
      activeIndex: activateIndex === this.state.activeIndex ? null : activateIndex,
    });
  }

  render() {
    return (
      <div className="case__images stack-images">
        {this.state.images.map((image, index) => (
          <img 
            key={index}
            className={classNames({
              'stack-image': true,
              'stack-image--active': this.state.activeIndex === index,
              'stack-image--hidden': Number.isInteger(this.state.activeIndex) && this.state.activeIndex !== index,
            })} 
            src={image.file} 
            alt={image.alt} 
            style={{
              top: Math.abs(index * 30 - 60)
            }}
            onClick={() => this.activeImage(index)}
          />
        ))}
      </div>
    );
  }
}

export default StackImages;