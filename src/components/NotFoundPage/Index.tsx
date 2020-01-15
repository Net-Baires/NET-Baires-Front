import React from "react";
// import '../../../assets/css/style-not-found.css';
type NotFoundPageProps = {};
const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <div className="services-section text-center" id="nuestrosOrganizadores">
      <div className="container">
        <div className="row  justify-content-md-center">
          <div className="col-md-12 text-center">
            <div className="services">
              <div className="row not-found-container">
                <div style={{ textAlign: "center", width: "100%" }}>
                  <img className="not-found-img" src="/assets/images/404.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
