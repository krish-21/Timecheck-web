import { useContext, useState } from "react";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";
import { useGetAllWatchesQuery } from "main/services/WatchService/queries";
import WatchesTable from "./WatchesTable/WatchesTable";
import WatchDetailsModal from "./WatchDetailsModal/WatchDetailsModal";
import { Watch } from "./interfaces";

const PAGE_SIZE = 2;

const WatchesPage = (): JSX.Element => {
  const { authAxios } = useContext(AxiosContext);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading } = useGetAllWatchesQuery(
    authAxios,
    PAGE_SIZE,
    currentPage * PAGE_SIZE,
    false
  );

  const [isDetailsModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [watchToView, setIsWatchToView] = useState<Watch | undefined>();

  const openDetailsModal = (watch: Watch) => {
    setIsWatchToView(watch);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsWatchToView(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Watches</h1>
      {watchToView !== undefined && (
        <WatchDetailsModal
          isOpen={isDetailsModalOpen}
          handleClose={closeDetailsModal}
          watch={watchToView}
        />
      )}
      <WatchesTable
        isLoading={isLoading}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        totalRows={data?.totalItems}
        setCurrentPage={setCurrentPage}
        watches={data?.items}
        openDetailsModal={openDetailsModal}
      />
    </div>
  );
};

export default WatchesPage;
