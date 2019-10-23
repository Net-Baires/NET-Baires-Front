import React from "react";
import { PageWrapper } from "./PageWrapper";
type PageCenterWrapperProps = {
  classWrapper?: string;
};
export const PageCenterWrapper: React.SFC<PageCenterWrapperProps> = ({
  children,
  classWrapper
}) => {
  if (classWrapper == null) classWrapper = "lgx-page-wrapper";

  return (
    <PageWrapper
      classWrapper={classWrapper}
      classContainer="col-sm-12 col-md-6 col-md-offset-3"
    >
      {children}
    </PageWrapper>
  );
};
