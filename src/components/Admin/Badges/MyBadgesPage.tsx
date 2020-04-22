import React from "react";
import { MyBadgesList } from "../../Badges/MyBadgesList";
import { CardHeaderCollapsableWrapper } from "../../Common/CardHeaderCollapsableWrapper";
import { InformationHeader } from "../../Common/InformationHeader";

export const MyBadgesPage: React.SFC = () => {
  return (
    <>
      <InformationHeader text="Estos son los badges que te fueron asignados"></InformationHeader>
      <CardHeaderCollapsableWrapper collapsed={false} cardTitle="Mis Badges">
        <MyBadgesList></MyBadgesList>
      </CardHeaderCollapsableWrapper>
    </>
  );
};
