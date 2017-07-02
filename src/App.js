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
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="header__pieces">
            <StaggeredMotion
              defaultStyles={headerPieces.map(headerPiece => ({...headerPiece, z: 0}))}
              styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => 
                i === 0
                ? {z: slowSpring(40)}
                : {z: slowSpring(prevInterpolatedStyles[i - 1].z)}
              )}
            >
              {interpolatingStyles => (
                <div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
