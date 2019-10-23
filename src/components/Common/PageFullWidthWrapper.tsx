import React from "react";
import { PageWrapper } from "./PageWrapper";

type PageFullWidthWrapperProps = {
  classWrapper?: string;
};

export const PageFullWidthWrapper: React.SFC<PageFullWidthWrapperProps> = ({
  children,
  classWrapper
}) => {
  if (classWrapper == null) classWrapper = "lgx-page-wrapper";
  return (
    <PageWrapper classWrapper={classWrapper} classContainer="col-xs-12">
      {children}
    </PageWrapper>
  );
};
