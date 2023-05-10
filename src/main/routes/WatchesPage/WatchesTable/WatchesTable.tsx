import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef, DataGrid } from "@mui/x-data-grid";

import { Watch } from "main/routes/WatchesPage/interfaces";
import { useEffect, useState } from "react";

interface Props {
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  totalRows?: number;
  setCurrentPage: (page: number) => void;
  watches?: Watch[];
}

const WatchesTable = (props: Props): JSX.Element => {
  const {
    isLoading,
    pageSize,
    currentPage,
    totalRows,
    setCurrentPage,
    watches,
  } = props;

  const [totalRowsState, setTotalRowsState] = useState(totalRows);

  useEffect(() => {
    setTotalRowsState((prevRowCountState) =>
      totalRows !== undefined ? totalRows : prevRowCountState
    );
  }, [totalRows, setTotalRowsState]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      renderCell: (params) => {
        return <p>{params.value}</p>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: () => {
        return (
          <div>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
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
