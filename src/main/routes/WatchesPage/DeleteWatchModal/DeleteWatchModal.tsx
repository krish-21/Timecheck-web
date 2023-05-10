import { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormEvent, useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle, Button } from "@mui/material";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";

import { Watch } from "main/routes/WatchesPage/interfaces";
import type { DefaultError } from "main/utils/errors/interfaces";
import type { DeleteWatchMutationData } from "main/services/WatchService/interfaces";

import { useDeleteWatchMutation } from "main/services/WatchService/mutations";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  watchToDelete: Watch;
}

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteWatchModal = (props: Props): JSX.Element => {
  const { isOpen, handleClose, watchToDelete } = props;

  const { authAxios } = useContext(AxiosContext);

  const [serverError, setServerError] = useState<DefaultError>({
    isError: false,
    message: "",
  });

  const { mutate: deleteMutate, isLoading: isDeleteMutationLoading } =
    useDeleteWatchMutation();

  const submitDelete = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const deleteWatchMutationData: DeleteWatchMutationData = {
      axiosInstance: authAxios,
      watchId: watchToDelete.id,
    };

    deleteMutate(deleteWatchMutationData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response !== undefined) {
          setServerError({
            isError: true,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            message: err.response.data.error.message,
          });
        } else {
          setServerError({ isError: true, message: "Server Error" });
        }
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete {`${watchToDelete.brand} ${watchToDelete.name}`}?
        </Typography>
        <Box component="form" noValidate onSubmit={submitDelete} sx={{ mt: 3 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDeleteMutationLoading}
          >
            Delete
          </Button>
          {serverError.isError && (
            <Alert severity="error" style={{ marginTop: "1%" }}>
              <AlertTitle>Error</AlertTitle>
              {serverError.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteWatchModal;
