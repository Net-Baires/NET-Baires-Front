import React, { Fragment, useEffect, useState } from "react";
import useCollapse from 'react-collapsed';

type CardHeaderProps = {
  cardTitle?: string;
  colSize?: number;
};

export const CardHeaderCollapsableWrapper: React.SFC<CardHeaderProps> = ({
  colSize,
  cardTitle,
  children
}) => {
  const [isOpen, setOpen] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });
  if (colSize == null) colSize = 12;
  return (
    <Fragment>
      <div className="row">
        <div className={`col-sm-${colSize}`}>
          <div className="card">
            <div className="card-header">
              <h5>{cardTitle}</h5>
              <div className="card-header-right">
                <div className="btn-group card-option">

                  <button
                    type="button"
                    onClick={() => setOpen(oldOpen => !oldOpen)}
                    className="btn btn-icon"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {!isOpen ? <i className="fas fa-expand"></i> : <i className="fas fa-compress-arrows-alt"></i>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section {...getCollapseProps()} className="row" >{children}</section>
    </Fragment >

  );
};
