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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CardWrapper } from "../Common/CardWrapper";

type ShareProfileProps = {
  urlToShare: string;
  title: string;
  description?: string;
};
export const ShareProfile: React.SFC<ShareProfileProps> = ({
  urlToShare,
  title,
  description,
}) => {
  return (
    <CardWrapper colSize={4} cardTitle="Compartí tu perfil en tus redes">
      <Tabs>
        <TabList>
          <Tab>
            <i className="fab fa-twitter-square"></i>
          </Tab>
          <Tab>
            <i className="fab fa-linkedin"></i>
          </Tab>
          <Tab>
            <i className="fab fa-telegram"></i>
          </Tab>
          <Tab>
            <i className="fab fa-whatsapp"></i>
          </Tab>
          <Tab>
            <i className="far fa-envelope"></i>
          </Tab>
          <Tab>
            <i className="fab fa-facebook"></i>
          </Tab>
        </TabList>

        <TabPanel>
          <h3>{title}</h3>
          <p>{description}</p>
          <TwitterShareButton
            disabled={false}
            url={urlToShare}
            hashtags={["NETBaires"]}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </TabPanel>
        <TabPanel>
          <h3>{title}</h3>
          <p>{description}</p>
          <LinkedinShareButton url={urlToShare}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </TabPanel>
        <TabPanel>
          <h3>{title}</h3>
          <p>{description}</p>
          <TelegramShareButton url={urlToShare}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </TabPanel>
        <TabPanel>
          <h3>{title}</h3>
          <p>{description}</p>
          <WhatsappShareButton url={urlToShare}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </TabPanel>
        <TabPanel>
          <h3>{title}</h3>
          <p>{description}</p>
          <EmailShareButton url={urlToShare}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </TabPanel>
        <TabPanel>
          <h3>{title}</h3>
          <p>{description}</p>
          <FacebookShareButton url={urlToShare}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </TabPanel>
      </Tabs>
    </CardWrapper>
  );
};
