import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Template } from "../../../../services/models/Template";
import {
  inputText,
  inputTextArea,
  inputSelect,
} from "../../components/FormsControls";

interface EditTemplateComponentHookIncomingProps {
  template?: Template;
  saveTemplate: (tempalte: Template) => void;
  editMode?: boolean;
  deleteTemplate?: () => void;
}

export const EditTemplateComponentHook: React.SFC<EditTemplateComponentHookIncomingProps> = ({
  template,
  saveTemplate,
  editMode = true,
  deleteTemplate,
}) => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
  } = useFormik<Template>({
    initialValues: {
      name: template ? template.name : "",
      description: template ? template.description : "",
      templateContent: template ? template.templateContent : "",
      type: template ? template.type : "EmailTemplateThanksSpeakers",
    },
    validationSchema,
    onSubmit: (values) => {
      saveTemplate(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {inputText(errors, "Nombre", "name", values, handleChange)}
      {inputSelect(
        errors,
        "Tipo",
        "type",
        [
          {
            value: "EmailTemplateThanksSponsors",
            text: "Agradecimiento a sponsors",
          },
          {
            value: "EmailTemplateThanksSpeakers",
            text: "Agradecimiento a speakers",
          },
          {
            value: "EmailTemplateThanksAttended",
            text: "Agradecimiento a asistenes al evento",
          },
          {
            value: "EmailTemplateAssignedBadgeToMember",
            text: "Notificación de nuevo badge (Solo se utilizará 1)",
          },
        ],
        editMode,
        values,
        setFieldValue
      )}
      {inputText(
        errors,
        "Descripción",
        "description",
        values as any,
        handleChange
      )}
      {inputTextArea(
        errors,
        "Template",
        "templateContent",
        values,
        handleChange,
        20
      )}
      <button className="btn btn-primary mb-2" type="submit">
        Salvar
      </button>
      {editMode && (
        <button
          className="btn btn-danger mb-2"
          onClick={(e) => {
            e.preventDefault();
            if (deleteTemplate != null) deleteTemplate();
          }}
        >
          Eliminar
        </button>
      )}
    </form>
  );
};

const validationSchema = Yup.object<Template>({
  name: Yup.string().required("Requerido"),
  description: Yup.string().required("Requerido"),
  templateContent: Yup.string().required("Requerido"),
});
