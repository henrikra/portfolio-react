import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

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
    top: 5,
    width: 50,
    height: 65,
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="header__pieces">
            {headerPieces.map(({left, top, width, height}) => (
              <Motion
                defaultStyle={{z: 0}}
                style={{z: spring(20)}}
              >
                {({z}) => (
                  <div 
                    className="header__piece-wrap"
                    style={{
                      transform: `translateZ(${z}px)`,
                    }}
                  >
                    <Motion
                      defaultStyle={{opacity: 0}}
                      style={{opacity: spring(1)}}
                    >
                      {({opacity}) => (
                        <div 
                          className="header__piece__shadow" 
                          style={{
                            left: `${left}%`, 
                            top: `${top}%`, 
                            width: `${width}%`, 
                            height: `${height}%`, 
                            opacity,
                          }}
                        />
                      )}
                    </Motion>
                    <div 
                      className="header__piece" 
                      style={{
                        clipPath: `polygon(${left}% ${top}%, ${left + width}% ${top}%, ${left + width}% ${top + height}%, ${left}% ${top + height}%)`
                      }} 
                    />
                  </div>
                )}
              </Motion>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
