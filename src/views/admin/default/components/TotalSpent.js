// TotalSpent.js

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';

// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useState, useMemo, useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";

// Total Spent Default Data and Options

export const lineChartDataTotalSpent = [
  {
    name: "Revenue",
    data: [50, 64, 48, 66, 49, 68],
  },
  {
    name: "Profit",
    data: [30, 40, 24, 46, 20, 46],
  },
];

const lineChartCategoriesMonths = ["Октябрь", "Ноябрь", "Декабрь", "Январь", "Февраль", "Март"];
const lineChartCategoriesDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const commonLineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF", "#39B8FF"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    type: "line",
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    column: {
      color: ["#7551FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#39B8FF"],
};

export const getLineChartOptionsTotalSpent = (timePeriod) => {
  let categories;
  switch (timePeriod) {
    case "days":
      categories = lineChartCategoriesDays;
      break;
    default:
      categories = lineChartCategoriesMonths;
  }

  return {
    ...commonLineChartOptions,
    xaxis: {
      type: "category",
      categories: categories,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "11px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };
};

export default function TotalSpent(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [totalSpentTimePeriod, setTotalSpentTimePeriod] = useState("months");

  // Memoize lineChartOptions
  const lineChartOptions = useMemo(() => {
      return getLineChartOptionsTotalSpent(totalSpentTimePeriod);
  }, [totalSpentTimePeriod]);


  const handleTotalSpentTimePeriodChange = (newTimePeriod) => {
      setTotalSpentTimePeriod(newTimePeriod);
  };

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          {/* Заменяем две кнопки на выпадающий список */}
          <Menu>
            <MenuButton
              as={Button}
              bg={boxBg}
              fontSize='sm'
              fontWeight='500'
              color={textColorSecondary}
              borderRadius='7px'
              rightIcon={<ChevronDownIcon />}
            >
              <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
              {/* Отображаем выбранный период */}
              {totalSpentTimePeriod === "months"
                ? "За полгода"
                : "За неделю"}
            </MenuButton>
            <MenuList minW='150px'>
              <MenuItem onClick={() => handleTotalSpentTimePeriodChange("months")}>
                За полгода
              </MenuItem>
              <MenuItem onClick={() => handleTotalSpentTimePeriodChange("days")}>
                За неделю
              </MenuItem>
            </MenuList>
          </Menu>

        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            $642.39
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Полная стоимость
            </Text>
          </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          <LineChart
            key={totalSpentTimePeriod} // Добавляем key
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptions}
          />
        </Box>
      </Flex>
    </Card>
  );
}