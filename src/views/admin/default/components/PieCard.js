// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue, List, ListItem } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React from "react";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Данные для графика и категорий
  const categoryData = [
    { name: "Пшеничный", percentage: 63, color: "brand.500" },
    { name: "Ржаной", percentage: 25, color: "#6AD2FF" },
    { name: "Кукурузный", percentage: 8, color: "#A259FF" },
    { name: "Остальное", percentage: 4, color: "gray.400" }, // Добавили категорию "Остальное"
  ];

  // Создаем данные для PieChart
  const pieChartData = categoryData.map((category) => category.percentage);

  return (
    <Card p='20px' align='left' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='left'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Популярные категории
        </Text>
        <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='weekly'>Неделя</option>
          <option value='monthly'>Месяц</option>
          <option value='yearly'>Год</option>
        </Select>
      </Flex>

      <PieChart
        h='100%'
        w='100%'
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />

      {/* Категории в виде списка */}
      <List spacing={3} mt='15px'>
        {categoryData.map((category, index) => (
          <ListItem key={index} pl="10px">
            <Flex align="center">
              <Box h='8px' w='8px' bg={category.color} borderRadius='50%' me='4px' />
              <Text
                fontSize='sm'
                color='secondaryGray.600'
                fontWeight='700'
                mr='15px'
              >
                {category.name}
              </Text>
              <Text fontSize='md' color={textColor} fontWeight='700'>
                {category.percentage}%
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}