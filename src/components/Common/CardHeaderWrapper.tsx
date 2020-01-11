import React from "react";

type CardHeaderProps = {
  cardTitle?: string;
  colSize?: number;
};

export const CardHeaderWrapper: React.SFC<CardHeaderProps> = ({
  colSize,
  cardTitle,
}) => {
  if (colSize == null) colSize = 12;
  return (
    <div className={`col-sm-${colSize}`}>
      <div className="card">
        <div className="card-header">
          <h5>{cardTitle}</h5>
        </div>
      </div>
    </div>
  );
};
