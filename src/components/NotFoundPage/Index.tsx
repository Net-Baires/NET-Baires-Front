import React from "react";
import { NotFound } from "../Common/NotFoun";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";

type NotFoundPageProps = {};
const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <PageFullWidthWrapper>
      <NotFound
        title="No encontrado"
        message="Al contenido que esta intentando acceder no se encuentra disponible o no tiene accessos para ello. Si considera que es un error de nuestro sistema por favor no dude en contactarse con alguno de los organizadores."
      ></NotFound>
    </PageFullWidthWrapper>
  );
};

export default NotFoundPage;
