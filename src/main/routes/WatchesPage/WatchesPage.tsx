import { useContext, useState } from "react";

import type { Watch } from "main/routes/WatchesPage/interfaces";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";

import { PAGE_SIZE } from "main/routes/WatchesPage/constants";

import { useGetAllWatchesQuery } from "main/services/WatchService/queries";

import WatchesTable from "main/routes/WatchesPage/WatchesTable/WatchesTable";
import WatchDetailsModal from "main/routes/WatchesPage/WatchDetailsModal/WatchDetailsModal";
import CreateWatchModal from "main/routes/WatchesPage/FormModals/CreateWatchModal/CreateWatchModal";
import EditWatchModal from "main/routes/WatchesPage/FormModals/EditWatchModal/EditWatchModal";
import DeleteWatchModal from "main/routes/WatchesPage/DeleteWatchModal/DeleteWatchModal";
import WatchesHeader from "./WatchesHeader/WatchesHeader";

const WatchesPage = (): JSX.Element => {
  const { authAxios } = useContext(AxiosContext);

  const [showOnlyMyWatches, setShowOnlyMyWatches] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [watchToEdit, setIsWatchToEdit] = useState<Watch | undefined>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [watchToDelete, setIsWatchToDelete] = useState<Watch | undefined>();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [watchToView, setIsWatchToView] = useState<Watch | undefined>();

  const { data, isLoading } = useGetAllWatchesQuery(
    authAxios,
    PAGE_SIZE,
    currentPage * PAGE_SIZE,
    showOnlyMyWatches
  );

  const toggleShowOnlyMyWatches = () => {
    setShowOnlyMyWatches((prevShowOnlyMyWatches) => !prevShowOnlyMyWatches);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openEditModal = (watch: Watch) => {
    setIsWatchToEdit(watch);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsWatchToEdit(undefined);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (watch: Watch) => {
    setIsWatchToDelete(watch);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsWatchToDelete(undefined);
    setIsDeleteModalOpen(false);
  };

  const openDetailsModal = (watch: Watch) => {
    setIsWatchToView(watch);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsWatchToView(undefined);
    setIsDetailsModalOpen(false);
  };

  return (
    <div>
      <CreateWatchModal
        isOpen={isCreateModalOpen}
        handleClose={closeCreateModal}
      />

      {watchToEdit !== undefined && (
        <EditWatchModal
          isOpen={isEditModalOpen}
          handleClose={closeEditModal}
          watchToEdit={watchToEdit}
        />
      )}

      {watchToDelete !== undefined && (
        <DeleteWatchModal
          isOpen={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          watchToDelete={watchToDelete}
        />
      )}

      {watchToView !== undefined && (
        <WatchDetailsModal
          isOpen={isDetailsModalOpen}
          handleClose={closeDetailsModal}
          watch={watchToView}
        />
      )}

      <WatchesHeader
        showOnlyMyWatches={showOnlyMyWatches}
        toggleShowOnlyMyWatches={toggleShowOnlyMyWatches}
        openCreateModal={openCreateModal}
      />

      <WatchesTable
        isLoading={isLoading}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        totalRows={data?.totalItems ? data.totalItems : 0}
        setCurrentPage={setCurrentPage}
        watches={data?.items}
        openDetailsModal={openDetailsModal}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
    </div>
  );
};

export default WatchesPage;
