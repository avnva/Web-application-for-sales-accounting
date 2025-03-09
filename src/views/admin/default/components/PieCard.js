// Chakra imports
import { Box, Flex, Text, List, ListItem, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";
import React from "react";

export default function PieCard({ pieData, ...rest }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Если данных нет, показываем заглушку
  if (!pieData || pieData.length === 0) {
    return (
      <Card p="20px" align="center" direction="column" w="100%" {...rest}>
        <Text color={textColor} fontSize="md" fontWeight="600">
          Нет данных для отображения
        </Text>
      </Card>
    );
  }

  // Данные для PieChart
  const pieChartData = pieData.map((category) => category.percentage);

  return (
    <Card p="20px" align="left" direction="column" w="100%" {...rest}>
      <Flex px={{ base: "0px", "2xl": "10px" }} justifyContent="space-between" alignItems="left" w="100%" mb="8px">
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Популярные категории
        </Text>
      </Flex>

      {/* Круговая диаграмма */}
      <PieChart h="100%" w="100%" chartData={pieChartData} chartOptions={pieChartOptions} />

      {/* Категории в виде списка */}
      <List spacing={3} mt="15px">
        {pieData.map((category, index) => (
          <ListItem key={index} pl="10px">
            <Flex align="center">
              <Box h="8px" w="8px" bg={category.color} borderRadius="50%" me="4px" />
              <Text fontSize="sm" color="secondaryGray.600" fontWeight="700" mr="15px">
                {category.name}
              </Text>
              <Text fontSize="md" color={textColor} fontWeight="700">
                {category.percentage}%
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
