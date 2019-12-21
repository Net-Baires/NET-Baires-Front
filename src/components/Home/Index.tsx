import React, { useEffect, useState } from "react";
import HomeSpeakers from "./HomeSpeakers";
import HomeOrganizers from "./HomeOrganizers/Index";
import HomeSponsors from "./HomeSponsors/Index";
import LastEvents from "./LastEvents/Index";
import { getCommunitySummary } from "../../services/communityServices";
import { Member } from "../../services/models/Member";

import { Sponsor } from "../../services/models/sponsor";
import { EventDetail } from "../../services/models/Events/Event";
import NumbersHomeSummary from "./NumbersHomeSummary";

type LoginProps = {};
export const Home: React.SFC<LoginProps> = () => {
  const [sponsors, setSponsors] = useState(new Array<Sponsor>());
  const [speakers, setSpeakers] = useState(new Array<Member>());
  const [organizers, setOrganizers] = useState(new Array<Member>());
  const [lastEvents, setLastEvents] = useState(new Array<EventDetail>());
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalSlackMembers, setTotalSlackMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    getCommunitySummary().then(x => {
      setSponsors(x.sponsors);
      setSpeakers(x.speakers);
      setOrganizers(x.organizers);
      setLastEvents(x.lastEvents);
      setTotalEvents(x.totalEvents);
      setTotalSlackMembers(x.totalUsersSlack);
      setTotalMembers(x.totalUsersMeetup);
      setTotalSpeakers(x.totalSpeakers);
    });
  }, []);
  return (
    <>
      {/* <HomeHeaderBanner></HomeHeaderBanner> */}
      {/* <NextEvent></NextEvent> */}
      {/* <HomeSpeakers speakers={speakers}></HomeSpeakers> */}

      {/* <LastEvents events={lastEvents}></LastEvents> */}
      {/* <PhotosSummary></PhotosSummary> */}
      {/* <HomeOrganizers organizers={organizers}></HomeOrganizers> */}
      {/* <VideoPreview></VideoPreview> */}

      <div className="hero-section app-hero">
        <div className="container">
          <div className="hero-content app-hero-content text-center">
            <div className="row justify-content-md-center">
              <div className="col-md-10">
                <h1 className="wow fadeInUp main-title" data-wow-delay="0s">
                  NET-Baires
                </h1>
                <p
                  className="wow fadeInUp main-subttitle"
                  data-wow-delay="0.2s"
                >
                  Somor la comunidad de .NET mas grande de la Argentina.
                </p>
                <a
                  className="btn btn-primary btn-action"
                  data-wow-delay="0.2s"
                  href="#!"
                >
                  Unirme a Slack
                </a>
                {/* <a className="btn btn-primary btn-action" data-wow-delay="0.2s" href="#!">Buy Now</a> */}
              </div>
              {/* <div className="col-md-12">
                                <div className="hero-image">
                                    <img className="img-fluid" src="assets/images/app_hero_1.png" alt="" />
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="services-section text-center" id="services">
        <div className="container">
          <div className="row  justify-content-md-center">
            <div className="col-md-8">
              <div className="services-content">
                <h1 className="wow fadeInUp" data-wow-delay="0s">
                  We take care our products for more feature rich
                </h1>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Datta Able is one of the finest Admin dashboard template in
                  its category. Premium admin dashboard with high end feature
                  rich possibilities.
                </p>
              </div>
            </div>
            <div className="col-md-12 text-center">
              <div className="services">
                <div className="row">
                  <div className="col-sm-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="services-icon">
                      <img
                        src="assets/logos/icon1.png"
                        height="60"
                        width="60"
                        alt="Service"
                      />
                    </div>
                    <div className="services-description">
                      <h1>Mega feature rich</h1>
                      <p>
                        Datta Able is one of unique dashboard template which
                        come with tons of ready to use feature. We continuous
                        working on it to provide latest updates in digital
                        market.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-4 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="services-icon">
                      <img
                        className="icon-2"
                        src="assets/logos/icon2.png"
                        height="60"
                        width="60"
                        alt="Service"
                      />
                    </div>
                    <div className="services-description">
                      <h1>Fast and Robust</h1>
                      <p>
                        We are contantly working on Datta Able and improve its
                        performance too. Your definitely give higher rating to
                        Datta Able for its performance.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-4 wow fadeInUp" data-wow-delay="0.4s">
                    <div className="services-icon">
                      <img
                        className="icon-3"
                        src="assets/logos/icon3.png"
                        height="60"
                        width="60"
                        alt="Service"
                      />
                    </div>
                    <div className="services-description">
                      <h1>FLAT UI-Interface</h1>
                      <p>
                        Datta Able is first ever admin dashboard template which
                        release in Bootstrap 4 framework. Intuitive feature rich
                        design concept and color combination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-features" id="features">
        <div className="container">
          <div className="flex-split">
            <div className="f-left wow fadeInUp" data-wow-delay="0s">
              <div className="left-content">
                <img
                  className="img-fluid"
                  src="assets/images/feature_1.png"
                  alt=""
                />
              </div>
            </div>
            <div className="f-right wow fadeInUp" data-wow-delay="0.2s">
              <div className="right-content">
                <h2>High performance and flexible code</h2>
                <p>
                  Datta Able is full flexible solution for your entire project
                  development. You can easily maintain all of its
                  module/components.
                </p>
                <ul>
                  <li>
                    <i className="ion-android-checkbox-outline"></i>Neat n clean
                    code structure.
                  </li>
                  <li>
                    <i className="ion-android-checkbox-outline"></i>Flexible
                    module structure
                  </li>
                  <li>
                    <i className="ion-android-checkbox-outline"></i>Copy / Paste
                    and Ready to use
                  </li>
                </ul>
                <button className="btn btn-primary btn-action btn-fill">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="flex-split">
            <div className="f-right">
              <div className="right-content wow fadeInUp" data-wow-delay="0.2s">
                <h2>Included Software Dependencies</h2>
                <p>
                  Bower - Grunt - Sass Dependencies for easy project flow
                  management.
                </p>
                <ul>
                  <li>
                    <i className="ion-android-checkbox-outline"></i>Grunt - No
                    need to update plugins manually
                  </li>
                  <li>
                    <i className="ion-android-checkbox-outline"></i>Grunt - Less
                    work you have to performance
                  </li>
                  <li>
                    <i className="ion-android-checkbox-outline"></i>Sass - Most
                    Powerful CSS extension language
                  </li>
                </ul>
                <button className="btn btn-primary btn-action btn-fill">
                  Learn More
                </button>
              </div>
            </div>
            <div className="f-left">
              <div className="left-content wow fadeInUp" data-wow-delay="0.3s">
                <img
                  className="img-fluid"
                  src="assets/images/feature_2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial-section" id="reviews">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <div className="testimonials owl-carousel owl-theme">
                <div className="testimonial-single">
                  <img
                    className="img-circle"
                    src="assets/images/testimonial2.jpg"
                    alt="Client Testimonoal"
                  />
                  <div
                    className="testimonial-text wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <p>
                      Totally flexible admin template. Easy to use and easy to
                      manage all the elements in entire theme.{" "}
                      <br className="hidden-xs" /> Great support team behind
                      this product. Low turnaround time with exact support which
                      i needed.
                    </p>
                    <h3>Code Quality</h3>
                    <h3> - amit1134 [Buyer - NZ]</h3>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                  </div>
                </div>
                <div className="testimonial-single">
                  <img
                    className="img-circle"
                    src="assets/images/testimonial1.jpg"
                    alt="Client Testimonoal"
                  />
                  <div className="testimonial-text">
                    <p>
                      The main reason for the Rating for Able pro admin template
                      is that its is awesome template with tons of ready to use
                      features.
                      <br className="hidden-xs" /> - Top quality - Regular
                      updates - PHP version - Clean n Neat code - Saves lots of
                      developing time
                    </p>
                    <h3>Flexibility</h3>
                    <h3>- vishalmg [Buyer -India]</h3>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-ios-star-half"></i>
                  </div>
                </div>
                <div className="testimonial-single">
                  <img
                    className="img-circle"
                    src="assets/images/testimonial3.jpg"
                    alt="Client Testimonoal"
                  />
                  <div className="testimonial-text">
                    <p>
                      5 stars are for the excellent support, that is brilliant!
                      The design is very cool and the quality of code is
                      excellent. <br className="hidden-xs" />
                      Compliments!
                    </p>
                    <h3>Code Quality</h3>
                    <h3>- ab69aho [Buyer -Italy]</h3>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-ios-star-half"></i>
                  </div>
                </div>
                <div className="testimonial-single">
                  <img
                    className="img-circle"
                    src="assets/images/testimonial2.jpg"
                    alt="Client Testimonoal"
                  />
                  <div className="testimonial-text">
                    <p>
                      The product is high end and high-end specialized
                      assistance in solving problems.{" "}
                      <br className="hidden-xs" />I would highly recommend.
                    </p>
                    <h3>Customer Support</h3>
                    <h3>- donpavulon [Buyer -US]</h3>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                    <i className="ion ion-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeSponsors sponsors={sponsors}></HomeSponsors>
      <NumbersHomeSummary
        totalEvents={totalEvents}
        totalMembers={totalMembers}
        totalSlackMembers={totalSlackMembers}
        totalSpeakers={totalSpeakers}
      ></NumbersHomeSummary>
      <div className="features-section">
        <div className="f-left">
          <div className="left-content wow fadeInLeft" data-wow-delay="0s">
            <h2 className="wow fadeInLeft" data-wow-delay="0.1s">
              We are available for custom work development
            </h2>
            <p className="wow fadeInLeft" data-wow-delay="0.2s">
              We at Datta Able available for custom work development with High
              end specialized developer.
            </p>
            <button
              className="btn btn-primary btn-action btn-fill wow fadeInLeft"
              data-wow-delay="0.2s"
            >
              Click to send query
            </button>
          </div>
        </div>
        <div className="f-right"></div>
      </div>
      <div className="pricing-section no-color text-center" id="pricing">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 ">
              <div className="pricing-intro">
                <h1 className="wow fadeInUp" data-wow-delay="0s">
                  Pricing Table
                </h1>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Loream ipsum dummy text loream ipsum dummy text loream ipsum
                  dummy text <br className="hidden-xs" /> loream ipsum dummy
                  text. Get the right plan that suits you.
                </p>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="table-left wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="icon">
                      <img src="assets/logos/cart2.png" alt="Icon" />
                    </div>
                    <div className="pricing-details">
                      <h2>Beginner Plan</h2>
                      <span>$5.90</span>
                      <p>
                        Pay little enjoy the product{" "}
                        <br className="hidden-xs" /> for life time.
                      </p>
                      <ul>
                        <li>First basic feature </li>
                        <li>Second feature goes here</li>
                        <li>Any other third feature</li>
                        <li>And the last one goes here</li>
                      </ul>
                      <button className="btn btn-primary btn-action btn-fill">
                        Get Plan
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <div
                    className="table-right wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <div className="icon">
                      <img src="assets/logos/cart1.png" alt="Icon" />
                    </div>
                    <div className="pricing-details">
                      <h2>Premium Plan</h2>
                      <span>$19.99</span>
                      <p>
                        Pay only for what you use. Flexible{" "}
                        <br className="hidden-xs" /> payment options.
                      </p>
                      <ul>
                        <li>First premium feature </li>
                        <li>Second premium one goes here</li>
                        <li>Third premium feature here</li>
                        <li>Final premium feature</li>
                      </ul>
                      <button className="btn btn-primary btn-action btn-fill">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="client-section">
        <div className="container text-center">
          <div className="clients owl-carousel owl-theme">
            <div className="single">
              <img src="assets/logos/logo1.png" alt="" />
            </div>
            <div className="single">
              <img src="assets/logos/logo2.png" alt="" />
            </div>
            <div className="single">
              <img src="assets/logos/logo3.png" alt="" />
            </div>
            <div className="single">
              <img src="assets/logos/logo4.png" alt="" />
            </div>
            <div className="single">
              <img src="assets/logos/logo6.png" alt="" />
            </div>
            <div className="single">
              <img src="assets/logos/logo7.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="cta-sub text-center no-color">
        <div className="container">
          <h1 className="wow fadeInUp" data-wow-delay="0s">
            New product notification subscription
          </h1>
          <p className="wow fadeInUp" data-wow-delay="0.2s">
            We sent you daily mail about product updates / releases / version
            change logs
            <br className="hidden-xs" />
            Please write accurate email address below.
          </p>
          <div className="form wow fadeInUp" data-wow-delay="0.3s">
            {/* <form className="subscribe-form wow zoomIn" action="assets/php/subscribe.php" method="post" accept-charset="UTF-8" enctype="application/x-www-form-urlencoded" autocomplete="off" novalidate>
                            <input className="mail" type="email" name="email" placeholder="Email address" autocomplete="off"><input className="submit-button" type="submit" value="Subscribe">
                        </form> */}
            <div className="success-message"></div>
            <div className="error-message"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
