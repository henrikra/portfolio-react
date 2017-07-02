import React, { Component } from 'react';
import {Motion, spring, StaggeredMotion} from 'react-motion';

import './App.css';

const headerPieces = [
  {
    left: 60,
    top: 20,
    width: 30,
    height: 65,
  },
  {
    left: 5,
    top: 5,
    width: 40,
    height: 45,
  },
  {
    left: 15,
    top: 10,
    width: 50,
    height: 65,
  },
];

const slowSpring = value => spring(value, {
  stiffness: 53,
  damping: 27,
});

class App extends Component {
  state = {
    showTitle: false,
    showPieces: false,
    showSecondaryTitle: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showPieces: true});
    }, 750);
    setTimeout(() => {
      this.setState({showTitle: true});
    }, 2000);
    setTimeout(() => {
      this.setState({showSecondaryTitle: true});
    }, 3000);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          {this.state.showTitle && (
            <Motion
              defaultStyle={{letterSpacing: 50, opacity: 0}}
              style={{letterSpacing: slowSpring(20), opacity: slowSpring(1)}}
            >
              {({letterSpacing, opacity}) => (
                <h1 
                  className="header__title"
                  style={{letterSpacing, opacity}}
                >
                  Henrik Raitasola
                </h1>
              )}
            </Motion>
          )}
          {this.state.showSecondaryTitle && (
            <Motion
              defaultStyle={{height: 0}}
              style={{height: slowSpring(80)}}
            >
              {({height}) => (
                <div className="header__title-secondary-wrapper" style={{height}}>
                  <h4 className="header__title-secondary">
                    React developer
                  </h4>
                </div>
              )}
            </Motion>
          )}
          {this.state.showPieces && (
            <StaggeredMotion
              defaultStyles={headerPieces.map(headerPiece => ({...headerPiece, z: 0}))}
              styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => 
                i === 0
                ? {z: slowSpring(50)}
                : {z: slowSpring(prevInterpolatedStyles[i - 1].z)}
              )}
            >
              {interpolatingStyles => (
                <div className="header__pieces">
                  {interpolatingStyles.map((style, i) =>
                    <div 
                      key={i}
                      className="header__piece-wrap"
                      style={{
                        transform: `translateZ(${style.z}px)`,
                      }}
                    >
                      <Motion
                        defaultStyle={{opacity: 0}}
                        style={{opacity: slowSpring(1)}}
                      >
                        {({opacity}) => (
                          <div 
                            className="header__piece__shadow" 
                            style={{
                              left: `${style.left}%`, 
                              top: `${style.top}%`, 
                              width: `${style.width}%`, 
                              height: `${style.height}%`, 
                              opacity,
                            }}
                          />
                        )}
                      </Motion>
                      <div 
                        className="header__piece" 
                        style={{
                          clipPath: `polygon(${style.left}% ${style.top}%, ${style.left + style.width}% ${style.top}%, ${style.left + style.width}% ${style.top + style.height}%, ${style.left}% ${style.top + style.height}%)`
                        }} 
                      />
                    </div>
                  )}
                </div>
              )}
            </StaggeredMotion>
          )}
        </div>
        <section className="next-section">
          <div className="container">
            <h2 className="section-title">Diipadaa on mun juttu</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tincidunt tellus in finibus. Pellentesque ultricies volutpat nulla non scelerisque. Fusce turpis tortor, ultricies quis neque vel, porta aliquet lacus. Pellentesque id arcu a ligula tincidunt efficitur vitae et nunc.</p>
            <p>Pellentesque ultricies volutpat nulla non scelerisque. Fusce turpis tortor, ultricies quis neque vel, porta aliquet lacus. Pellentesque id arcu a ligula tincidunt efficitur vitae et nunc. Sed sed tempus mauris, a dignissim neque. Nunc sed orci vel tortor semper finibus. Fusce rutrum vitae mi et scelerisque. Etiam mollis, leo eget gravida accumsan, tortor lorem mattis leo, vitae sodales arcu ligula eget enim. Pellentesque eget auctor ante.</p>
            <div className="react-logo">
              <div className="react-logo__ball" />
              <div className="react-logo__oval" />
              <div className="react-logo__oval react-logo__oval--second" />
              <div className="react-logo__oval react-logo__oval--third" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
