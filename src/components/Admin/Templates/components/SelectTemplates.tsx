import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Template } from "../../../../services/models/Template";
import { Select } from "@material-ui/core";
import { getTemplates } from "../../../../services/templatesServices";
import { WithTemplates } from "../../../../services/models/Events/Event";

interface EditTemplateComponentHookIncomingProps {
  withTemplates: WithTemplates;
  updateWithTemplate: (withTemplate: WithTemplates) => void;
}

export const SelectTemplates: React.SFC<EditTemplateComponentHookIncomingProps> = ({
  withTemplates,
  updateWithTemplate,
}) => {
  const [sponsorsEmails, setSponsorsEmails] = useState([] as Template[]);
  const [speakersEmails, setspeakersEmails] = useState([] as Template[]);
  const [attendedEmails, setAttendedEmails] = useState([] as Template[]);
  const [selectedTemplate, setSelectedTemplate] = useState({
    emailTemplateThanksSponsorsId: withTemplates.emailTemplateThanksSponsorsId,
    emailTemplateThanksSpeakersId: withTemplates.emailTemplateThanksSpeakersId,
    emailTemplateThanksAttendedId: withTemplates.emailTemplateThanksAttendedId,
  });

  useEffect(() => {
    getTemplates().then((x) => {
      var sponsors = x.filter((x) => x.type == "EmailTemplateThanksSponsors");
      if (withTemplates.emailTemplateThanksSponsorsId == 0)
        selectedTemplate.emailTemplateThanksSponsorsId = sponsors[0].id!;
      setSponsorsEmails(sponsors);
      var speakers = x.filter((x) => x.type == "EmailTemplateThanksSpeakers");
      if (withTemplates.emailTemplateThanksSpeakersId == 0)
        selectedTemplate.emailTemplateThanksSpeakersId = speakers[0].id!;
      setspeakersEmails(speakers);
      var attended = x.filter((x) => x.type == "EmailTemplateThanksAttended");
      if (withTemplates.emailTemplateThanksAttendedId == 0)
        selectedTemplate.emailTemplateThanksAttendedId = attended[0].id!;
      setSelectedTemplate(selectedTemplate);
      setAttendedEmails(attended);
      updateWithTemplate(selectedTemplate);
    });
  }, []);
  return (
    <>
      {attendedEmails && (
        <div className="form-group">
          <label>Template Agradecimiento Asistentes</label>
          <Select
            id="commodity"
            className="form-control"
            name="commodity"
            value={selectedTemplate.emailTemplateThanksAttendedId}
            onChange={(value, e: any) => {
              var tmp = {
                ...selectedTemplate,
                emailTemplateThanksAttendedId: e.props.value,
              };
              setSelectedTemplate(tmp);
              updateWithTemplate(tmp);
            }}
          >
            {attendedEmails.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </Select>
        </div>
      )}
      {speakersEmails && (
        <div className="form-group">
          <label>Template Agradecimiento Speakers</label>
          <Select
            id="commodity"
            className="form-control"
            name="commodity"
            value={selectedTemplate.emailTemplateThanksSpeakersId}
            onChange={(value, e: any) => {
              var tmp = {
                ...selectedTemplate,
                emailTemplateThanksSpeakersId: e.props.value,
              };
              setSelectedTemplate(tmp);
              updateWithTemplate(tmp);
            }}
          >
            {speakersEmails.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </Select>
        </div>
      )}
      {sponsorsEmails && (
        <div className="form-group">
          <label>Template Agradecimiento Sponsors</label>
          <Select
            id="commodity"
            className="form-control"
            name="commodity"
            value={selectedTemplate.emailTemplateThanksSponsorsId}
            onChange={(value, e: any) => {
              var tmp = {
                ...selectedTemplate,
                emailTemplateThanksSponsorsId: e.props.value,
              };
              setSelectedTemplate(tmp);
              updateWithTemplate(tmp);
            }}
          >
            {sponsorsEmails.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};
