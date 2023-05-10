import { Button, Grid, Typography } from "@mui/material";

interface Props {
  openCreateModal: () => void;
  toggleShowOnlyMyWatches: () => void;
}

const WatchesHeader = (props: Props): JSX.Element => {
  const { openCreateModal, toggleShowOnlyMyWatches } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ marginTop: "1%", marginBottom: "1%" }}
    >
      <Grid item>
        <Typography id="modal-modal-title" variant="h3" component="h1">
          Watches
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={toggleShowOnlyMyWatches}>
          My Watches
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={openCreateModal}>
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default WatchesHeader;
