import React from "react";
import { NavLink } from "react-router-dom";
type FooterProps = {};
const Footer: React.SFC<FooterProps> = () => {
  return (
    <footer>
      <div id="lgx-footer" className="lgx-footer">
        <div className="lgx-inner-footer">
          {/* <div className="lgx-subscriber-area ">
            <div className="container">
              <div className="lgx-subscriber-inner">
                <h3 className="subscriber-title">Join Newsletter</h3>
                <form className="lgx-subscribe-form">
                  <div className="form-group form-group-email">
                    <input
                      type="email"
                      id="subscribe"
                      placeholder="Enter your email Address  ..."
                      className="form-control lgx-input-form form-control"
                    />
                  </div>
                  <div className="form-group form-group-submit">
                    <button
                      type="submit"
                      name="lgx-submit"
                      id="lgx-submit"
                      className="lgx-btn lgx-submit"
                    >
                      <span>Subscribe</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
          <div className="container">
            <div className="lgx-footer-area">
              <div className="lgx-footer-single">
                <NavLink className="logo" activeClassName="active" to="/">
                  <img src="/assets/img/Blanco.png" alt="Logo"></img>
                </NavLink>
              </div>
              {/* <div className="lgx-footer-single">
                <h3 className="footer-title">Venue Location </h3>
                <h4 className="date">18 - 21 December, 2019</h4>
                <address>
                  85 Golden Street, Darlinghurst <br />
                  ERP 2019, United States
                </address>
                <a
                  id="myModalLabel2"
                  data-toggle="modal"
                  data-target="#lgx-modal-map"
                  className="map-link"
                  href="#"
                >
                  <i className="fa fa-map-marker" aria-hidden="true"></i> View
                  Map location
                </a>
              </div> */}
              <div className="lgx-footer-single">
                <h3 className="footer-title">Redes Sociales</h3>
                <p className="text">
                  Seguinos en nuestros redes
                  <br /> para enterarte de todo
                </p>
                <ul className="list-inline lgx-social-footer">
                  <li>
                    <a href="https://www.facebook.com/groups/1800251183544893/">
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Net-Baires">
                      <i className="fab fa-github" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/NetBaires">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/netbaires">
                      <i className="fab fa-instagram aria-hidden"></i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className="lgx-footer-single">
                <h2 className="footer-title">Instagram Feed</h2>
                <div id="instafeed"></div>
              </div> */}
            </div>
            <div id="lgx-modal-map" className="modal fade lgx-modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <div
                      className="lgxmapcanvas map-canvas-default"
                      id="map_canvas"
                    >
                      {" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lgx-footer-bottom">
              <div className="lgx-copyright">
                <p>
                  {" "}
                  <span>©</span> 2018 Powered by{" "}
                  <a href="https://www.meetup.com/es-ES/Net-Baires/">
                    Net-Baires
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
