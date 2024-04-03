"use client";
import { Button, IconButton, Skeleton, Table } from "@radix-ui/themes";
import { DownloadIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { del, list } from "@vercel/blob";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface IProps {
  blobList: any;
  setBlobList: (blob: any) => void;
  fetchBlobList: boolean;
}

const TableComponent = ({ blobList, setBlobList, fetchBlobList }: IProps) => {
  const [blobListLoading, setBlobListLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<{
    id: number;
    loading: boolean;
  }>({ id: -1, loading: false });
  const tableHeaders = [
    { id: 1, header: "Blob" },
    { id: 2, header: "Uploaded Date" },
    { id: 3, header: "Actions" },
  ];

  const getFileList = async () => {
    setBlobListLoading(true);
    const { blobs } = await list({
      token: "vercel_blob_rw_jhsn4Jo9S1FYfPvB_1KbCI1CF2tsoCEL6O4S3AArxjM0D8L",
    });
    setBlobList(blobs);
    setBlobListLoading(false);
  };

  const deleteBlob = async (url: string, id: number) => {
    setDeleteLoading({ id: id, loading: true });
    await del(url, {
      token: "vercel_blob_rw_jhsn4Jo9S1FYfPvB_1KbCI1CF2tsoCEL6O4S3AArxjM0D8L",
    });
    getFileList();
    setDeleteLoading({ id: id, loading: false });
  };

  useEffect(() => {
    getFileList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBlobList]);
  console.log("yee blobo", blobList);

  return (
    <div className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row className="w-full">
            {tableHeaders.map((item) => (
              <Table.ColumnHeaderCell key={item.id}>
                {item.header}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {blobListLoading ? (
            [1, 2, 3].map((id) => (
              <Table.Row className="w-full" key={id}>
                <Table.RowHeaderCell className="truncate">
                  <Skeleton loading height="20px" />
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Skeleton loading height="20px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton loading height="20px" />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <>
              {blobList?.map((list: any, id: number) => (
                <Table.Row key={id} className="w-full">
                  <Table.RowHeaderCell className="truncate">
                    {list.pathname}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {dayjs(list.uploadedAt).format("DD MMM YYYY hh:mm A")}
                  </Table.Cell>
                  <Table.Cell className="flex flex-row gap-3 h-full items-center">
                    <IconButton className="cursor-pointer">
                      <Pencil2Icon />
                    </IconButton>
                    <IconButton
                      onClick={() => window.open(list.downloadUrl, "_blank")}
                      className="cursor-pointer"
                    >
                      <DownloadIcon />
                    </IconButton>
                    <Button
                      onClick={() => deleteBlob(list.url, id)}
                      loading={
                        deleteLoading.id === id ? deleteLoading.loading : false
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TableComponent;
