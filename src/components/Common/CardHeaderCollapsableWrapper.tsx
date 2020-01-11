import React, { Fragment, useState } from "react";
import useCollapse from 'react-collapsed';

type CardHeaderProps = {
  cardTitle?: string;
  colSize?: number;
  collapsed?: boolean;
};

export const CardHeaderCollapsableWrapper: React.SFC<CardHeaderProps> = ({
  colSize,
  cardTitle,
  children,
  collapsed
}) => {
  const [isOpen, setOpen] = useState(collapsed != null ? !collapsed : false);
  const { getCollapseProps } = useCollapse({ isOpen });
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
