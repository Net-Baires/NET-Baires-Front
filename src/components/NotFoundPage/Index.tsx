import React from "react";
// import '../../../assets/css/style-not-found.css';
type NotFoundPageProps = {};
const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <div id="container" className="container">
      <ul id="scene" className="scene">
        <li className="layer" data-depth="1.00"><img src="../../../assets/images/404-01.png" /></li>
        <li className="layer" data-depth="0.60"><img src="../../../assets/images/shadows-01.png" /></li>
        <li className="layer" data-depth="0.20"><img src="../../../assets/images/monster-01.png" /></li>
        <li className="layer" data-depth="0.40"><img src="../../../assets/images/text-01.png" /></li>
        <li className="layer" data-depth="0.10"><img src="../../../assets/images/monster-eyes-01.png" /></li>
      </ul>
      <h1>Our Site is Underconstruction - 10 days to go</h1>
      <input type="text" className="form-control" /><a href="#!" className="btn search">Search</a>
      <span>or</span>
      <a href="#!" className="btn">Back to home</a>
    </div>
  );
};

export default NotFoundPage;
