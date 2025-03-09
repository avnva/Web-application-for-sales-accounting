// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
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
// import {
//   columnsDataCheck,
//   columnsDataComplex,
// } from "views/admin/default/variables/columnsData";

import tableDataPie from "views/admin/default/variables/tableDataPie.json";
import tableDataCheckProducts from "views/admin/default/variables/tableDataCheckProducts.json";
import tableDataCheckClients from "views/admin/default/variables/tableDataCheckClients.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "200px", md: "100px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdShoppingBasket} color={brandColor} />
              }
            />
          }
          name='Товары'
          value='5'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdPeopleAlt} color={brandColor} />
              }
            />
          }
          name='Покупатели'
          value='10'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFormatListBulleted} color={brandColor} />
              }
            />
          }
          name='Заказы'
          value='2'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdCurrencyRuble} color='white' />}
            />
          }
          name='Выручка'
          value='$642.39'
        />
      </SimpleGrid>


      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap='20px' mb='20px'>
        <TotalSpent gridColumn={{ base: 'span 1', md: 'span 2', lg: 'span 3' }} />
        <PieCard 
          gridColumn={{ base: 'span 1', md: 'span 2', lg: 'span 1' }} 
          pieData={tableDataPie} 
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable 
          // columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <CheckTable  // This is now the TopLists component
          topProductsData={tableDataCheckProducts}
          topClientsData={tableDataCheckClients}
        />
      </SimpleGrid>
    </Box>
  );
}