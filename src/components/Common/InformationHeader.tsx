import React from "react";

type NotFoundProps = {
  text: string;
};

export const InformationHeader: React.SFC<NotFoundProps> = ({ text }) => {
  return (
    <p className="wow fadeInUp" data-wow-delay="0.2s">
      {text}
    </p>
  );
};
