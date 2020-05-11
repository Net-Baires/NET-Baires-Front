import React, { useState, MouseEvent, useEffect } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { GetBadgeResponse } from "../../../../services/models/BadgeDetail";
import Draft from "react-wysiwyg-typescript";
import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
interface FormValues extends GetBadgeResponse {
  imageFiles?: File;
  imagePreview?: string;
  descriptionHtml?: EditorState;
}

const EditBadgeComponentForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setFieldValue } = props;

  useEffect(() => {
    if (props.values.imageUrl != null)
      setFieldValue("imagePreview", props.values.imageUrl);
    if (props.values.description != null) {
      let contentState = stateFromHTML(props.values.description);
      setFieldValue(
        "descriptionHtml",
        EditorState.createWithContent(contentState)
      );
    }
  }, []);
  const changeFile = (event: MouseEvent<HTMLInputElement>, file: any) => {
    event.preventDefault();
    setFieldValue("imageFiles", file);

    const url = URL.createObjectURL(file);
    setFieldValue("imagePreview", url);
  };
  return (
    <Form
      onSubmitCapture={(a: any) => {
        console.log(a);
      }}
    >
      <div className="form-group">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-xs-12 col-md-8 image-badge-prview-container">
            <img
              className="image-badge-prview"
              src={props.values.imagePreview}
            ></img>
          </div>
          <div className="col-md-2"></div>
        </div>
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
          {touched.imageFiles && errors.imageFiles && (
            <div className="form-error alert alert-danger">
              {errors.imageFiles}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label>Nombre</label>
        <Field type="name" name="name" className="form-control" />
        {errors.name && (
          <div className="form-error alert alert-danger">{errors.name}</div>
        )}
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <Draft
          wrapperClassName="badge-description-wrapper"
          editorClassName="badge-description-editor"
          editorState={props.values.descriptionHtml}
          onEditorStateChange={(state) => {
            setFieldValue("descriptionHtml", state);
          }}
        />
        {errors.descriptionHtml && (
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
  imageFiles?: File;
}
const EditAllUserFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      ...props,
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    name: yup.string().required("Campo Requerido"),
    descriptionHtml: yup.string().required("Campo Requerido"),
  }),
  handleSubmit: (values: FormValues, { props }) => {
    values.description = stateToHTML(
      values.descriptionHtml!.getCurrentContent()
    );
    props.saveBadge(values, values.imageFiles!);
  },
})(EditBadgeComponentForm);

type EditBadgeComponentProps = {
  badge: GetBadgeResponse;
  saveBadge: (badge: GetBadgeResponse, image: File) => void;
};
export const EditBadgeComponent: React.SFC<EditBadgeComponentProps> = ({
  badge,
  saveBadge,
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
