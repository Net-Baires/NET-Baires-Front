import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { SearchWrapper } from "../../Common/SearchWrapper";
import { CardWrapper } from "../../Common/CardWrapper";
import { getTemplates } from "../../../services/templatesServices";
import { Template } from "../../../services/models/Template";

export const TemplatesList: React.SFC<RouteComponentProps> = () => {
  let history = useHistory();
  const [templates, setTemplates] = useState(new Array<Template>());
  const { SearchBar } = Search;
  useEffect(() => {
    getTemplates().then((s) => setTemplates(s));
  }, []);

  const handleEdit = (
    event: MouseEvent<HTMLButtonElement>,
    template: Template
  ) => {
    event.preventDefault();
    history.push(`/app/templates/${template.id}/edit`);
  };
  const handleNew = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push(`/app/templates/new`);
  };
  const columns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "name",
      text: "Nombre",
    },
    {
      dataField: "description",
      text: "Descripción",
    },
    ,
    {
      dataField: "type",
      text: "Tipo",
    },
    {
      text: "Acción",
      style: {
        textAlign: "center",
        height: "2px",
      },
      formatter: (_cellContent: any, template: Template) => (
        <button
          type="button"
          onClick={(e) => handleEdit(e, template)}
          className="btn btn-primary"
        >
          Edit
        </button>
      ),
    },
  ];
  return (
    <CardWrapper cardTitle="Templates">
      <SearchWrapper title="Templates">
        <ToolkitProvider
          keyField="id"
          data={templates}
          columns={columns}
          search
        >
          {(props: any) => (
            <div>
              <SearchBar {...props.searchProps} />
              <hr />
              <BootstrapTable
                class="table-responsive"
                keyField="id"
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </SearchWrapper>

      <button type="button" onClick={handleNew} className="btn btn-primary">
        Nuevo Template
      </button>
    </CardWrapper>
  );
};
