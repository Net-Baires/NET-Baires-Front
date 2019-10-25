import React, { useState, MouseEvent, useEffect } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { GetBadgeResponse } from "../../../../services/models/BadgeDetail";
import Draft from "react-wysiwyg-typescript";
import { EditorState, ContentState } from "draft-js";

interface FormValues extends GetBadgeResponse {
  imageData?: File;
  imagePreview?: string;
  descriptionHtml?: EditorState;
}

const EditBadgeComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setFieldValue } = props;
  useEffect(() => {
    if (props.values.badgeImageUrl != null)
      setFieldValue("imagePreview", props.values.badgeImageUrl);
    if (props.values.description != null)
      setFieldValue(
        "descriptionHtml",
        EditorState.createWithContent(
          ContentState.createFromText(props.values.description)
        )
      );
  }, []);
  const changeFile = (event: MouseEvent<HTMLInputElement>, file: any) => {
    event.preventDefault();
    setFieldValue("imageData", file);
    const url = URL.createObjectURL(file);
    setFieldValue("imagePreview", url);
  };
  return (
    <Form
      className="lgx-contactform"
      onSubmitCapture={(a: any) => {
        console.log(a);
      }}
    >
      <div className="form-group">
        <img
          className="image-badge-prview"
          src={props.values.imagePreview}
        ></img>
      </div>
      <div className="input-group">
        <div className="custom-file">
          <label>Badge</label>

          <input
            type="file"
            onChange={(event: any) => {
              changeFile(event, event.currentTarget.files[0]);
            }}
            name="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          ></input>
          <label className="custom-file-label">Choose file</label>
          {touched.imageData && errors.imageData && (
            <div className="form-error alert alert-danger">
              {errors.imageData}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label>Nombre</label>
        <Field type="name" name="name" className="form-control" />
        {touched.name && errors.name && (
          <div className="form-error alert alert-danger">{errors.name}</div>
        )}
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <Draft
          wrapperClassName="badge-description-wrapper"
          editorClassName="badge-description-editor"
          editorState={props.values.descriptionHtml}
          onEditorStateChange={state => {
            setFieldValue("descriptionHtml", state);
          }}
        />
        {touched.descriptionHtml && errors.descriptionHtml && (
          <div className="form-error alert alert-danger">
            {errors.descriptionHtml}
          </div>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-full-width"
        >
          Guardar
        </button>
      </div>
    </Form>
  );
};

interface MyFormProps extends GetBadgeResponse {
  saveBadge: (badge: GetBadgeResponse, image: File) => void;
  imageData?: File;
}
const EditAllUserFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    name: yup.string().required("Campo Requerido"),
    descriptionHtml: yup.string().required("Campo Requerido")
  }),
  handleSubmit: (values: FormValues, { props }) => {
    values.description = values
      .descriptionHtml!.getCurrentContent()
      .getPlainText();
    props.saveBadge(values, values.imageData!);
  }
})(EditBadgeComponentForm);

type EditBadgeComponentProps = {
  badge: GetBadgeResponse;
  saveBadge: (badge: GetBadgeResponse, image: File) => void;
};
export const EditBadgeComponent: React.SFC<EditBadgeComponentProps> = ({
  badge,
  saveBadge
}) => {
  const [userBadgeToEdit] = useState(badge);
  return (
    <>
      <EditAllUserFormik
        {...userBadgeToEdit}
        saveBadge={saveBadge}
      ></EditAllUserFormik>
    </>
  );
};
