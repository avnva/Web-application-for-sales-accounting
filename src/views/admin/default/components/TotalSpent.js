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
import { ChevronDownIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js";
import React, { useState, useMemo, useEffect } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import ReactApexChart from "react-apexcharts";

// Общие стили для графика
const commonChartOptions = {
  chart: { toolbar: { show: false } },
  stroke: { curve: "smooth", type: "line" },
  colors: ["#4318FF", "#39B8FF"],
  markers: {
    size: 4,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
  },
  tooltip: { theme: "dark" },
  dataLabels: { enabled: false },
  grid: { show: false },
};

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='line'
        width='100%'
        height='100%'
      />
    );
  }
}

export default function TotalSpent({ tableDataTotalSpent, ...rest }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [totalSpentTimePeriod, setTotalSpentTimePeriod] = useState("months");
  const [revenue, setRevenue] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    if (tableDataTotalSpent) {
      if (totalSpentTimePeriod === "months") {
        setRevenue(tableDataTotalSpent.halfYear.revenue); 
        setLineChartData(tableDataTotalSpent.halfYear.lineChartData);
      } else {
        setRevenue(tableDataTotalSpent.week.revenue); 
        setLineChartData(tableDataTotalSpent.week.lineChartData);
      }
    }
  }, [tableDataTotalSpent, totalSpentTimePeriod]);

  const chartOptions = useMemo(() => {
    return {
      ...commonChartOptions,
      xaxis: {
        type: "category",
        categories: totalSpentTimePeriod === "months"
          ? ["Октябрь", "Ноябрь", "Декабрь", "Январь", "Февраль", "Март"]
          : ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "11px",
            fontWeight: "500",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
    };
  }, [totalSpentTimePeriod]);

  if (!lineChartData || lineChartData.length === 0) {
    return null;
  }

  return (
    <Card justifyContent="center" align="center" direction="column" w="100%" mb="0px" {...rest}>
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Menu>
            <MenuButton as={Button} bg={boxBg} fontSize="sm" fontWeight="500" color={textColorSecondary} borderRadius="7px" rightIcon={<ChevronDownIcon />} >
              <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me="4px" />
              {totalSpentTimePeriod === "months" ? "За полгода" : "За неделю"}
            </MenuButton>
            <MenuList minW="150px">
              <MenuItem onClick={() => setTotalSpentTimePeriod("months")}>За полгода</MenuItem>
              <MenuItem onClick={() => setTotalSpentTimePeriod("days")}>За неделю</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection="column" me="20px" mt="28px">
          <Text color={textColor} fontSize="34px" textAlign="start" fontWeight="700" lineHeight="100%">
            {revenue}
          </Text>
          <Flex align="center" mb="20px">
            <Text color="secondaryGray.600" fontSize="sm" fontWeight="500" mt="4px" me="12px">
              Полная выручка, тыс.₽
            </Text>
          </Flex>
        </Flex>
        <Box minH="260px" minW="75%" mt="auto">
          <LineChart key={JSON.stringify(lineChartData)} chartData={lineChartData} chartOptions={chartOptions} />
        </Box>
      </Flex>
    </Card>
  );
}
