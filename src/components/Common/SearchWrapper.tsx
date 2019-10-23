import React from "react";
export type SearchWrapperProps = {
  title: string;
};
export const SearchWrapper: React.SFC<SearchWrapperProps> = ({
  children,
  title
}) => {
  return (
    <div className="card border-primary mb-3">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
};
