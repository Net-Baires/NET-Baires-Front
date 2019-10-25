import React from "react";
import { PageFullWidthWrapper } from "./PageFullWidthWrapper";

type NotFoundProps = {
  title: string;
  message: string;
};

export const NotFound: React.SFC<NotFoundProps> = ({ title, message }) => {
  return (
    <PageFullWidthWrapper>
      <article className="not-found-component">
        <header>
          <h1>{title}</h1>
        </header>
        <section>
          <div className="row">
            <div className="col-sm-12">
              <h2>204 Not Content</h2>
            </div>
            <div className="col-sm-12">
              <p>{message}</p>
            </div>
            <div className="col-sm-12">
              <a href="https://www.meetup.com/es-ES/Net-Baires" target="blank">
                <button className="button-style">Nuestros Eventos</button>
              </a>
            </div>
          </div>
          <div className="row">
            <h1></h1>
          </div>
        </section>
      </article>
    </PageFullWidthWrapper>
  );
};
