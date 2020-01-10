import React, { useState, useContext } from "react";
import { EventDetail } from "../../services/models/Events/Event";
import { UserContext } from '../../contexts/UserContext';
import { AdminControlPanel } from '../Admin/AdminControlPanel/AdminControlPanel';
import { MemberControlPanel } from './MemberControlPanel';

export const ControlPanel: React.SFC = () => {
  const [] = useState(new Array<EventDetail>());
  const { hasRol } = useContext(UserContext);
  return (
    <>
      {hasRol("Member") ?
        <MemberControlPanel></MemberControlPanel> :
        <AdminControlPanel></AdminControlPanel>
      }
    </>
  );
};