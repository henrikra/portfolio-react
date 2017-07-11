import React, { Component } from 'react';
import {Motion, spring, StaggeredMotion} from 'react-motion';

import StackImages from './StackImages';
import translations from './translations';

import './App.css';

const isMobile = window.innerWidth <= 800 || window.innerHeight <= 600;

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
    showDownArrow: false,
  }

  componentDidMount() {
    const firstDelay = 750;
    if (!isMobile) {
      setTimeout(() => {
        this.setState({showPieces: true});
      }, firstDelay);
    }
    setTimeout(() => {
      this.setState({showTitle: true});
    }, 2000 - (isMobile ? firstDelay : 0));
    setTimeout(() => {
      this.setState({showSecondaryTitle: true});
    }, 3000 - (isMobile ? firstDelay : 0));
    setTimeout(() => {
      this.setState({showDownArrow: true});
    }, 4500 - (isMobile ? firstDelay : 0));
  }

  _onSetLanguageToItalian = () => {
    translations.setLanguage('fi');
    this.setState({});
  }

  render() {
    return (
      <div>
        <header className="header">
          {this.state.showTitle && (
            <Motion
              defaultStyle={{letterSpacing: isMobile ? 25 : 50, opacity: 0}}
              style={{letterSpacing: slowSpring(isMobile ? 3 : 15), opacity: slowSpring(1)}}
            >
              {({letterSpacing, opacity}) => (
                <h1 
                  className="header__title"
                  style={{letterSpacing, opacity}}
                >
                  {translations.myName}
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
                <div className="header__secondary-title" style={{height}}>
                  <h4 className="header__secondary-title__text">
                    {translations.reactDeveloper}
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
                  {interpolatingStyles.map(({z, left, top, width, height}, i) =>
                    <div 
                      key={i}
                      className="header__piece"
                      style={{transform: `translateZ(${z}px)`}}
                    >
                      <Motion
                        defaultStyle={{opacity: 0}}
                        style={{opacity: slowSpring(1)}}
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
                        className="header__piece__mask" 
                        style={{
                          clipPath: `polygon(${left}% ${top}%, ${left + width}% ${top}%, ${left + width}% ${top + height}%, ${left}% ${top + height}%)`
                        }} 
                      />
                    </div>
                  )}
                </div>
              )}
            </StaggeredMotion>
          )}
          {this.state.showDownArrow && (
            <Motion
              defaultStyle={{opacity: 0}}
              style={{opacity: slowSpring(0.5)}}
            >
              {({opacity}) => (
                <i 
                  className="fa fa-level-down header__down" 
                  aria-hidden="true"
                  style={{opacity}}
                />
              )}
            </Motion>
          )}
        </header>
        <section className="intro-section">
          <div className="container">
            <h2>{translations.reactIsMyThing}</h2>
            <p>{translations.introParagraph1}</p>
            <p>{translations.introParagraph2}</p>
            <div className="react-logo" onClick={this._onSetLanguageToItalian}>
              <div className="react-logo__ball" />
              <div className="react-logo__oval" />
              <div className="react-logo__oval react-logo__oval--second" />
              <div className="react-logo__oval react-logo__oval--third" />
            </div>
          </div>
        </section>
        <section className="showcase-section">
          <div className="showcase-section__content">
            <div className="container">
              <h2>{translations.workSamples}</h2>
              <div className="case case--top-margin">
                <StackImages />
                <div className="case__images case__images--mobile">
                  <img className="case__image" src={require('./img/wolt-partner-map.png')} alt="Työeläkeote tietokoneen näytöllä"/>
                </div>
                <div className="case__details">
                  <h4 className="case__title">{translations.woltPartnerApp}</h4>
                  <ul className="case__features">
                    <li className="case__feature">React Native</li>
                    <li className="case__feature">Redux</li>
                    <li className="case__feature">Redux Saga</li>
                    <li className="case__feature">Ramda</li>
                  </ul>
                  <p className="case__description">
                    {
                      translations.formatString(
                        translations.woltPartnerDescription, 
                        <a href="https://wolt.com/" target="_blank" rel="noopener noreferrer">{translations.wolts}</a>
                      )
                    }
                  </p>
                </div>
              </div>
              <div className="case">
                <div className="case__details case__details--left">
                  <h4 className="case__title">{translations.pensionRecord}</h4>
                  <ul className="case__features">
                    <li className="case__feature">React</li>
                    <li className="case__feature">Flux</li>
                    <li className="case__feature">Fludux</li>
                    <li className="case__feature">Lodash</li>
                  </ul>
                  <p className="case__description">
                    {
                      translations.formatString(
                        translations.pensionRecordDescription, 
                        <a href="https://www.siili.com" target="_blank" rel="noopener noreferrer">{translations.siilis}</a>
                      )
                    }
                  </p>
                </div>
                <div className="case__images">
                  <img className="case__image" src={require('./img/elo.png')} alt="Työeläkeote tietokoneen näytöllä"/>
                </div>
              </div>
              <div className="case">
                <div className="case__images">
                  <img className="case__image" src={require('./img/cloth-card.gif')} alt="Cloth Card työnäyte"/>
                </div>
                <div className="case__details">
                  <h4 className="case__title">{translations.clothCard}</h4>
                  <ul className="case__features">
                    <li className="case__feature">React Native</li>
                    <li className="case__feature">Animated</li>
                  </ul>
                  <p className="case__description">
                    {
                      translations.formatString(
                        translations.clothCardDescription, 
                        <a href="https://github.com/henrikra/clothCard" target="_blank" rel="noopener noreferrer">{translations.atGitHub}</a>
                      )
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section">
          <div className="container container--big">
            <h2>{translations.shouldWeStartWorking}</h2>
            <div className="contact-content">
              <figure className="me">
                <img className="me__image" src={require('./img/henrik.jpg')} alt="Henrik Raitasola"/>
                <figcaption className="me__caption">{translations.hereIsPictureOfMe}</figcaption>
              </figure>
              <div className="contacts">
                <div className="pin">
                  <div className="pin__ball" />
                  <div className="pin__pulse" />
                  <div className="pin__pulse pin__pulse--delay" />
                </div>
                <a className="contact" href="tel:+358400637916">
                  <i className="contact__icon fa fa-mobile" aria-hidden="true" />
                  <span className="contact__title">0400 637916</span>
                </a>
                <a className="contact" href="https://github.com/henrikra" target="_blank" rel="noopener noreferrer">
                  <i className="contact__icon fa fa-github" aria-hidden="true" />
                  <span className="contact__title">GitHub</span>
                </a>
                <a className="contact" href="https://linkedin.com/in/henrikraitasola" target="_blank" rel="noopener noreferrer">
                  <i className="contact__icon contact__icon--small fa fa-linkedin" aria-hidden="true" />
                  <span className="contact__title">LinkedIn</span>
                </a>
                <a className="contact" href="mailto:henrik.raitasola@gmail.com">
                  <i className="contact__icon contact__icon--small fa fa-envelope" aria-hidden="true" />
                  <span className="contact__title">henrik.raitasola@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
