import React, { useState, useEffect, MouseEvent, useContext } from "react";
import { FormikProps, Field, Form, withFormik } from "formik";
import * as yup from "yup";
import { Member } from "../../services/models/Member";
import { connect } from "react-redux";
import { getMe, updateMe } from "../../services/profileServices";
import { isEmpty } from "../../services/objectsservices";
import Draft from "react-wysiwyg-typescript";
import { EditorState, ContentState } from "draft-js";
import { fillAllFieldWithDefaultValue } from "../../helpers/objectHelper";
import { CardWrapper } from '../Common/CardWrapper';
import { loading, ready } from '../../store/loading/actions';
import { successToast } from '../../services/toastServices';
import { UserContext } from '../../contexts/UserContext';
import { getCurrentUser } from '../../services/authService';
interface FormValues extends Member {
  imageData?: File;
  biographyHtml?: EditorState;
  imagePreview?: string;
}

const UserProfileForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setFieldValue, initialValues } = props;
  fillAllFieldWithDefaultValue(initialValues, "");
  useEffect(() => {
    if (props.values.picture != null)
      setFieldValue("imagePreview", props.values.picture);

    if (props.values.biography != null)
      setFieldValue(
        "biographyHtml",
        EditorState.createWithContent(
          ContentState.createFromText(props.values.biography)
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
    <>
      <div className="form-group image-profile-prview-container" >
        <img
          className="image-profile-prview"
          src={props.values.imagePreview}
        ></img>
      </div>
      <div className="input-group">
        <div className="custom-file">
          <label>Logo</label>

          <input
            type="file"
            accept=".jpg,.png"
            onChange={(event: any) => {
              changeFile(event, event.currentTarget.files[0]);
            }}
            name="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          ></input>
          <label className="custom-file-label">Elegir Imagen</label>
          {touched.imageData && errors.imageData && (
            <div className="form-error alert alert-danger">
              {errors.imageData}
            </div>
          )}
        </div>
      </div>
      <Form className="lgx-contactform">
        <div className="form-group">
          <label>Nombre</label>
          <Field
            type="text"
            name="firstName"
            className="form-control lgxname"
          />
          {touched.firstName && errors.firstName && (
            <div className="form-error alert alert-danger">
              {errors.firstName}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <Field type="lastName" name="lastName" className="form-control" />
          {touched.lastName && errors.lastName && (
            <div className="form-error alert alert-danger">
              {errors.lastName}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Posición laboral</label>
          <Field
            type="workPosition"
            name="workPosition"
            className="form-control"
          />
          {touched.workPosition && errors.workPosition && (
            <div className="form-error alert alert-danger">
              {errors.workPosition}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <Field disabled type="email" name="email" className="form-control" />
          {touched.email && errors.email && (
            <div className="form-error alert alert-danger">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label>Linkedin User</label>
          <Field type="linkedin" name="linkedin" className="form-control" />
          {touched.linkedin && errors.linkedin && (
            <div className="form-error alert alert-danger">
              {errors.linkedin}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Twitter User</label>
          <Field type="twitter" name="twitter" className="form-control" />
          {touched.twitter && errors.twitter && (
            <div className="form-error alert alert-danger">
              {errors.twitter}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Github User</label>
          <Field type="github" name="github" className="form-control" />
          {touched.github && errors.github && (
            <div className="form-error alert alert-danger">{errors.github}</div>
          )}
        </div>
        <div className="form-group">
          <label>Instagram User</label>
          <Field type="instagram" name="instagram" className="form-control" />
          {touched.instagram && errors.instagram && (
            <div className="form-error alert alert-danger">
              {errors.instagram}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Biografía</label>
          <Draft
            wrapperClassName="badge-description-wrapper"
            editorClassName="badge-description-editor"
            editorState={props.values.biographyHtml}
            onEditorStateChange={state => {
              setFieldValue("biographyHtml", state);
            }}
          />
          {touched.biographyHtml && errors.biographyHtml && (
            <div className="form-error alert alert-danger">
              {errors.biographyHtml}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          Submit
        </button>
      </Form>
    </>
  );
};

interface MyFormProps extends Member {
  saveUser: (me: Member, picture: File) => void;
  imageData?: File;
}
const EditAllUserFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      ...props
    };
  },
  validationSchema: yup.object<MyFormProps>().shape({
    firstName: yup.string().required("Nombre Requerido"),
    lastName: yup.string().required("Nombre Requerido"),
    linkedin: yup.string(),
    twitter: yup.string(),
    github: yup.string(),
    biography: yup.string(),
    instagram: yup.string()
  }),
  handleSubmit: (values: any, { props }) => {
    // values.biography = values.biographyHtml.getCurrentContent().getPlainText();
    props.saveUser(values, values.imageData!);
  }
})(UserProfileForm);

type EditAllSponsorProps = {
  loading: () => void;
  ready: () => void;
};
const UserProfileComponent: React.SFC<EditAllSponsorProps> = ({ loading, ready }) => {
  const [userDetail, setUserDetailState] = useState({} as Member);
  const { setUserDetail, memberDetail } = useContext(UserContext);
  useEffect(() => {
    loading();
    getMe().then(x => {
      setUserDetailState(x);
      setUserDetail(x);
      ready();
    });
  }, []);

  const saveUser = (me: Member, picture: File) => {
    loading();
    updateMe(me, picture).then(() => {
      ready();
      successToast("Perfil Actualizado");
    });
  };
  return (
    <CardWrapper cardTitle="Editar Perfil" >
      {!isEmpty(userDetail) && (
        <EditAllUserFormik
          {...userDetail}
          saveUser={saveUser}
        ></EditAllUserFormik>
      )
      }
    </CardWrapper >
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileComponent);
