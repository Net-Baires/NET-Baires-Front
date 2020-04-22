import React from "react";

type NotFoundProps = {
  text: string;
};

export const InformationHeader: React.SFC<NotFoundProps> = ({ text }) => {
  return (
    <div className="col-sm-12">
      <div className="alert alert-primary" role="alert">
        <p> {text}</p>
      </div>
    </div>
  );
};
