import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { GridColDef, DataGrid, GridCellParams } from "@mui/x-data-grid";

import { Watch } from "main/routes/WatchesPage/interfaces";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "main/context/AuthContext/AuthContext";

interface Props {
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  totalRows?: number;
  setCurrentPage: (page: number) => void;
  watches?: Watch[];
  openDetailsModal: (watchToView: Watch) => void;
  openEditModal: (watchToEdit: Watch) => void;
}

const WatchesTable = (props: Props): JSX.Element => {
  const {
    isLoading,
    pageSize,
    currentPage,
    totalRows,
    setCurrentPage,
    watches,
    openDetailsModal,
    openEditModal,
  } = props;

  const { userId } = useContext(AuthContext);

  const [totalRowsState, setTotalRowsState] = useState(totalRows);

  useEffect(() => {
    setTotalRowsState((prevRowCountState) =>
      totalRows !== undefined ? totalRows : prevRowCountState
    );
  }, [totalRows, setTotalRowsState]);

  const renderActionsCell = (params: GridCellParams) => {
    if (userId === params.row.userId) {
      return (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => openEditModal(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      );
    }

    return (
      <IconButton
        aria-label="view"
        onClick={() => openDetailsModal(params.row)}
      >
        <PreviewIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      renderCell: (params) => {
        return <p>{params.row.name}</p>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: renderActionsCell,
    },
  ];

  return (
    <DataGrid
      loading={isLoading}
      paginationMode="server"
      paginationModel={{ page: currentPage, pageSize: pageSize }}
      onPaginationModelChange={({ page }) => {
        setCurrentPage(page);
      }}
      rowCount={totalRowsState}
      columns={columns}
      rows={watches ? watches : []}
    />
  );
};

export default WatchesTable;
