/* eslint-disable */

import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

const columnHelper = createColumnHelper();

const productColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    // Уменьшаем ширину первого столбца с ID
    cell: (info) => info.getValue(),
    header: () => (
      <Text
        justifyContent="space-between"
        align="center"
        fontSize={{ sm: '10px', lg: '12px' }}
        color="gray.400"
      >
        ID
      </Text>
    ),
  }),
  columnHelper.accessor('name', { header: 'Название' }),
  columnHelper.accessor('category', { header: 'Категория' }),
  columnHelper.accessor('weight', { header: 'Вес' }),
  columnHelper.accessor('price', { header: 'Стоимость' }),
];

const clientColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    // Уменьшаем ширину первого столбца с ID
    cell: (info) => info.getValue(),
    header: () => (
      <Text
        justifyContent="space-between"
        align="center"
        fontSize={{ sm: '10px', lg: '12px' }}
        color="gray.400"
      >
        ID
      </Text>
    ),
  }),
  columnHelper.accessor('fullName', { header: 'ФИО' }),
  columnHelper.accessor('phone', { header: 'Телефон' }),
  columnHelper.accessor('address', { header: 'Адрес' }),
  columnHelper.accessor('cashback', {
    header: 'Кэшбэк',
    // Центрируем текст в последнем столбце
    cell: (info) => <Text textAlign="center">{info.getValue()}</Text>,
  }),
];

export default function ColumnTable({ productsData, clientsData }) {
  const [tableType, setTableType] = React.useState('products');
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 10;

  const columns = tableType === 'products' ? productColumns : clientColumns;
  const data = tableType === 'products' ? productsData : clientsData;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize={{ sm: '16px', lg: '22px' }}
          fontWeight="700"
          mb="4px"
          lineHeight="100%"
        >
          {tableType === 'products' ? 'Товары' : 'Клиенты'}
        </Text>
        <Menu
          options={[
            { label: 'Товары', action: () => setTableType('products') },
            { label: 'Клиенты', action: () => setTableType('clients') },
          ]}
        />
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="16px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (
                        <Text fontSize="sm" color="gray.500">
                          {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                        </Text>
                      ) : null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {currentData.map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td
                    key={column.id || column.accessorKey}
                    fontSize="sm"
                    fontWeight="700"
                    color={textColor}
                    minW="20px"  // Устанавливаем минимальную ширину
                    borderColor="transparent"
                  >
                    {column.id === 'cashback' ? (
                      <Text textAlign="center">{row[column.accessorKey]}</Text>
                    ) : (
                      row[column.accessorKey]
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Box>
    </Card>
  );
}
