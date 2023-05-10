import { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FormEvent, useContext, useReducer } from "react";
import { Alert, AlertTitle, Button, Grid, TextField } from "@mui/material";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";

import { useCreateWatchMutation } from "main/services/WatchService/mutations";

import { validateForm } from "main/routes/WatchesPage/FormModals/WatchForm/utils";
import { authFormReducer } from "main/routes/WatchesPage/FormModals/WatchForm/reducer";
import { WatchFormActionKind } from "main/routes/WatchesPage/FormModals/WatchForm/enums";
import { watchFormDefaultValue } from "main/routes/WatchesPage/FormModals/WatchForm/defaultValues";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
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

const CreateWatchModal = (props: Props): JSX.Element => {
  const { isOpen, handleClose } = props;

  const { authAxios } = useContext(AxiosContext);

  const [createFormState, createFormDispatch] = useReducer(
    authFormReducer,
    watchFormDefaultValue
  );

  const { mutate: createMutate, isLoading: isCreateMutationLoading } =
    useCreateWatchMutation();

  const onChangeName = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    createFormDispatch({
      type: WatchFormActionKind.UPDATE_NAME,
      payload: { name: event.target.value },
    });
  };

  const onChangeBrand = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    createFormDispatch({
      type: WatchFormActionKind.UPDATE_BRAND,
      payload: { brand: event.target.value },
    });
  };

  const onChangeReference = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    createFormDispatch({
      type: WatchFormActionKind.UPDATE_REFERENCE,
      payload: { reference: event.target.value },
    });
  };

  const submitData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    createFormDispatch({
      type: WatchFormActionKind.VALIDATE_FORM,
    });

    if (
      validateForm(
        createFormState.name,
        createFormState.brand,
        createFormState.reference
      ).isError
    ) {
      return;
    }

    createMutate(
      {
        axiosInstance: authAxios,
        name: createFormState.name,
        brand: createFormState.brand,
        reference: createFormState.reference,
      },
      {
        onSuccess: (data) => {
          handleClose();
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response !== undefined) {
            createFormDispatch({
              type: WatchFormActionKind.SET_SERVER_ERROR,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              payload: { message: err.response.data.error.message },
            });
          } else {
            createFormDispatch({
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
          Create Watch
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
                disabled={isCreateMutationLoading}
                value={createFormState.name}
                onChange={onChangeName}
                error={createFormState.nameError.isError}
                helperText={createFormState.nameError.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="brand"
                name="Brand"
                label="Brand"
                disabled={isCreateMutationLoading}
                value={createFormState.brand}
                onChange={onChangeBrand}
                error={createFormState.brandError.isError}
                helperText={createFormState.brandError.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="reference"
                name="Reference"
                label="Reference"
                disabled={isCreateMutationLoading}
                value={createFormState.reference}
                onChange={onChangeReference}
                error={createFormState.referenceError.isError}
                helperText={createFormState.referenceError.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isCreateMutationLoading}
          >
            Create
          </Button>
          {createFormState.serverError.isError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {createFormState.serverError.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateWatchModal;
