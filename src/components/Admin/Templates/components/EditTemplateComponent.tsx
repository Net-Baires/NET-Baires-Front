import React, { useEffect } from "react";
import { Template } from "../../../../services/models/Template";
import { withFormik, FormikProps, Form, Field } from "formik";
import * as yup from "yup"; // for everything
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Draft from "react-wysiwyg-typescript";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import { Select } from "@material-ui/core";
interface FormValues extends Template {
  descriptionHtml?: EditorState;
}

const EditTemplateComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, values, isSubmitting, setFieldValue } = props;
  useEffect(() => {
    if (props.values.description != null)
      setFieldValue(
        "descriptionHtml",
        EditorState.createWithContent(
          stateFromHTML(props.values.templateContent!)
        )
      );
  }, []);
  return (
    <>
      <Form>
        <div className="form-group">
          <label>Nombre</label>
          <Field type="name" name="name" className="form-control" />
          {touched.name && errors.name && (
            <div className="form-error alert alert-danger">{errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <Field
            component="textarea"
            rows="4"
            type="description"
            name="description"
            className="form-control"
          />
          {touched.description && errors.description && (
            <div className="form-error alert alert-danger">
              {errors.description}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <Select
            id="commodity"
            className="form-control"
            name="commodity"
            value={values.type}
            onChange={(field, value: any) => {
              setFieldValue("type", value.props.value);
            }}
          >
            <option value="EmailTemplateThanksSponsors">
              Agradecimiento a sponsors
            </option>
            <option value="EmailTemplateThanksSpeakers">
              Agradecimiento a speakers
            </option>
            <option value="EmailTemplateThanksAttended">
              Agradecimiento a asistenes al evento
            </option>
          </Select>

          {touched.type && errors.type && (
            <div className="form-error alert alert-danger">{errors.type}</div>
          )}
        </div>
        <div className="form-group">
          <label>Template</label>
          <Draft
            wrapperClassName="badge-description-wrapper"
            editorClassName="badge-description-editor"
            editorState={props.values.descriptionHtml}
            onEditorStateChange={(state: any) => {
              setFieldValue("descriptionHtml", state);
            }}
          />
          {touched.descriptionHtml && errors.descriptionHtml && (
            <div className="form-error alert alert-danger">
              {errors.descriptionHtml}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-full-width"
        >
          Guardar
        </button>
      </Form>
    </>
  );
};

interface MyFormProps extends Template {
  saveTemplate: (template: Template) => void;
}
const EditAllTemplateFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      ...props,
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    name: yup.string().required("Campo Requerido"),
    description: yup.string().required("Campo Requerido"),
  }),

  handleSubmit: (values: any & Template, { props }) => {
    values.templateContent = stateToHTML(
      values.descriptionHtml!.getCurrentContent()
    );
    props.saveTemplate(values);
  },
})(EditTemplateComponentForm);

interface EditAllTemplateProps extends Template {
  saveTemplate: (template: Template) => void;
  editMode: boolean;
}
export const EditTemplateComponent: React.SFC<EditAllTemplateProps> = (
  props
) => {
  return (
    <>
      <h1>{props.name}</h1>
      <EditAllTemplateFormik {...props}></EditAllTemplateFormik>
    </>
  );
};
