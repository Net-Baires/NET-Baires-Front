import React from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
type AssignBadgeProps = {
  loading: () => void;
  ready: () => void;
  link: string;
};
const ShareInSocialNetworkComponent: React.SFC<AssignBadgeProps> = ({ link }) => {
  var currentLink = `${window.location.origin}${link}`;
  return (
    <>
      <TwitterShareButton hashtags={["NetBaires"]} url={currentLink}>
        <button type="button" className="btn shadow-1 btn-primary">  Compartir en Twitter</button>
      </TwitterShareButton>
      <FacebookShareButton url={currentLink}>
        <button type="button" className="btn shadow-1 btn-primary">  Compartir en Facebook</button>
      </FacebookShareButton>
      <LinkedinShareButton url={currentLink}>
        <button type="button" className="btn shadow-1 btn-primary">  Compartir en Linkedin</button>
      </LinkedinShareButton>
    </>
  )
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const ShareInSocialNetwork = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareInSocialNetworkComponent);

