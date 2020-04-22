import { getRequest, postRequest, deleteRequest } from "./requestServices";
import { Material } from "./models/Member";

export const addMaterial = (
  eventId: number,
  material: Material
): Promise<void> => postRequest(`/events/${eventId}/materials`, material);

export const removeMaterial = (
  eventId: number,
  materialId: number
): Promise<void> => deleteRequest(`/events/${eventId}/materials/${materialId}`);

export const getMaterials = (eventId: number): Promise<Material[]> =>
  getRequest(`/events/${eventId}/materials`);
