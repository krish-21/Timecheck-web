import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useGetWatchQuery } from "main/services/WatchService/queries";
import { useContext } from "react";
import { AxiosContext } from "main/context/AxiosContext/AxiosContext";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  watchId: string;
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

const WatchDetailsModal = (props: Props): JSX.Element => {
  const { isOpen, handleClose, watchId } = props;

  const { authAxios } = useContext(AxiosContext);

  const { data } = useGetWatchQuery(authAxios, watchId);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {data !== undefined ? (
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${data.brand} ${data.name}`}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="p">Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">{data.name}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="p">Brand:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">{data.brand}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="p">Reference:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">{data.reference}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="p">Updated At:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">
                {data.updatedAt.toLocaleString("en-GB")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography component="p">Loading</Typography>
      )}
    </Modal>
  );
};

export default WatchDetailsModal;
