import React, { useState, useEffect } from "react";
import { getNextEvent } from "../../../services/eventsServices";
import { Event } from "../../../services/models/Events/Event";

type NextEventProps = {};
const NextEvent: React.SFC<NextEventProps> = () => {
  let nextEventDefault: Event = {
    id: "",
    title: "",
    address: "",
    description: "",
    date: "",
    picture: "",
  };
  const [nextEvent, setNextEvent] = useState(nextEventDefault);
  useEffect(() => {
    getNextEvent().then(x => setNextEvent(x));
  }, []);
  return (
    <>
      <section>
        <div id="lgx-about" className="lgx-about lgx-about2">
          <div className="lgx-inner">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-5 col-sm-12 col-md-7">
                  <div className="lgx-about-content-area">
                    <div className="lgx-heading">
                      <h2 className="heading">{nextEvent.title}</h2>
                      <h3 className="subheading">{nextEvent.date}</h3>
                    </div>
                    <div className="lgx-about-content">
                      <p className="text">{nextEvent.description}</p>
                      <div className="section-btn-area">
                        <a className="lgx-btn" href="about.html">
                          Mas Información
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-offset-7 col-sm-12 col-md-5">
                 <img src={nextEvent.picture}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NextEvent;
