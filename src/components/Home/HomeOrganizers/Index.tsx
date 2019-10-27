import React, { useState, useEffect } from "react";
import { getOrganizers } from "../../../services/organizersServices";
import { Member } from "../../../services/models/Member";
import { isEmpty } from "../../../services/objectsservices";
type HomeOrganizersProps = {};
const HomeOrganizers: React.SFC<HomeOrganizersProps> = () => {
  let organizerDefault: Member[] = [];
  const [organizers, setOrganizers] = useState(organizerDefault);
  useEffect(() => {
    getOrganizers().then(x => setOrganizers(x));
  }, []);
  return (
    <>
      {!isEmpty(organizers) && (
        <section>
          <div id="lgx-testimonial" className="lgx-testimonial">
            <div className="lgx-inner">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="lgx-heading">
                      <h2 className="heading">Organizadores de la Comunidad</h2>
                      <h3 className="subheading">
                        Estos son los miembros que trabajan por nuestra
                        comunidad
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    id="lgx-owltestimonial"
                    className="lgx-owltestimonial lgx-owlnews"
                  >
                    {organizers.map(organizer => (
                      <div className="lgx-single-speaker2 lgx-single-speaker3">
                        <figure>
                          <a className="profile-img" href="speakers.html">
                            <img src={organizer.picture} alt="Speaker" />
                          </a>
                          <figcaption>
                            <div className="social-group">
                              {organizer.twitter && (
                                <a
                                  className="sp-tw"
                                  href={
                                    "https://twitter.com/" + organizer.twitter
                                  }
                                >
                                  <i className="fab fa-twitter"></i>
                                </a>
                              )}
                              {organizer.github && (
                                <a
                                  className="sp-insta"
                                  href={
                                    "https://github.com/" + organizer.github
                                  }
                                >
                                  <i className="fab fa-github"></i>
                                </a>
                              )}
                              {organizer.instagram && (
                                <a
                                  className="sp-insta"
                                  href={
                                    "https://www.instagram.com/" +
                                    organizer.instagram
                                  }
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                              )}
                              {organizer.linkedin && (
                                <a
                                  className="sp-in"
                                  href={"linkedin.com/in/" + organizer.linkedin}
                                >
                                  <i className="fab fa-linkedin-in"></i>
                                </a>
                              )}
                            </div>
                            <div className="speaker-info">
                              <h3 className="title">
                                <a href="speaker.html">
                                  {organizer.firstName} {organizer.lastName}
                                </a>
                              </h3>
                              <h4 className="subtitle">
                                {organizer.workPosition}
                              </h4>
                            </div>
                          </figcaption>
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* <h1 className="my-4">Organizadores</h1>
      <div className="row">
        {organizer.map(organizer => (
          <div key={organizer.id} className="col-lg-4 mb-4">
            <div className="card h-100">
              <h4 className="card-header">
                {organizer.name} - {organizer.lastName}
              </h4>
              <div className="card-body">
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sapiente esse necessitatibus neque.
                </p>
              </div>
              <div className="card-footer">
                <NavLink
                  exact
                  className="btn btn-primary"
                  to={`/organizador/${organizer.id}`}
                >
                  Learn More
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default HomeOrganizers;
