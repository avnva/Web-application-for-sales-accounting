import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

export default function UserReports() {

  const [tableDataComplex, setTableDataComplex] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch("/data/tableDataProducts.json");
        setProductsData(await productsResponse.json());

        const clientsResponse = await fetch("/data/tableDataClients.json");
        setClientsData(await clientsResponse.json());

        const complexResponse = await fetch("/data/tableDataComplex.json");
        setTableDataComplex(await complexResponse.json());
        console.log("Received productsData:", productsData);

      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <ComplexTable tableData={tableDataComplex} />
        <ColumnsTable productsData={productsData} clientsData={clientsData} />
      </SimpleGrid>
    </Box>
  );

}
