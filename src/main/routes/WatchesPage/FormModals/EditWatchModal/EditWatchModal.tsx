import { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FormEvent, useContext, useReducer } from "react";
import { Alert, AlertTitle, Button, Grid, TextField } from "@mui/material";

import { Watch } from "main/routes/WatchesPage/interfaces";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";

import { useEditWatchMutation } from "main/services/WatchService/mutations";

import { validateForm } from "main/routes/WatchesPage/FormModals/WatchForm/utils";
import { authFormReducer } from "main/routes/WatchesPage/FormModals/WatchForm/reducer";
import { WatchFormActionKind } from "main/routes/WatchesPage/FormModals/WatchForm/enums";
import { watchFormDefaultValue } from "main/routes/WatchesPage/FormModals/WatchForm/defaultValues";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  watchToEdit: Watch;
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

const EditWatchModal = (props: Props): JSX.Element => {
  const { isOpen, handleClose, watchToEdit } = props;

  const { authAxios } = useContext(AxiosContext);

  const [editFormState, editFormDispatch] = useReducer(authFormReducer, {
    ...watchFormDefaultValue,
    name: watchToEdit.name,
    brand: watchToEdit.brand,
    reference: watchToEdit.reference,
  });

  const { mutate: editMutate, isLoading: isEditMutationLoading } =
    useEditWatchMutation();

  const onChangeName = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    editFormDispatch({
      type: WatchFormActionKind.UPDATE_NAME,
      payload: { name: event.target.value },
    });
  };

  const onChangeBrand = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    editFormDispatch({
      type: WatchFormActionKind.UPDATE_BRAND,
      payload: { brand: event.target.value },
    });
  };

  const onChangeReference = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    editFormDispatch({
      type: WatchFormActionKind.UPDATE_REFERENCE,
      payload: { reference: event.target.value },
    });
  };

  const submitData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    editFormDispatch({
      type: WatchFormActionKind.VALIDATE_FORM,
    });

    if (
      validateForm(
        editFormState.name,
        editFormState.brand,
        editFormState.reference
      ).isError
    ) {
      return;
    }

    editMutate(
      {
        axiosInstance: authAxios,
        watchId: watchToEdit.id,
        name: editFormState.name,
        brand: editFormState.brand,
        reference: editFormState.reference,
      },
      {
        onSuccess: (data) => {
          handleClose();
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response !== undefined) {
            editFormDispatch({
              type: WatchFormActionKind.SET_SERVER_ERROR,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              payload: { message: err.response.data.error.message },
            });
          } else {
            editFormDispatch({
              type: WatchFormActionKind.SET_SERVER_ERROR,
              payload: { message: "Server Error" },
            });
          }
        },
      }
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Edit Watch
        </Typography>
        <Box component="form" noValidate onSubmit={submitData} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="Name"
                autoFocus={true}
                disabled={isEditMutationLoading}
                value={editFormState.name}
                onChange={onChangeName}
                error={editFormState.nameError.isError}
                helperText={editFormState.nameError.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="brand"
                name="Brand"
                label="Brand"
                disabled={isEditMutationLoading}
                value={editFormState.brand}
                onChange={onChangeBrand}
                error={editFormState.brandError.isError}
                helperText={editFormState.brandError.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="reference"
                name="Reference"
                label="Reference"
                disabled={isEditMutationLoading}
                value={editFormState.reference}
                onChange={onChangeReference}
                error={editFormState.referenceError.isError}
                helperText={editFormState.referenceError.message}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography component="p">Updated At:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="p">
                  {watchToEdit.updatedAt.toLocaleString("en-GB")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isEditMutationLoading}
          >
            Save
          </Button>
          {editFormState.serverError.isError && (
            <Alert severity="error" style={{ marginTop: "1%" }}>
              <AlertTitle>Error</AlertTitle>
              {editFormState.serverError.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default EditWatchModal;
