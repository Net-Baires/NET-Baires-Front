import React from "react";

type NotFoundProps = {
  title: string;
};

export const TitleHeader: React.SFC<NotFoundProps> = ({ title }) => {
  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5>{title}</h5>
        </div>
      </div>
    </div>
  );
};
