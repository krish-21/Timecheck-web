import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  CreateWatchMutationData,
  EditWatchMutationData,
  DeleteWatchMutationData,
} from "main/services/WatchService/interfaces";
import type { Watch } from "main/routes/WatchesPage/interfaces";

import { transformWatchResponse } from "main/services/WatchService/utils";
import { watchService } from "main/services/WatchService/WatchService";

export const useCreateWatchMutation = (): UseMutationResult<
  Watch,
  unknown,
  CreateWatchMutationData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["watches", "createWatch"],
    mutationFn: async (createWatchData: CreateWatchMutationData) => {
      const createdWatch = await watchService.createWatch(
        createWatchData.axiosInstance,
        createWatchData.name,
        createWatchData.brand,
        createWatchData.reference
      );
      return transformWatchResponse(createdWatch);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["watches"],
      });
    },
  });
};

export const useEditWatchMutation = (): UseMutationResult<
  Watch,
  unknown,
  EditWatchMutationData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["watches", "editWatch"],
    mutationFn: async (editWatchData: EditWatchMutationData) => {
      const editedWatch = await watchService.editWatch(
        editWatchData.axiosInstance,
        editWatchData.watchId,
        editWatchData.name,
        editWatchData.brand,
        editWatchData.reference
      );
      return transformWatchResponse(editedWatch);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["watches"],
      });
    },
  });
};

export const useDeleteWatchMutation = (): UseMutationResult<
  Watch,
  unknown,
  DeleteWatchMutationData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["watches", "deleteWatch"],
    mutationFn: async (deleteWatchData: DeleteWatchMutationData) => {
      const deletedWatch = await watchService.deleteWatch(
        deleteWatchData.axiosInstance,
        deleteWatchData.watchId
      );
      return transformWatchResponse(deletedWatch);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["watches"],
      });
    },
  });
};
