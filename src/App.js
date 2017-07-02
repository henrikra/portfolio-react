import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="header__title">Henrik Raitasola</h1>
          <div className="header__pieces">
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
                  <div 
                    className="header__piece" 
                    style={{
                      clipPath: 'polygon(15% 5%, 65% 5%, 65% 70%, 15% 70%)'
                    }} 
                  />
                  <Motion
                    defaultStyle={{opacity: 0}}
                    style={{opacity: spring(1)}}
                  >
                    {({opacity}) => (
                      <div 
                        className="header__piece__shadow" 
                        style={{
                          left: '15%',
                          top: '5%',
                          width: '50%',
                          height: '65%',
                          opacity,
                        }}
                      />
                    )}
                  </Motion>
                </div>
              )}
            </Motion>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
