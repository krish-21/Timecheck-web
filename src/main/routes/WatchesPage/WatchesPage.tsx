import { useContext, useState } from "react";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";
import { useGetAllWatchesQuery } from "main/services/WatchService/queries";
import WatchesTable from "./WatchesTable/WatchesTable";

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

  return (
    <div>
      <h1>Watches</h1>
      <WatchesTable
        isLoading={isLoading}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        totalRows={data?.totalItems}
        setCurrentPage={setCurrentPage}
        watches={data?.items}
      />
    </div>
  );
};

export default WatchesPage;
