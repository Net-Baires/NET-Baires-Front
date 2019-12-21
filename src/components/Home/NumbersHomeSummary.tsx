import React from "react";
type NumbersHomeSummaryProps = {
  totalMembers: number;
  totalSlackMembers: number;
  totalSpeakers: number;
  totalEvents: number;
};
const NumbersHomeSummary: React.SFC<NumbersHomeSummaryProps> = ({
  ...props
}) => {
  return (
    <>
      <div className="counter-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-6 col-md-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <i className="ion-ios-people"></i>
                </div>
                <h3>
                  <span className="counter">{props.totalMembers}</span>+
                </h3>
                <div className="counter-text">
                  <h4>Miemebros</h4>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <i className="fab fa-slack"></i>
                </div>
                <h3>
                  <span className="counter">{props.totalSlackMembers}</span>+
                </h3>
                <div className="counter-text">
                  <h4>Usuarios en Slack</h4>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <i className="far fa-calendar-alt"></i>
                </div>
                <h3>
                  <span className="counter">{props.totalEvents}</span>+
                </h3>
                <div className="counter-text">
                  <h4>Eventos</h4>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <i className="fas fa-microphone"></i>
                </div>
                <h3>
                  <span className="counter">{props.totalSpeakers}</span>+
                </h3>
                <div className="counter-text">
                  <h4>Speakers</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default NumbersHomeSummary;
