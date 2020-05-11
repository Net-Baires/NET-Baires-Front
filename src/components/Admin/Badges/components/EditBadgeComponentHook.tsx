import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Template } from "../../../../services/models/Template";

import { NewBadgeRequest, GetBadgeResponse } from '../../../../services/models/BadgeDetail';

import { Badge } from "@material-ui/core";
import { FileToAdd } from "../../../../services/requestServices";
import { inputText, inputTextArea } from '../../components/FormsControls';

interface EditBadgeComponentHookIncomingProps {
  badge: GetBadgeResponse;
  saveBadge: (badge: NewBadgeRequest, images: Array<FileToAdd>) => void;
  editMode?: boolean;
  deleteBadge?: () => void;
}

export const EditBadgeComponentHook: React.SFC<EditBadgeComponentHookIncomingProps> = ({
  badge,
  saveBadge,
  editMode = false,
  deleteBadge,
}) => {
  const [filesPreview, setFilesPreview] = useState({
    badgeUrl: "",
    simpleBadgeUrl: "",
    linkedinBadgeUrl: ""
  })
  useEffect(() => {
    setFilesPreview({
      badgeUrl: badge.imageUrl,
      simpleBadgeUrl: badge.simpleImageUrl,
      linkedinBadgeUrl: badge.linkedinImageUrl
    })
  }, [badge])
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
  } = useFormik<NewBadgeRequest>({
    initialValues: {
      name: badge ? badge.name : "",
      description: badge ? badge.description : "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      let listImages = new Array<FileToAdd>();
      if (values.badgeImage)
        listImages.push({ file: values.badgeImage as File, fileName: "Badge", filePropName: "ImageFiles" });
      if (values.simpleBadge)
        listImages.push({ file: values.simpleBadge as File, fileName: "SimpleBadge", filePropName: "ImageFiles" });
      if (values.linkedinBadge)
        listImages.push({ file: values.linkedinBadge as File, fileName: "LinkedinBadge", filePropName: "ImageFiles" });
      saveBadge(values, listImages);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {inputText(errors, "Nombre", "name", values, handleChange)}
      {/* 
      {inputText(
        errors,
        "Descripción",
        "description",
        values as any,
        handleChange
      )} */}
      <div className="form-group">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-xs-12 col-md-8 image-badge-prview-container">
            <img
              className="image-badge-prview"
              src={filesPreview.badgeUrl}
            ></img>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="input-group">
        <div className="custom-file">
          <label>Imagen Badge</label>
          <input
            type="file"
            onChange={(event: any) => {
              setFieldValue("badgeImage", event.currentTarget.files[0]);
              setFilesPreview({ ...filesPreview, badgeUrl: URL.createObjectURL(event.currentTarget.files[0]) })
            }}
            name="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          ></input>
          <label className="custom-file-label">Badge Principal</label>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-xs-12 col-md-8 image-badge-prview-container">
            <img
              className="image-badge-prview"
              src={filesPreview.simpleBadgeUrl}
            ></img>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="input-group">
        <div className="custom-file">
          <label>Imagen Simple Badge</label>
          <input
            type="file"
            onChange={(event: any) => {
              setFieldValue("simpleBadge", event.currentTarget.files[0]);
              setFilesPreview({ ...filesPreview, simpleBadgeUrl: URL.createObjectURL(event.currentTarget.files[0]) })
            }}
            name="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          ></input>
          <label className="custom-file-label">Badge Simple</label>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-xs-12 col-md-8 image-badge-prview-container">
            <img
              className="image-badge-prview"
              src={filesPreview.linkedinBadgeUrl}
            ></img>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="input-group">
        <div className="custom-file">
          <label>Imagen Badge para Linkedin </label>
          <input
            type="file"
            onChange={(event: any) => {
              setFieldValue("linkedinBadge", event.currentTarget.files[0]);
              setFilesPreview({ ...filesPreview, linkedinBadgeUrl: URL.createObjectURL(event.currentTarget.files[0]) })
            }}
            name="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          ></input>
          <label className="custom-file-label">Badge Linkedin</label>
        </div>
      </div>
      {inputTextArea(
        errors,
        "Descripción",
        "description",
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
            if (deleteBadge != null) deleteBadge();
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
});
