import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Grid, IconButton, Typography } from "@mui/material";

interface Props {
  showOnlyMyWatches: boolean;
  refetch: () => void;
  openCreateModal: () => void;
  toggleShowOnlyMyWatches: () => void;
}

const WatchesHeader = (props: Props): JSX.Element => {
  const {
    showOnlyMyWatches,
    refetch,
    openCreateModal,
    toggleShowOnlyMyWatches,
  } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ marginTop: "1%", marginBottom: "1%" }}
    >
      <Grid item>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography id="modal-modal-title" variant="h3" component="h1">
            Watches
          </Typography>
          <IconButton
            aria-label="refresh"
            onClick={() => refetch()}
            style={{ marginLeft: "1%" }}
            size="large"
          >
            <RefreshIcon />
          </IconButton>
        </div>
      </Grid>
      <Grid item>
        <Button
          variant={showOnlyMyWatches ? "contained" : "outlined"}
          onClick={toggleShowOnlyMyWatches}
        >
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
