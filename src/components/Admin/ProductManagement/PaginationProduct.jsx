import React, { ReactNode, useState, useEffect } from 'react';
import { Container, Flex, FlexProps, Text, useColorModeValue } from '@chakra-ui/react';

const PaginationContainer = ({currentPage, setCurrentPage, selectedProduct}) => {
  return (
    <Container
      d="flex"
      maxWidth="7xl"
      w="full"
      alignItems="center"
    >
      <Pagination
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        howNext={selectedProduct && selectedProduct.length > 0}
      />
    </Container>
  );
};

const Pagination = ({ currentPage, onPageChange, showNext }) => {
  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
      {[1, 2, 3, 4, 5,6,7,8,9].map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          isActive={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={!showNext}
      >
        Next
      </PaginationButton>
    </Flex>
  );
};

const PaginationButton = ({ children, isDisabled, isActive, ...props }) => {
  const activeStyle = {
    bg: useColorModeValue('gray.300', 'gray.700')
  };

  return (
    <Flex
      p={3}
      px={4}
      fontSize="md"
      fontWeight="500"
      lineHeight={0.8}
      opacity={isDisabled && 0.7}
      _hover={!isDisabled && activeStyle}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      border="1px solid"
      mr="-1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default PaginationContainer;
