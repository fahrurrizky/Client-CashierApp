import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

const CreateCategory = ({ isOpen, onClose, onCreateSuccess }) => {
  const toast = useToast();
  const [name, setName] = useState("");

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/product/category",
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Category created successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      onCreateSuccess();
    } catch (error) {
      toast({
        title: "Error creating category!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={"rgba(0,0,0, 0.8)"} textColor="white">
          <ModalHeader>Create Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input
                placeholder="Add Category"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleCreateCategory}
              variant={"outline"}
              textColor="white"
              w="100%"
              _hover={{ bgColor: "white", color: "black" }}
            >
              Create
            </Button>
            <Button
              onClick={onClose}
              variant={"outline"}
              textColor="white"
              w="100%"
              _hover={{ bgColor: "white", color: "black" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCategory;
