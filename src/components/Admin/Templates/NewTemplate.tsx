import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { CardWrapper } from "../../Common/CardWrapper";
import { Template } from "../../../services/models/Template";
import { newTemplate } from "../../../services/templatesServices";
import { EditTemplateComponentHook } from "./components/EditTemplateComponent";
type NewTemplateProps = {
  loading: () => void;
  ready: () => void;
};
export const NewTemplateComponent: React.SFC<NewTemplateProps> = ({
  loading,
  ready,
}) => {
  const history = useHistory();

  const handleSaveTemplate = (template: Template) => {
    loading();
    newTemplate(template)
      .then(() => {
        ready();
        history.push("/app/templates");
      })
      .catch(() => {
        //mostrar error
      });
  };
  return (
    <CardWrapper cardTitle="Nuevo template">
      <EditTemplateComponentHook
        saveTemplate={handleSaveTemplate}
        editMode={false}
      ></EditTemplateComponentHook>
    </CardWrapper>
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

export const NewTemplate = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTemplateComponent);
