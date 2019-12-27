import React from "react";

type CardWrapperProps = {
  cardTitle?: string;
  colSize?: number;
};

export const CardWrapper: React.SFC<CardWrapperProps> = ({
  children,
  colSize,
  cardTitle
}) => {
  if (colSize == null) colSize = 12;
  return (
    <>
      <div className={`col-sm-${colSize}`}>
        <div className="card">
          <div className="card-header">
            <h5>{cardTitle}</h5>
            <div className="card-header-right">
              <div className="btn-group card-option">
                <button
                  type="button"
                  className="btn dropdown-toggle btn-icon"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="feather icon-more-horizontal"></i>
                </button>
                <ul className="list-unstyled card-option dropdown-menu dropdown-menu-right">
                  <li className="dropdown-item full-card">
                    <a href="#!">
                      <span>
                        <i className="feather icon-maximize"></i> maximize
                      </span>
                      <span style={{ display: "none" }}>
                        <i className="feather icon-minimize"></i> Restore
                      </span>
                    </a>
                  </li>
                  <li className="dropdown-item minimize-card">
                    <a href="#!">
                      <span>
                        <i className="feather icon-minus"></i> collapse
                      </span>
                      <span style={{ display: "none" }}>
                        <i className="feather icon-plus"></i> expand
                      </span>
                    </a>
                  </li>
                  <li className="dropdown-item reload-card">
                    <a href="#!">
                      <i className="feather icon-refresh-cw"></i> reload
                    </a>
                  </li>
                  <li className="dropdown-item close-card">
                    <a href="#!">
                      <i className="feather icon-trash"></i> remove
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-block">{children}</div>
        </div>
      </div>
    </>
  );
};
