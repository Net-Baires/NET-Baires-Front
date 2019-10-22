import React from "react";
import { RouteComponentProps } from "react-router-dom";

type OrganizersProps = {
  name: string;
};

type OrganizersPropsAndRouter = OrganizersProps;
const Organizers: React.SFC<
  RouteComponentProps<OrganizersPropsAndRouter>
> = props => {
  return (
    <>
      <h1>Organizers</h1>
    </>
  );
};
export default Organizers;
