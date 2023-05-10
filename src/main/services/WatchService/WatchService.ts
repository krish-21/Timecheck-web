import type { AxiosInstance } from "axios";

import type {
  GetAllWatchesResponse,
  WatchResponse,
} from "main/services/WatchService/interfaces";

class WatchService {
  private static classInstance?: WatchService;

  public static getInstance(): WatchService {
    if (this.classInstance === undefined) {
      this.classInstance = new WatchService();
    }
    return this.classInstance;
  }

  public async getAllWatches(
    axiosInstance: AxiosInstance,
    take: number,
    skip: number,
    onlyMyWatches: boolean
  ): Promise<GetAllWatchesResponse> {
    const { data } = await axiosInstance.get<GetAllWatchesResponse>(
      "/watches",
      {
        params: { take, skip, onlyMyWatches },
      }
    );
    return data;
  }

  public async createWatch(
    axiosInstance: AxiosInstance,
    name: string,
    brand: string,
    reference: string
  ): Promise<WatchResponse> {
    const { data } = await axiosInstance.post<WatchResponse>("/watches", {
      name,
      brand,
      reference,
    });
    return data;
  }

  public async editWatch(
    axiosInstance: AxiosInstance,
    watchId: string,
    name: string,
    brand: string,
    reference: string
  ): Promise<WatchResponse> {
    const { data } = await axiosInstance.patch<WatchResponse>(
      `/watches/${watchId}`,
      {
        name,
        brand,
        reference,
      }
    );
    return data;
  }

  public async deleteWatch(
    axiosInstance: AxiosInstance,
    watchId: string
  ): Promise<WatchResponse> {
    const { data } = await axiosInstance.delete<WatchResponse>(
      `/watches/${watchId}`
    );
    return data;
  }
}

export const watchService = WatchService.getInstance();
