import React, { useState, useEffect } from "react";
import { getSpeakers } from "../../../services/speakersServices";
import { Speaker } from "../../../services/models/speaker";
import { NavLink } from "react-router-dom";

type HomeSpeakersProps = {};
const HomeSpeakers: React.SFC<HomeSpeakersProps> = () => {
  let speakersDefault: Speaker[] = [];
  const [speakers, setSpeakers] = useState(speakersDefault);
  useEffect(() => {
    getSpeakers().then(x => setSpeakers(x));
  }, []);
  return (
    <>
      <section>
        <div id="lgx-speakers" className="lgx-speakers">
          <div className="lgx-inner">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="lgx-heading">
                    <h2 className="heading">Algunos de Nuestros Speakers</h2>
                    <h3 className="subheading">
                    Gracias a todos los oradores que colaboral con nuestra comunidad!!
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row">
              {speakers.map(speaker => (
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="lgx-single-speaker lgx-single-speaker-circle">
                    <figure>
                      <a className="profile-img" href="speakers.html">
                        <img src={speaker.picture} alt="Speaker" />
                      </a>
                      <figcaption>
                        <div className="social-group">
                          <a className="sp-tw" href="#">
                            <i className="fa fa-twitter"></i>
                          </a>
                          <a className="sp-fb" href="#">
                            <i className="fa fa-facebook"></i>
                          </a>
                          <a className="sp-insta" href="#">
                            <i className="fa fa-instagram"></i>
                          </a>
                          <a className="sp-in" href="#">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </div>
                        <div className="speaker-info">
                          <h3 className="title">
                            <a href="speaker.html">{speaker.name}</a>
                          </h3>
                          <h4 className="subtitle">{speaker.lastName}</h4>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>))}
           
           
           
              </div>
              <div className="section-btn-area">
                <a className="lgx-btn lgx-btn-big" href="speakers.html">
                  Mas Speakers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSpeakers;
