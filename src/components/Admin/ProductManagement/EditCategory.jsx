import React, { useState, useEffect } from "react";
import {
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { ImEnter, ImExit } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";

function EditCategory({ isOpen, onClose, onEditSuccess, onCreateSuccess }) {
  const [categories, setCategories] = useState([]);
  const [inputValues, setInputValues] = useState({});
  // const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8000/product/categories"
        );
        setCategories(response.data.result);
        setInputValues(
          response.data.result.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
          }, {})
          );
        onCreateSuccess();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleEdit = async ({ id }) => {
    const newName = inputValues[id];
    try {
      await axios.put(`http://localhost:8000/product/category/${id}`, {
        name: newName,
      });
      toast({
        title: "Category Edited",
        description: `Category "${newName}" has been successfully edited.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onEditSuccess();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const onChange = (e, id) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: e.target.value,
    }));
  };

  const handleDeleteCategory = async ({ id }) => {
    try {
      await axios.delete(`http://localhost:8000/product/category/${id}`);
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
      toast({
        title: "Category delete",
        description: "Successfully delete category.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onEditSuccess();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"rgba(0,0,0, 0.8)"} textColor="white">
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex mb={"5"}>
              <FormControl>
                {categories.map((item) => (
                  <Flex mb={"2"} key={item.id}>
                    <Input
                      size={"sm"}
                      value={inputValues[item.id] || ""}
                      onChange={(e) => onChange(e, item.id)}
                      name="name"
                      id={`name-${item.id}`}
                    />
                    <ButtonGroup>
                      <IconButton
                        ml={"3"}
                        icon={<ImEnter />}
                        onClick={() => handleEdit(item)}
                        variant={"outline"}
                        size={"sm"}
                        textColor="white"
                        w="100%"
                        _hover={{ bgColor: "green", color: "white" }}
                      />
                      <IconButton
                        icon={<ImExit />}
                        onClick={onClose}
                        variant={"outline"}
                        size={"sm"}
                        textColor="white"
                        w="100%"
                        _hover={{ bgColor: "blue", color: "white" }}
                      />
                      <IconButton
                        icon={<RiDeleteBin5Fill />}
                        onClick={() => handleDeleteCategory(item)}
                        variant={"outline"}
                        size={"sm"}
                        textColor="white"
                        w="100%"
                        _hover={{ bgColor: "red", color: "white" }}
                      />
                    </ButtonGroup>
                  </Flex>
                ))}
              </FormControl>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditCategory;
