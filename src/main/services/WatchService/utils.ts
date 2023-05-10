import type {
  WatchResponse,
  AllWatches,
  GetAllWatchesResponse,
} from "main/services/WatchService/interfaces";
import type { Watch } from "main/routes/WatchesPage/interfaces";

export const transformWatchResponse = (
  watchResponse: WatchResponse
): Watch => ({
  id: watchResponse.id,
  name: watchResponse.name,
  brand: watchResponse.brand,
  reference: watchResponse.reference,
  userId: watchResponse.userId,
  createdAt: new Date(watchResponse.createdAt),
  updatedAt: new Date(watchResponse.updatedAt),
});

export const transformAllWatchesResponse = (
  allWatchesResponse: GetAllWatchesResponse
): AllWatches => ({
  items: allWatchesResponse.items.map(transformWatchResponse),
  totalItems: allWatchesResponse.totalItems,
  take: allWatchesResponse.take,
  skip: allWatchesResponse.skip,
});
