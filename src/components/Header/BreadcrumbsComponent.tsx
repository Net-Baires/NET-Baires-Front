import React from "react";
import { useHistory, RouteComponentProps, Route } from "react-router";
import { Link } from "react-router-dom";
type BreadcrumbsProps = {};

const Breadcrumbs = () => (
  <Route
    path="*"
    render={props => {
      let parts = props.location.pathname.split("/");
      const place = parts[parts.length - 1];
      parts = parts.slice(1, parts.length - 1);
      return (
        <ul className="breadcrumb">
          {parts.map(crumb)}
          {place}
        </ul>
      );
    }}
  />
);

const crumb = (part: any, partIndex: any, parts: any) => {
  const path = ["", ...parts.slice(0, partIndex + 1)].join("/");
  return (
    <>
      <li>
        <Link key={path} to={path}>
          {part}
        </Link>
      </li>
      /
    </>
  );
};

export const BreadcrumbsComponent: React.SFC<
  RouteComponentProps<BreadcrumbsProps>
> = ({ match }) => {
  const history = useHistory();
  return (
    <>
      {history.location.pathname != "/" && (
        <section>
          <div className="lgx-banner lgx-banner-inner">
            <div className="lgx-page-inner">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="lgx-heading-area">
                      <div className="lgx-heading lgx-heading-white">
                        {/* <h2 className="heading">Jonathon Doe</h2> */}
                      </div>
                      <Breadcrumbs

                      ></Breadcrumbs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
