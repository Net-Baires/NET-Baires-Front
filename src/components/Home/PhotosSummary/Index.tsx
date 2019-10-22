import React from "react";

type PhotosSummaryProps = {};
const PhotosSummary: React.SFC<PhotosSummaryProps> = () => {
  return (
    <>
      <section>
        <div
          id="lgx-photo-gallery"
          className="lgx-gallery-popup lgx-photo-gallery-normal lgx-photo-gallery-black"
        >
          <div className="lgx-inner">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="lgx-heading lgx-heading-white">
                    <h2 className="heading">Fotos</h2>
                    <h3 className="subheading">
                      Algunas de las fotos de los ultimos eventos realizados por
                      la comunidad.
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="lgx-gallery-area">
                    <div className="lgx-gallery-single">
                      <figure>
                        <img
                          title="Memories One"
                          src="http://placehold.it/1000x732"
                          alt="Memories one"
                        />
                        <figcaption className="lgx-figcaption">
                          <div className="lgx-hover-link">
                            <div className="lgx-vertical">
                              <a
                                title="Memories One"
                                href="http://placehold.it/1000x732"
                              >
                                <i
                                  className="fa fa-chain-broken"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="lgx-gallery-single">
                      <figure>
                        <img
                          src="http://placehold.it/1000x732"
                          alt="Memories Two"
                          title="Memories Two"
                        />
                        <figcaption className="lgx-figcaption">
                          <div className="lgx-hover-link">
                            <div className="lgx-vertical">
                              <a
                                title="Memories Two"
                                href="http://placehold.it/1000x732"
                              >
                                <i
                                  className="fa fa-chain-broken"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="lgx-gallery-single">
                      <figure>
                        <img
                          src="http://placehold.it/1000x732"
                          alt="Memories Three"
                          title="Memories Three"
                        />
                        <figcaption className="lgx-figcaption">
                          <div className="lgx-hover-link">
                            <div className="lgx-vertical">
                              <a
                                title="Memories Three"
                                href="http://placehold.it/1000x732"
                              >
                                <i
                                  className="fa fa-chain-broken"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="lgx-gallery-single">
                      <figure>
                        <img
                          src="http://placehold.it/1000x732"
                          alt="Memories Four"
                          title="Memories Four"
                        />
                        <figcaption className="lgx-figcaption">
                          <div className="lgx-hover-link">
                            <div className="lgx-vertical">
                              <a
                                title="Memories Four"
                                href="http://placehold.it/1000x732"
                              >
                                <i
                                  className="fa fa-chain-broken"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="lgx-gallery-single">
                      <figure>
                        <img
                          src="http://placehold.it/1000x732"
                          alt="Memories Five"
                          title="Memories Five"
                        />
                        <figcaption className="lgx-figcaption">
                          <div className="lgx-hover-link">
                            <div className="lgx-vertical">
                              <a
                                title="Memories Five"
                                href="http://placehold.it/1000x732"
                              >
                                <i
                                  className="fa fa-chain-broken"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="lgx-gallery-single">
                      <figure>
                        <img
                          src="http://placehold.it/1000x732"
                          alt="Memories Six"
                          title="Memories Six"
                        />
                        <figcaption className="lgx-figcaption">
                          <div className="lgx-hover-link">
                            <div className="lgx-vertical">
                              <a
                                title="Memories Six"
                                href="http://placehold.it/1000x732"
                              >
                                <i
                                  className="fa fa-chain-broken"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotosSummary;
