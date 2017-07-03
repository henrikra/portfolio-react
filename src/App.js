import React, { Component } from 'react';
import {Motion, spring, StaggeredMotion} from 'react-motion';

import CaseImages from './CaseImages';

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
              style={{letterSpacing: slowSpring(15), opacity: slowSpring(1)}}
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
              style={{height: spring(80)}}
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
        <section className="intro-section">
          <div className="container">
            <h2 className="section-title">React on mun juttu!</h2>
            <p>Ihastuin Reactiin jo 2015 vuonna ja siitä asti olemme olleet parhaita kavereita. Nyt hänen kanssaan on tullut tehtyä projekteja web maailmassa sekä mobiilikehityksessä React Nativen avulla. Funktionaalinen ohjelmointi tyyli on myös mieluista varsinkin datan mälväämisessä.</p>
            <p>Pellentesque ultricies volutpat nulla non scelerisque. Fusce turpis tortor, ultricies quis neque vel, porta aliquet lacus. Pellentesque id arcu a ligula tincidunt efficitur vitae et nunc. Sed sed tempus mauris, a dignissim neque. Nunc sed orci vel tortor semper finibus. Fusce rutrum vitae mi et scelerisque. Etiam mollis, leo eget gravida accumsan, tortor lorem mattis leo, vitae sodales arcu ligula eget enim. Pellentesque eget auctor ante.</p>
            <div className="react-logo">
              <div className="react-logo__ball" />
              <div className="react-logo__oval" />
              <div className="react-logo__oval react-logo__oval--second" />
              <div className="react-logo__oval react-logo__oval--third" />
            </div>
          </div>
        </section>
        <section className="showcase-section">
          <div className="container">
            <div className="case">
              <CaseImages />
              <div className="case__details">
                <h4 className="case__title">Wolt Parner App</h4>
                <ul className="case__features">
                  <li className="case__feature">React Native</li>
                  <li className="case__feature">Redux</li>
                  <li className="case__feature">Redux Saga</li>
                  <li className="case__feature">Ramda</li>
                </ul>
                <p className="case__description">Woltin lähettikumppanit käyttävät Wolt Partneria työkalunaan aina työskennellessään. Liityin projektiin sen alkuvaiheessa, joten kädenjälkeäni näkyy apissa paljon. Vivamus mollis consectetur metus, mollis euismod nisi hendrerit vitae.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section">
          <h2 className="section-title">Aloitetaanko hommat?!</h2>
          <div className="container">
            <div className="contact-container">
              <figure className="my-picture-container">
                <img className="my-picture" src={require('./henrik.jpg')} alt="Picture of me"/>
                <figcaption className="my-picture__caption">Tässä vielä kuva musta niin tunnistat kun nähdään!</figcaption>
              </figure>
              <div className="contacts">
                <div className="contact">
                  <i className="contact__icon fa fa-mobile" aria-hidden="true" />
                  <span className="contact__title">0400 637916</span>
                </div>
                <div className="contact contact--small">
                  <i className="contact__icon contact__icon--small fa fa-envelope" aria-hidden="true" />
                  <span className="contact__title">henrik@raitasola.fi</span>
                </div>
                <div className="contact">
                  <i className="contact__icon fa fa-github" aria-hidden="true" />
                  <span className="contact__title">GitHub</span>
                </div>
                <div className="contact contact--small">
                  <i className="contact__icon contact__icon--small fa fa-linkedin" aria-hidden="true" />
                  <span className="contact__title">LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
