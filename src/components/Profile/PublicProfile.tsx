import React, { useState } from "react";

type PublicProfileProps = {
  urlToShare?: string;
};
export const PublicProfile: React.SFC<PublicProfileProps> = () => {
  return (
    <article>
      <header>
        <figure>
          <img src="http://placehold.it/800x860" alt="New" />
        </figure>
        <div className="text-area">
          <div className="speaker-info">
            <h1 className="title">
              <a href="speaker.html">Jonathon Doe</a>
            </h1>
            <h4 className="subtitle">Ceo of LogicHunt</h4>
          </div>
          <ul className="list-inline lgx-social">
            <li>
              <a href="#">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-facebook-f" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <section>
        <p>
          Cras porttitor convallis ligula, at elementum erat mattis quis. In
          vitae vulputate tellus, sed laoreet est. Nam eget dolor non eros
          rutrum facilisis ut vel sapien. Aenean sed vehicula massa. Morbi
          imperdiet egestas ullamcorperet. Expo neque, congue nec nibh in,
          pellentesque fringilla risus. Suspendisse hendrerit et sapien ut
          pretium. Aenean nulla ipsum, facilisis eu porta non, rutrum sit amet
          nibh. Quisque id diam feugiat, pharetra arcu eget, bibendum tortor.
          Vivamus aliquam lacus id leo tristique sagittis. Pellentesque mattis
          diam metus, id commodo ex placerat vitae. Curabitur lobortis justo
          ante, in varius leo congue id. Etiam a libero elementum, posuere est
          at, sodales justo. Proin nec venenatis metus. Cras porttitor convallis
          ligula, at elementum erat mattis quis. In vitae vulputate tellus, sed
          laoreet est. Nam eget dolor non eros rutrum facilisis ut vel sapien.
          Aenean sed vehicula massa. Morbi imperdiet egestas ullamcorperet. Expo
          neque, congue nec nibh in, pellentesque fringilla risus. Suspendisse
          hendrerit et sapien ut pretium. Aenean nulla ipsum, facilisis eu porta
          non, rutrum sit amet nibh. Quisque id diam feugiat, pharetra arcu
          eget, bibendum tortor. Vivamus aliquam lacus id leo tristique
          sagittis. Pellentesque mattis diam metus, id commodo ex placerat
          vitae.
        </p>
        <blockquote>
          <p>
            Suspendisse hendrerit et sapien ut pretium. Aenean nulla ipsum,
            facilisis eu porta non, rutrum sit amet nibh. Quisque id diam
            feugiat, pharetra arcu eget, bibendum tortor.{" "}
          </p>
          <footer>
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
        <blockquote>
          Suspendisse hendrerit et sapien ut pretium. Aenean nulla ipsum,
          facilisis eu porta non, rutrum sit amet nibh. Quisque id diam feugiat,
          pharetra arcu eget, bibendum tortor.
        </blockquote>
      </section>
      <footer>
        <div className="row">
          <div className="col-xs-12">
            <h4 className="title">Share</h4>
            <div className="lgx-share">
              <ul className="list-inline lgx-social">
                <li>
                  <a href="#">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-facebook-f" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};
