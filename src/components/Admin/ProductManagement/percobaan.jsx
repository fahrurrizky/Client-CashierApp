// Chakra imports
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Input,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// // Custom components
import Card from "../../components/Card/Card";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import IconBox from "../../components/Icons/IconBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Custom icons
import { FaUsers, FaStar } from "react-icons/fa";
import {
  CartIcon,
  DocumentIcon,
  WalletIcon,
} from "../../components/Icons/Icons.js";

// Variables
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "../../variables/charts";
import { productBestSaller, bestPerformCashier } from "../../variables/general";

function Rating({ maxStars = 5, ratingValue }) {
  return (
    <Box>
      {[...Array(maxStars)].map((_, index) => (
        <Icon
        key={index}
        as={FaStar}
        color={index < ratingValue ? "yellow.400" : "gray.300"}
        />
        ))}
    </Box>
  );
}

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("white", "white");
  const tableRowColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("white", "white");
  const textTableColor = useColorModeValue("white", "white");

  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection="column" mt={"8"}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">

        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column">
            <Flex align="center" p="22px">
              <Text w={'400px'} fontSize="lg" color={textColor} fontWeight="bold">
                Sales Report
              </Text>
              <Spacer/>
              <Input
                type="date"
                mx={'5'}
                color={'white'}
                bgColor={'whiteAlpha.500'}
                selected={startDate}
                onChange={(date) => setEndDate(date)}
                dateFormat={'yyyy-mm-dd'}
              />
              {/* <Spacer/> */}
              <Input
                type="date"
                bgColor={'whiteAlpha.500'}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat={'yyyy-mm-dd'}
              />
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }} width={"100%"}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color="black" borderColor={borderColor}>
                      Product Name
                    </Th>
                    <Th color="black" borderColor={borderColor}>
                      Category
                    </Th>
                    <Th color="black" borderColor={borderColor} textAlign={"center"}>
                      Daily Total Sales
                    </Th>
                    <Th color="black" borderColor={borderColor} textAlign={"center"}>
                      Price
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productBestSaller.map((el, index, arr) => {
                    return (
                      <Tr key={index}>
                        <Td color={textTableColor} fontSize="sm" fontWeight="bold" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                          {el.productName}
                        </Td>
                        <Td color={textTableColor} fontSize="sm" border={index === arr.length - 1 ? "none" : null} borderColor={borderColor}>
                          {el.categoryProduct}
                        </Td>
                        <Td color={textTableColor} textAlign={"center"} fontSize="sm" border={index === arr.length - 1 ? "none" : null} borderColor={borderColor}>
                          {el.monthlySales}
                        </Td>
                        <Td color={textTableColor} textAlign={"center"} fontSize="sm" border={index === arr.length - 1 ? "none" : null} borderColor={borderColor}>
                          {el.price}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>

        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column">
            <Flex align="center" p="22px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Best Perform Cashier
              </Text>
            </Flex>
          </Flex>

          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color="black" borderColor={borderColor}>
                    Name
                  </Th>
                  <Th color="black" borderColor={borderColor} p={"0"}>
                    Highest Sales
                  </Th>
                  <Th color="black" borderColor={borderColor}>
                    Best Service
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {bestPerformCashier.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td color={textTableColor} fontSize="sm" fontWeight="bold" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        {el.name}
                      </Td>
                      <Td color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        {el.highestSales}
                      </Td>
                      <Td textAlign={"center"} color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        <Rating maxStars={5} ratingValue={parseInt(el.highestSales.replace(/\D/g, "")) / 100} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Card>
      </Grid>
    </Flex>
  );
}
