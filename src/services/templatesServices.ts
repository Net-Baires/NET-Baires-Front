import { getRequest, deleteRequest } from "./requestServices";
import { Template } from "./models/Template";
import { postRequest, putRequest } from "./requestServices";

export const getTemplates = (): Promise<Template[]> =>
  getRequest(`/templates`, new Array<Template>());

export const getTemplate = (id: number): Promise<Template> =>
  getRequest(`/templates/${id}`);

export const newTemplate = (newTemplate: Template): Promise<Template> =>
  postRequest(`/templates/`, newTemplate);

export const updateTemplate = (
  id: number,
  template: Template
): Promise<Template> => putRequest(`/templates/${id}`, template);
export const deleteTemplate = (id: number): Promise<boolean> => {
  return deleteRequest(`/templates/${id}`);
};
