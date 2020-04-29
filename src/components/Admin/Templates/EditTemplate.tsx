import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import { isEmpty } from "../../../services/objectsservices";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";

type EditTemplateProps = {
  name: string;
};
type EditTemplateParams = {
  loading: () => void;
  ready: () => void;
  id: number;
};
import { CardWrapper } from "../../Common/CardWrapper";
import { DialogQuestion } from "../../Common/DialogQuestion";
import { Template } from "../../../services/models/Template";
import { EditTemplateComponentHook } from "./components/EditTemplateComponentHook";
import { deleteTemplate } from "../../../services/templatesServices";
import {
  getTemplate,
  updateTemplate,
} from "../../../services/templatesServices";

type EditTemplatePropsAndRouter = EditTemplateParams & EditTemplateProps;
export const EditTemplateToExport: React.SFC<
  RouteComponentProps<EditTemplatePropsAndRouter> & EditTemplateParams
> = ({ loading, ready, ...props }) => {
  const history = useHistory();
  const [template, setTemplate] = useState<Template>({} as Template);
  const [sureToDelete, setSureToDelete] = useState(false);
  useEffect(() => {
    loading();
    getTemplate(props.match.params.id).then((s) => {
      setTemplate(s);
      ready();
    });
  }, []);
  const handleSaveTemplate = (template: Template) => {
    loading();
    updateTemplate(props.match.params.id, template)
      .then(() => {
        ready();
        history.push("/app/templates");
      })
      .catch(() => {
        //mostrar error
      });
  };
  const handleDeleteTemplate = () => {
    setSureToDelete(true);
  };
  const handleConfirmDelete = () => {
    deleteTemplate(template.id!).then(() => history.goBack());
  };
  const handleCancel = () => {
    setSureToDelete(false);
  };
  return (
    <>
      <CardWrapper cardTitle="Editar Template">
        {!isEmpty(template) && (
          <EditTemplateComponentHook
            template={template}
            saveTemplate={handleSaveTemplate}
            editMode={true}
            deleteTemplate={handleDeleteTemplate}
          ></EditTemplateComponentHook>
        )}
      </CardWrapper>
      <DialogQuestion
        callbackClose={() => setSureToDelete(false)}
        title="Eliminar Código de Grupo"
        description={`El código que intenga eliminar tiene miembros registrados. Esta seguro que desea eliminarlo de todas formas?`}
        openPopup={sureToDelete}
        callbackAccept={handleConfirmDelete}
        callbackCancel={handleCancel}
      ></DialogQuestion>
    </>
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  },
});

export const EditTemplate = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTemplateToExport);
