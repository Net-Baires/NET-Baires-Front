import React, { useEffect, useState, MouseEvent } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { inviteMeSlack } from "../../services/slackServices";

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
      <article>
        <header>
          <img
            className="img-slack"
            src="https://cdn-images-1.medium.com/max/1600/1*LKzOm8aR2dMYUu8ZNvITFg.png"
          />
        </header>
        <header>
          <figure></figure>
          <div className="text-area">
            <div className="speaker-info">
              <h1 className="title"></h1>
              <h4 className="subtitle"></h4>
            </div>
          </div>
        </header>
        <section>
          <p>
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
                  className="form-control lgx-input-form form-control"
                />
                {error != "" && (
                  <div className="form-error alert alert-danger">{error}</div>
                )}
                {isSuccess && (
                  <div className="form-error alert alert-success">
                    La invitación fue enviada a <b>{email}</b>, revise su correo
                    y confirme la invitación.
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
                  className="lgx-btn lgx-submit"
                >
                  <span>Invitar</span>
                </button>
              </div>
            </form>
          </p>
        </section>
        {/* <section>
          <p> </p>
        </section> */}
      </article>
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
