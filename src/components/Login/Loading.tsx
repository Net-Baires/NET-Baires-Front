import React, { useEffect } from "react";
import { loadStyles } from "../../services/helpers/scriptshelpers";

const Loading: React.SFC = () => {
  useEffect(() => {
    loadStyles("assets/fonts/fontawesome/css/fontawesome-all.min.css");
    loadStyles("assets/css/style-login.css");
  });
  return (
    <>
      <div className="auth-wrapper offline">
        <div className="text-center">
          <h1 className="mb-4">Procesando</h1>
          <h5 className="text-muted mb-4">
            Aguarde mientras procesamos su solicitud
          </h5>
        </div>
      </div>
    </>
  );
};

export default Loading;
