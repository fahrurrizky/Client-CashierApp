import { useDisclosure, Button, Link, Input, Spacer, Flex, Switch, Heading, Text, Stack, Avatar, Divider, Icon, Box, Image } from '@chakra-ui/react';
import { ImQuotesLeft } from 'react-icons/im';
import { BiAddToQueue, BiEdit } from 'react-icons/bi';
import CreateCashier from './CreateCashier';
import EditCashier from './EditCashier';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CashierList = () => {
  const { isOpen: isCreateCashierOpen, onOpen: onCreateCashierOpen, onClose: onCreateCashierClose } = useDisclosure();
  const { isOpen: isEditCashierOpen, onOpen: onEditCashierOpen, onClose: onEditCashierClose } = useDisclosure();
  const [cashiers, setCashiers] = useState([]);
  const [selectedCashier, setSelectedCashier] = useState(null);

  const handleEditCashier = (cashier) => {
    setSelectedCashier(cashier);
    onEditCashierOpen();
  };

  const handleUpdateCashiers = async () => {
    try {
      // Make a PATCH request to update the selected cashier data
      await axios.patch(`http://localhost:8000/auth/cashier/${selectedCashier.id}`, {
        currentUsername: selectedCashier.username,
        currentEmail: selectedCashier.email,
        newUsername: selectedCashier.newUsername,
        newEmail: selectedCashier.newEmail,
      });

      // After successfully updating cashier data, close the modal
      onEditCashierClose();

      // Fetch the updated list of cashiers from the server and update the state
      const response = await axios.get('http://localhost:8000/auth/cashier');
      setCashiers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCashiers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/cashier');
      setCashiers(response.data);
      onCreateCashierClose()
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deactiveCashier = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/auth/cashier/deactivate?id=${id}`
      );
      alert(res.data.message);
      fetchCashiers();
    } catch (err) {
      alert(err);
    }
  };

  const activeCashier = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/auth/cashier/activate?id=${id}`
      );
      alert(res.data.message);
      fetchCashiers();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  const handleEditCashierSuccess = () => {
    fetchCashiers(); 
    onEditCashierClose(); 
  };

  const handleCreateCashierSuccess = () => {
    onCreateCashierClose(); 
    fetchCashiers();
  };

  return (
    <Box maxW="10xl" px={{ base: 5, md: 20 }}>
      <Heading fontWeight={'thin'}>Cashier list</Heading>
      <Divider my={6} />
      {cashiers.map((obj, index) => (
        <Box key={index}>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={10} pt={1} justify="center">
            <Avatar
              size="2xl"
              shadow={'dark-lg'}
              alignSelf={'center'}
              showBorder={true}
              borderColor="white.400"
              name="avatar"
              src={`http://localhost:8000/api/${obj.imgProfile}`}
              d={{ base: 'none', sm: 'block' }}
            />
            <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
              <Icon as={ImQuotesLeft} w={8} h={8} color="white" />
              <Text fontSize="md" fontWeight="medium">
                <i>
                  Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget
                  id, aliquam eget nibh et. Maecen aliquam, risus at semper
                </i>
              </Text>
              <Stack alignItems={{ base: 'center', sm: 'flex-start' }} spacing={0}>
                <Text fontWeight="bold" fontSize="lg" fontFamily={'cursive'}>
                  {obj.username}
                </Text>
                <Text fontWeight="medium" fontSize="sm">
                  {obj.email}
                </Text>
                <Text fontWeight="medium" fontSize="sm" color="white">
                  <i>{obj.role}, The Majestic Mixer</i>
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Flex mt={'2'}>
            <Spacer />
            <Switch  colorScheme={obj.isActive ? 'green' : 'gray'} isChecked={obj.isActive} ml={'2'} alignSelf={'center'} onChange={() => {
              if(obj.isActive){
                deactiveCashier(obj.id)
              } else {
                activeCashier(obj.id)
              }
            }} />
            <Button variant={'link'} onClick={() => handleEditCashier(obj)}>
              <BiEdit color="white" size={'23'} />
            </Button>
          </Flex>
          {cashiers.length - 1 !== index && <Divider my={5} />}
        </Box>
      ))}
      <Link>
        <Button position={'fixed'} zIndex={1} bottom={5} right={5} p={6} justifyContent={'center'} alignItems={'center'} rounded={'full'} bgColor={'rgba(255,255,255, 0.7)'}>
          <BiAddToQueue size={'30px'} onClick={onCreateCashierOpen} />
        </Button>
        <CreateCashier isOpen={isCreateCashierOpen} onClose={onCreateCashierClose} onCreateSuccess={handleCreateCashierSuccess} onUpdate={fetchCashiers} />
      </Link>

      {/* Render the EditCashier modal here */}
      {selectedCashier && (
        <EditCashier isOpen={isEditCashierOpen} onClose={onEditCashierClose} cashier={selectedCashier} onUpdate={handleUpdateCashiers} onEditSuccess={handleEditCashierSuccess} />
      )}
    </Box>
  );
};

export default CashierList;
