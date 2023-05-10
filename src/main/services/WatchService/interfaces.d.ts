import type { AxiosInstance } from "axios";

import type { Watch } from "main/routes/WatchesPage/interfaces";

export interface WatchResponse {
  id: string;
  name: string;
  brand: string;
  reference: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface GetAllWatchesResponse {
  items: WatchResponse[];
  totalItems: number;
  take: number;
  skip: number;
}

export interface AllWatches {
  items: Watch[];
  totalItems: number;
  take: number;
  skip: number;
}

export interface CreateWatchMutationData {
  axiosInstance: AxiosInstance;
  name: string;
  brand: string;
  reference: string;
}

export interface EditWatchMutationData {
  axiosInstance: AxiosInstance;
  watchId: string;
  name: string;
  brand: string;
  reference: string;
}

export interface DeleteWatchMutationData {
  axiosInstance: AxiosInstance;
  watchId: string;
}
