import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
} from "mdbreact";

type ShareProfileProps = {
  urlToShare: string;
};
export const ShareProfile: React.SFC<ShareProfileProps> = ({ urlToShare }) => {
  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState("1");

  const toggleClassicTabs3 = (tab: any) => () => {
    if (activeItemClassicTabs3 !== tab) {
      setActiveItemClassicTabs3(tab);
    }
  };

  const setTab = (): boolean => {
    return true;
  };
  return (
    <>
      <MDBContainer>
        <MDBCard>
          <MDBCardHeader color="primary-color" tag="h3">
            Compartí tú perfil en las redes
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardText>
              <MDBContainer>
                <div className="classic-tabs">
                  <MDBNav
                    classicTabs
                    color="orange"
                    className="mt-5 nav nav-tabs"
                  >
                    <MDBNavItem className="nav-item">
                      <MDBNavLink
                        className="nav-link"
                        to="#"
                        active={setTab(1)}
                        onClick={toggleClassicTabs3("1")}
                      >
                        <i className="fab fa-twitter-square"></i>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem className="nav-item">
                      <MDBNavLink
                        className="nav-link"
                        to="#"
                        active={setTab(2)}
                        onClick={toggleClassicTabs3("2")}
                      >
                        <i className="fab fa-linkedin"></i>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem className="nav-item">
                      <MDBNavLink
                        className="nav-link"
                        to="#"
                        active={setTab(3)}
                        onClick={toggleClassicTabs3("3")}
                      >
                        <i className="fab fa-facebook"></i>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem className="nav-item">
                      <MDBNavLink
                        className="nav-link"
                        to="#"
                        active={setTab(4)}
                        onClick={toggleClassicTabs3("4")}
                      >
                        <i className="fab fa-telegram"></i>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem className="nav-item">
                      <MDBNavLink
                        className="nav-link"
                        to="#"
                        active={setTab(4)}
                        onClick={toggleClassicTabs3("5")}
                      >
                        <i className="fab fa-whatsapp"></i>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem className="nav-item">
                      <MDBNavLink
                        className="nav-link"
                        to="#"
                        active={setTab(4)}
                        onClick={toggleClassicTabs3("6")}
                      >
                        <i className="far fa-envelope"></i>
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                  <MDBTabContent
                    className="card mb-5"
                    activeItem={activeItemClassicTabs3}
                  >
                    <MDBTabPane className="tab-content container" tabId="1">
                      <TwitterShareButton
                        disabled={false}
                        url={urlToShare}
                        title={"Titulo"}
                        via="aaa"
                        hashtags={["aaaa"]}
                      >
                        <TwitterIcon size={32} round={true} />
                      </TwitterShareButton>
                    </MDBTabPane>
                    <MDBTabPane className="tab-content container" tabId="2">
                      <LinkedinShareButton url={urlToShare}>
                        <h1>Comparti tu perfil en Linkedín</h1>
                        <p>
                          Comparti tus Badges y toda la información de tu perfil
                          en las redes
                        </p>
                        <LinkedinIcon size={32} round={true} />
                      </LinkedinShareButton>
                    </MDBTabPane>
                    <MDBTabPane className="tab-content container" tabId="3">
                      <FacebookShareButton url={urlToShare}>
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                    </MDBTabPane>
                    <MDBTabPane className="tab-content container" tabId="4">
                      <TelegramShareButton url={urlToShare}>
                        <TelegramIcon size={32} round={true} />
                      </TelegramShareButton>
                    </MDBTabPane>
                    <MDBTabPane className="tab-content container" tabId="5">
                      <WhatsappShareButton url={urlToShare}>
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                    </MDBTabPane>
                    <MDBTabPane className="tab-content container" tabId="6">
                      <EmailShareButton
                        body="Queremos compartir nuestro perfil desde el mail. "
                        url={urlToShare}
                      >
                        <EmailIcon size={32} round={true} />
                      </EmailShareButton>
                    </MDBTabPane>
                  </MDBTabContent>
                </div>
              </MDBContainer>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <div className="social-network-shared"></div>
    </>
  );
};
