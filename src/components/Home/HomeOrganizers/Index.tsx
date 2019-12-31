import React from "react";
import { Member } from "../../../services/models/Member";
import { isEmpty } from "../../../services/objectsservices";
type HomeOrganizersProps = {
  organizers: Member[];
};
const HomeOrganizers: React.SFC<HomeOrganizersProps> = ({ organizers }) => {
  return (
    <>
      {!isEmpty(organizers) && (
        <div className="testimonial-section">
          <div className="container">
            <div className="row text-center">
              {organizers.map(organizer => (
                <div className="col-md-4">
                  <div className="testimonials owl-carousel owl-theme">
                    <div className="testimonial-single">
                      <img
                        className="img-circle"
                        src={organizer.picture}
                        alt="Client Testimonoal"
                      />
                      <div
                        className="testimonial-text wow fadeInUp"
                        data-wow-delay="0.2s"
                      >
                        <p>
                          Totally flexible admin template. Easy to use and easy
                          to manage all the elements in entire theme.{" "}
                          <br className="hidden-xs" /> Great support team behind
                          this product. Low turnaround time with exact support
                          which i needed.
                        </p>
                        <h3>Code Quality</h3>
                        <h3> - amit1134 [Buyer - NZ]</h3>
                        <i className="ion ion-star"></i>
                        <i className="ion ion-star"></i>
                        <i className="ion ion-star"></i>
                        <i className="ion ion-star"></i>
                        <i className="ion ion-star"></i>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeOrganizers;
