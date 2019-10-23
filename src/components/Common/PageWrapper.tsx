import React from "react";
export type PageWrapperProps = {
  classWrapper: string;
  classContainer: string;
};

export const PageWrapper: React.SFC<PageWrapperProps> = ({
  children,
  classWrapper,
  classContainer
}) => {
  return (
    <main>
      <div className={classWrapper}>
        <section>
          <div className="container">
            <div className="row">
              <div className={classContainer}>{children}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
