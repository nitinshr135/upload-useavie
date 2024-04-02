"use client";
import { Table } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";

const TableComponent = () => {
  const tableHeaders = [
    { id: 1, header: "Blob" },
    { id: 2, header: "Content Type" },
    { id: 3, header: "Size" },
    { id: 4, header: "Actions" },
  ];
  return (
    <div className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {tableHeaders.map((item) => (
              <Table.ColumnHeaderCell key={item.id}>
                {item.header}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>
              <Pencil2Icon />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>

            <Table.Cell>Admin</Table.Cell>
            <Table.Cell>
              <Pencil2Icon />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>
              <Pencil2Icon />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TableComponent;
