import { useCallback } from "react";
import type { AxiosInstance } from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { Watch } from "main/routes/WatchesPage/interfaces";
import type {
  GetAllWatchesResponse,
  AllWatches,
  WatchResponse,
} from "main/services/WatchService/interfaces";

import { watchService } from "main/services/WatchService/WatchService";
import {
  transformWatchResponse,
  transformAllWatchesResponse,
} from "main/services/WatchService/utils";

export const useGetAllWatchesQuery = (
  axiosInstance: AxiosInstance,
  take: number,
  skip: number,
  onlyMyWatches: boolean
): UseQueryResult<AllWatches, unknown> => {
  return useQuery({
    queryKey: ["watches", axiosInstance, take, skip, onlyMyWatches],
    queryFn: async () => {
      return watchService.getAllWatches(
        axiosInstance,
        take,
        skip,
        onlyMyWatches
      );
    },
    select: useCallback((watchesData: GetAllWatchesResponse) => {
      return transformAllWatchesResponse(watchesData);
    }, []),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const useGetWatchQuery = (
  axiosInstance: AxiosInstance,
  watchId: string
): UseQueryResult<Watch, unknown> => {
  return useQuery({
    queryKey: ["watches", axiosInstance, watchId],
    queryFn: async () => {
      return watchService.getWatch(axiosInstance, watchId);
    },
    select: useCallback((watchesData: WatchResponse) => {
      return transformWatchResponse(watchesData);
    }, []),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
