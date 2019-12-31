import React, { useEffect, useState, MouseEvent } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { inviteMeSlack } from "../../services/slackServices";
import { PageCenterWrapper } from "../Common/PageCenterWrapper";

export const JoinSlackComponent: React.SFC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email == "") {
      setError("Ingrese un mail valido");
    } else {
      inviteMeSlack(email)
        .then(x => {
          setError("");
          setIsSuccess(true);
        })
        .catch(x => {
          setIsSuccess(false);
          setError(x);
        });
    }
  };
  return (
    <>
      <div className="services-section text-center" id="services">
        <div className="container">
          <div className="row  justify-content-md-center">
            <div className="col-md-8">
              <div className="services-content">
                <h1 className="wow fadeInUp" data-wow-delay="0s">
                  Sumate a nuestra comunidad de Slack
                </h1>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  En nuestros canales de slack podras encontrar a los mejores
                  profesionales dispuestos a ayudarte. Te pedimos que por favor
                  respetes las reglas. Saludos.
                </p>
              </div>
            </div>
            <div className="col-md-12 text-center">
              <div className="services">
                <div className="row">
                  <div
                    className="col-sm-2 wow fadeInUp"
                    data-wow-delay="0.2s"
                  ></div>
                  <div className="col-sm-8 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="services-icon">
                      <img
                        className="img-slack"
                        style={{ width: "200px" }}
                        src="https://cdn-images-1.medium.com/max/1600/1*LKzOm8aR2dMYUu8ZNvITFg.png"
                      />
                    </div>
                    <div className="services-description">
                      <form method="POST" className="lgx-subscribe-form">
                        <div className="form-group form-group-email">
                          <input
                            asp-for="Email"
                            type="email"
                            value={email}
                            onChange={x => {
                              setIsSuccess(false);
                              setError("");
                              setEmail(x.target.value);
                            }}
                            id="subscribe"
                            placeholder="Ingresa tu dirección de Email ..."
                            className="form-control"
                          />
                          {error != "" && (
                            <div className="form-error alert alert-danger">
                              {error}
                            </div>
                          )}
                          {isSuccess && (
                            <div className="form-error alert alert-success">
                              La invitación fue enviada a <b>{email}</b>, revise
                              su correo y confirme la invitación.
                            </div>
                          )}
                        </div>
                        <div className="form-group form-group-submit">
                          <button
                            asp-page-handler="Invite"
                            type="submit"
                            name="lgx-submit"
                            onClick={handleSubmit}
                            id="lgx-submit"
                            className="btn btn-success"
                          >
                            <span>Invitar</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-sm-2 wow fadeInUp"
                    data-wow-delay="0.2s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const JoinSlack = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinSlackComponent);
