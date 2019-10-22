import React, { useState, useEffect } from "react";
import { Event } from "../../../services/models/Events/Event";

type LastEventsProps = {};
const LastEvents: React.SFC<LastEventsProps> = () => {
  return (
    <>
      <section>
        <div id="lgx-news" className="lgx-news">
          <div className="lgx-inner">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="lgx-heading">
                    <h2 className="heading">Ultimos eventos</h2>
                    {/* <h3 className="subheading"></h3> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="lgx-single-news">
                    <figure>
                      <a href="news-single.html">
                        <img src="http://placehold.it/1144x690" alt=""></img>
                      </a>
                    </figure>
                    <div className="single-news-info">
                      <div className="meta-wrapper">
                        <span>April 25, 2018</span>
                        <span>
                          by <a href="#">Riazsagar</a>
                        </span>
                        <span>
                          <a href="#">Design</a>
                        </span>
                      </div>
                      <h3 className="title">
                        <a href="news-single.html">
                          Brooklyn Beta was the most important conferen best
                          tristique
                        </a>
                      </h3>
                      <a className="lgx-btn lgx-btn-white lgx-btn-sm" href="#">
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="lgx-single-news">
                    <figure>
                      <a href="news-single.html">
                        <img src="http://placehold.it/1144x690" alt="" />
                      </a>
                    </figure>
                    <div className="single-news-info">
                      <div className="meta-wrapper">
                        <span>April 25, 2018</span>
                        <span>
                          by <a href="#">Riazsagar</a>
                        </span>
                        <span>
                          <a href="#">Design</a>
                        </span>
                      </div>
                      <h3 className="title">
                        <a href="news-single.html">
                          Brooklyn Beta was the most important conferen best
                          tristique
                        </a>
                      </h3>
                      <a className="lgx-btn lgx-btn-white lgx-btn-sm" href="#">
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="lgx-single-news">
                    <figure>
                      <a href="news-single.html">
                        <img src="http://placehold.it/1144x690" alt="" />
                      </a>
                    </figure>
                    <div className="single-news-info">
                      <div className="meta-wrapper">
                        <span>April 25, 2018</span>
                        <span>
                          by <a href="#">Riazsagar</a>
                        </span>
                        <span>
                          <a href="#">Design</a>
                        </span>
                      </div>
                      <h3 className="title">
                        <a href="news-single.html">
                          Brooklyn Beta was the most important conferen best
                          tristique
                        </a>
                      </h3>
                      <a className="lgx-btn lgx-btn-white lgx-btn-sm" href="#">
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-btn-area">
                <a className="lgx-btn" href="news.html">
                  View More Blogs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LastEvents;
