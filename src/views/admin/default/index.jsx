import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdShoppingBasket,
  MdCurrencyRuble,
  MdPeopleAlt,
  MdFormatListBulleted,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [statistics, setStatistics] = useState({
    products: 0,
    clients: 0,
    orders: 0,
    revenue: 0,
  });
  const [tableDataPie, setTableDataPie] = useState([]);
  const [tableDataCheckProducts, setTableDataCheckProducts] = useState([]);
  const [tableDataCheckClients, setTableDataCheckClients] = useState([]);
  const [tableDataComplex, setTableDataComplex] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await fetch("/data/statistics.json");
        const stats = await statsResponse.json();
        setStatistics(stats);

        const pieResponse = await fetch("/data/tableDataPie.json");
        setTableDataPie(await pieResponse.json());

        const productsResponse = await fetch("/data/tableDataCheckProducts.json");
        setTableDataCheckProducts(await productsResponse.json());

        const clientsResponse = await fetch("/data/tableDataCheckClients.json");
        setTableDataCheckClients(await clientsResponse.json());

        const complexResponse = await fetch("/data/tableDataComplex.json");
        setTableDataComplex(await complexResponse.json());
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box pt={{ base: "200px", md: "100px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdShoppingBasket} color={brandColor} />} />}
          name="Товары"
          value={statistics.products}
        />
        <MiniStatistics
          startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdPeopleAlt} color={brandColor} />} />}
          name="Покупатели"
          value={statistics.clients}
        />
        <MiniStatistics
          startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdFormatListBulleted} color={brandColor} />} />}
          name="Заказы"
          value={statistics.orders}
        />
        <MiniStatistics
          startContent={<IconBox w="56px" h="56px" bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)" icon={<Icon w="28px" h="28px" as={MdCurrencyRuble} color="white" />} />}
          name="Выручка"
          value={`₽${statistics.revenue}`}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
        <TotalSpent gridColumn={{ base: "span 1", md: "span 2", lg: "span 3" }} />
        <PieCard gridColumn={{ base: "span 1", md: "span 2", lg: "span 1" }} pieData={tableDataPie} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable tableData={tableDataComplex} />
        <CheckTable topProductsData={tableDataCheckProducts} topClientsData={tableDataCheckClients} />
      </SimpleGrid>
    </Box>
  );
}