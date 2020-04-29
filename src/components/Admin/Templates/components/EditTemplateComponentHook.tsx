import React, { useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik, Form, Field, FormikErrors } from "formik";
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
  // interface Dictionary {
  //   [key: string]: string;
  // }
  // const inputTextGeneric = <TData extends Dictionary>(
  //   errors: FormikErrors<TData>,
  //   label: string,
  //   name: keyof TData,
  //   values: TData
  // ) => (
  //   <div className="form-group">
  //     <label>{label}</label>
  //     <input
  //       name={name as string}
  //       className={errors[name] ? "form-control is-invalid" : "form-control"}
  //       value={values[name]}
  //       onChange={handleChange}
  //     ></input>
  //     {errors[name] ? (
  //       <label className="error jquery-validation-error small form-text invalid-feedback">
  //         {errors[name]}
  //       </label>
  //     ) : null}
  //   </div>
  // );
  const inputSelect = (
    label: string,
    name: "name" | "description" | "templateContent" | "type",
    options: Array<{ value: string; text: string }>,
    disabled: boolean = false
  ) => (
    <div className="form-group">
      <label>{label}</label>
      <select
        disabled={disabled}
        name={label}
        className={errors[name] ? "form-control is-invalid" : "form-control"}
        value={values[name]}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {options &&
          options.map((x) => (
            <option key={x.value} value={x.value}>
              {x.text}
            </option>
          ))}
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
      {inputSelect(
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
        editMode
      )}
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
