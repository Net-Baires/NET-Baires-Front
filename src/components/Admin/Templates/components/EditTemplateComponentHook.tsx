import React, { useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Template } from "../../../../services/models/Template";

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
  const { handleSubmit, handleChange, values, errors } = useFormik<Template>({
    initialValues: {
      name: template ? template.name : "",
      description: template ? template.description : "",
      templateContent: template ? template.templateContent : "",
      type: template ? template.type : "EmailTemplateThanksSponsors",
    },
    validationSchema,
    onSubmit: (values) => {
      saveTemplate(values);
    },
  });

  const inputText = (
    label: string,
    name: "name" | "description" | "templateContent" | "type"
  ) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        name={name}
        className={errors[name] ? "form-control is-invalid" : "form-control"}
        value={values[name]}
        onChange={handleChange}
      ></input>
      {errors[name] ? (
        <label className="error jquery-validation-error small form-text invalid-feedback">
          {errors[name]}
        </label>
      ) : null}
    </div>
  );

  const inputTextArea = (
    label: string,
    name: "name" | "description" | "templateContent" | "type",
    rows: number = 10
  ) => (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        name={name}
        rows={rows}
        className={errors[name] ? "form-control is-invalid" : "form-control"}
        value={values[name]}
        onChange={handleChange}
      ></textarea>
      {errors[name] ? (
        <label className="error jquery-validation-error small form-text invalid-feedback">
          {errors[name]}
        </label>
      ) : null}
    </div>
  );

  const inputSelect = (
    label: string,
    name: "name" | "description" | "templateContent" | "type",
    options: Array<{ value: string; text: string }>
  ) => (
    <div className="form-group">
      <label>{label}</label>
      <select
        name={label}
        className={errors[name] ? "form-control is-invalid" : "form-control"}
        value={values[name]}
        onChange={handleChange}
      >
        {options &&
          options.map((x) => <option value={x.value}>{x.text}</option>)}
      </select>
      {errors[name] ? (
        <label className="error jquery-validation-error small form-text invalid-feedback">
          {errors[name]}
        </label>
      ) : null}
    </div>
  );
  return (
    <form onSubmit={handleSubmit}>
      {inputText("Nombre", "name")}
      {!editMode &&
        inputSelect("Tipo", "type", [
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
        ])}
      {inputText("Descripción", "description")}
      {inputTextArea("Template", "templateContent", 20)}
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
