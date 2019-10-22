import React, { useState, useEffect } from "react";
import { getOrganizers } from "../../../services/organizersServices";
import { NavLink } from "react-router-dom";
import { Speaker } from "../../../services/models/speaker";
import { SecureElement } from "../../../components/Auth/SecureElement";

type HomeOrganizersProps = {};
const HomeOrganizers: React.SFC<HomeOrganizersProps> = () => {
  let organizerDefault: Speaker[] = [];
  const [organizer, setOrganizers] = useState(organizerDefault);
  useEffect(() => {
    getOrganizers().then(x => setOrganizers(x));
  }, []);
  return (
    <>
      <section>
        <div id="lgx-testimonial" className="lgx-testimonial">
          <div className="lgx-inner">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="lgx-heading">
                    <h2 className="heading">Organizadores de la Comunidad</h2>
                    <h3 className="subheading">
                      Estos son los miembros que trabajan por la comunidad
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  id="lgx-owltestimonial"
                  className="lgx-owltestimonial lgx-owlnews"
                >
                  <div className="item">
                    <blockquote className="lgx-testi-single">
                      <p>
                        <span>This is the best Restaurant in the world</span>{" "}
                        Proin sodales dapibus magna, et porta leo convallis sed.
                        Duis tincidunt libero ut neque mollis dignissim. Nullam
                        ultricies sit amet quam non iaculis. Curabitur convallis
                        nulla non nibh aliquet rhoncus. Donec at tempus felis.
                      </p>
                      <div className="author">
                        <img src="http://placehold.it/83x83" alt="author"></img>
                        <h4 className="title">
                          <a href="#"></a>Jonathon Doe
                        </h4>
                        <div className="rate">
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                  <div className="item">
                    <blockquote className="lgx-testi-single">
                      <p>
                        <span>This is the best Restaurant in the world</span>{" "}
                        Proin sodales dapibus magna, et porta leo convallis sed.
                        Duis tincidunt libero ut neque mollis dignissim. Nullam
                        ultricies sit amet quam non iaculis. Curabitur convallis
                        nulla non nibh aliquet rhoncus. Donec at tempus felis.
                      </p>
                      <div className="author">
                        <img src="http://placehold.it/83x83" alt="author"></img>
                        <h4 className="title">
                          <a href="#"></a>Jonathon Doe
                        </h4>
                        <div className="rate">
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                  <div className="item">
                    <blockquote className="lgx-testi-single">
                      <p>
                        <span>This is the best Restaurant in the world</span>{" "}
                        Proin sodales dapibus magna, et porta leo convallis sed.
                        Duis tincidunt libero ut neque mollis dignissim. Nullam
                        ultricies sit amet quam non iaculis. Curabitur convallis
                        nulla non nibh aliquet rhoncus. Donec at tempus felis.
                      </p>
                      <div className="author">
                        <img src="http://placehold.it/83x83" alt="author"></img>
                        <h4 className="title">
                          <a href="#"></a>Jonathon Doe
                        </h4>
                        <div className="rate">
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
