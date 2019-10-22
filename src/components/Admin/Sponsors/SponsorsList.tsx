import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Sponsor } from "services/models/sponsor";
import { getSponsors } from "../../../services/sponsorsServices";

export const SponsorsList: React.SFC<RouteComponentProps> = () => {
  let history = useHistory();

  const [sponsors, setSponsor] = useState(new Array<Sponsor>());
  useEffect(() => {
    getSponsors().then(s => setSponsor(s));
  }, []);

  const handleEdit = (
    event: MouseEvent<HTMLButtonElement>,
    sponsor: Sponsor
  ) => {
    event.preventDefault();
    history.push(`/admin/sponsors/${sponsor.id}/edit`);
  };
  const handleNew = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push(`/admin/sponsors/new`);
  };

  return (
    <>
      {sponsors && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Descripción</th>
              <th scope="col">Logo</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map(sponsor => (
              <tr key={sponsor.id}>
                <th scope="row">{sponsor.id}</th>
                <td>{sponsor.name}</td>
                <td>{sponsor.description}</td>
                <td>
                  <img
                    className="sponsors-list-img"
                    src={sponsor.logoUrl}
                  ></img>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={e => handleEdit(e, sponsor)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button type="button" onClick={handleNew} className="btn btn-primary">
        Nuevo Sponsor
      </button>
    </>
  );
};
