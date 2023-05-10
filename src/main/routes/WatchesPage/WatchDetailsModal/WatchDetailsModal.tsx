import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Watch } from "main/routes/WatchesPage/interfaces";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  watch: Watch;
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
  const { isOpen, handleClose, watch } = props;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${watch.brand} ${watch.name}`}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="p">Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p">{watch.name}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="p">Brand:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p">{watch.brand}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="p">Reference:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p">{watch.reference}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="p">Updated At:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p">
              {watch.updatedAt.toLocaleString("en-GB")}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default WatchDetailsModal;
