import { useCallback } from "react";
import type { AxiosInstance } from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type {
  GetAllWatchesResponse,
  AllWatches,
} from "main/services/WatchService/interfaces";
import { watchService } from "main/services/WatchService/WatchService";
import { transformAllWatchesResponse } from "main/services/WatchService/utils";

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
