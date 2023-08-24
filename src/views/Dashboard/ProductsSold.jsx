import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, VStack, Text } from '@chakra-ui/react';

const ProductsSold = ({ transactionId, productsSold, selectedTransactionDate }) => {
  // Filter the productsSold based on the selectedTransactionDate
  const filteredProducts = productsSold.filter(
    (product) => product.transactionDate === selectedTransactionDate
  );

  return (
    <VStack align="flex-start" >
      <Text fontSize="lg" fontWeight="bold" alignSelf={'center'}>
        Products Sold for Transaction: {transactionId}
      </Text>
      <Table variant="simple" color={'white'}>
        <Thead>
          <Tr bg={'white'}>
            <Th color={'black'} textAlign={"center"}>Product ID</Th>
            <Th color={'black'}>Product Name</Th>
            <Th color={'black'} textAlign={"center"}>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredProducts.map((product, index) => (
            <Tr key={index}>
              <Td textAlign={"center"}>{product.productId}</Td>
              <Td>{product.Product.name}</Td>
              <Td textAlign={"center"}>{product.totalQuantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ProductsSold;