import React, { useState, useEffect, MouseEvent } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Material } from "../../../services/models/Member";
import {
  getMaterials,
  addMaterial,
  removeMaterial,
} from "../../../services/materialServices";
import { isEmpty } from "../../../services/objectsservices";
type AdminMaterialsProps = {
  eventId: number;
};

export const AdminMaterials: React.SFC<AdminMaterialsProps> = ({ eventId }) => {
  const [materials, setMaterials] = useState(new Array<Material>());
  const [newMaterial, setNewMaterial] = useState({} as Material);
  useEffect(() => {
    loadMaterial();
  }, []);
  const loadMaterial = () => {
    clean();
    getMaterials(eventId).then((x) => {
      setMaterials(x);
    });
  };
  const addMaterialHandler = (eventInput: MouseEvent<HTMLButtonElement>) => {
    eventInput.preventDefault();
    addMaterial(eventId, newMaterial).then(() => loadMaterial());
  };
  const removeMaterialHandler = (
    eventInput: MouseEvent<HTMLButtonElement>,
    material: Material
  ) => {
    eventInput.preventDefault();
    removeMaterial(eventId, material.id).then(() => loadMaterial());
  };
  const clean = () => setNewMaterial({ link: "", title: "" } as Material);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Link</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(materials) &&
            materials.map((material) => (
              <tr>
                <td>{material.title}</td>
                <td>{material.link}</td>
                <td>
                  <button
                    onClick={(e) => removeMaterialHandler(e, material)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td>
              <input
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, title: e.target.value })
                }
                placeholder="Título"
                type="text"
                value={newMaterial.title}
                className="form-control"
              ></input>
            </td>
            <td>
              <input
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, link: e.target.value })
                }
                placeholder="Link"
                type="text"
                value={newMaterial.link}
                className="form-control"
              ></input>
            </td>
            <td>
              <button
                onClick={(e) => addMaterialHandler(e)}
                type="button"
                className="btn btn-success "
              >
                <i className="fas fa-check"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
