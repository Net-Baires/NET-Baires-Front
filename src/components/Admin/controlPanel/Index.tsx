import React from "react";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";

type ControlPanelProps = {};
const ControlPanel: React.SFC<ControlPanelProps> = () => {
  return (
    <PageCenterWrapper>
      <article>
        <header>
          <h1 className="title">Panel de Control</h1>
        </header>
        <header>
          <figure></figure>
          <div className="text-area">
            <div className="speaker-info">
              <h1 className="title"></h1>
              <h4 className="subtitle"></h4>
            </div>
          </div>
        </header>
        <section>
          <p></p>
        </section>
        {/* <section>
          <p> </p>
        </section> */}
      </article>
    </PageCenterWrapper>
  );
};
export default ControlPanel;
