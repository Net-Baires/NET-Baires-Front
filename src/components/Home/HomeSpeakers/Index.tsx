import React, { useState, useEffect } from "react";
import { getSpeakers } from "../../../services/speakersServices";
import { Speaker } from "../../../services/models/speaker";
import { isEmpty } from "../../../services/objectsservices";

type HomeSpeakersProps = {};
const HomeSpeakers: React.SFC<HomeSpeakersProps> = () => {
  let speakersDefault: Speaker[] = [];
  const [speakers, setSpeakers] = useState(speakersDefault);
  useEffect(() => {
    getSpeakers().then(x => setSpeakers(x));
  }, []);
  return (
    <>
      {!isEmpty(speakers) && (
        <section>
          <div id="lgx-speakers" className="lgx-speakers">
            <div className="lgx-inner">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="lgx-heading">
                      <h2 className="heading">Algunos de Nuestros Speakers</h2>
                      <h3 className="subheading">
                        Gracias a todos los oradores que colaboral con nuestra
                        comunidad!!
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
                              {speaker.twitter && (
                                <a
                                  className="sp-tw"
                                  href={
                                    "https://twitter.com/" + speaker.twitter
                                  }
                                >
                                  <i className="fab fa-twitter"></i>
                                </a>
                              )}
                              {speaker.github && (
                                <a
                                  className="sp-insta"
                                  href={"https://github.com/" + speaker.github}
                                >
                                  <i className="fab fa-github"></i>
                                </a>
                              )}
                              {speaker.instagram && (
                                <a
                                  className="sp-insta"
                                  href={
                                    "https://www.instagram.com/" +
                                    speaker.instagram
                                  }
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                              )}
                              {speaker.linkedin && (
                                <a
                                  className="sp-in"
                                  href={"linkedin.com/in/" + speaker.linkedin}
                                >
                                  <i className="fab fa-linkedin-in"></i>
                                </a>
                              )}
                            </div>
                            <div className="speaker-info">
                              <h3 className="title">
                                <a href="speaker.html">{speaker.firstName}</a>
                              </h3>
                              <h4 className="subtitle">{speaker.lastName}</h4>
                            </div>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  ))}
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
      )}
    </>
  );
};

export default HomeSpeakers;
