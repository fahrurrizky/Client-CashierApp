import { Fragment, useRef } from 'react';
import { Container, Text, Stack, Avatar, Icon, Image, Box, Input, Button, Flex, useToast } from '@chakra-ui/react';
// Here we have used react-icons package for the icon
import { ImQuotesLeft } from 'react-icons/im';
import MyBranch from "../../DashboardAdmin/MyBranch"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({onCreatedSuccess}) => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [cashiers, setCashiers] = useState([]);

  const fetchCashiers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('http://localhost:8000/auth/cashier/profile', config);
      setCashiers(response.data);
      console.log(response.data);
      onCreatedSuccess()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  const handleImageUpload = async () => {
    try {
      const file = fileInputRef.current.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('imgProfile', file);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post('http://localhost:8000/profile/picture', formData, config);
      toast({
        title: 'Success',
        description: 'Cashier fetched successfully.',
        status: 'success',
        duration: 2000,
      })
      console.log("Success");
      fetchCashiers();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 2000,
      })
      console.log(error);
    }
  };

  return (
    <Box>
      <Container maxW="5xl" p={{ base: 5, md: 8 }}>
          <Fragment >
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              bgGradient="linear(to-br, rgba(66, 225, 78, 0.9), rgba(0, 0, 255, 0.5))"
              spacing={{ base: 0, sm: 10 }}
              p={{ base: 4, sm: 10 }}
              rounded="lg"
              justify="center"
            >
              <Box width="30rem" pos="relative" d={{ base: 'none', sm: 'block' }}>
                <Image
                  size="2xl"
                  pos="absolute"
                  rounded="lg"
                  src={`http://localhost:8000/api/${cashiers.imgProfile}`}
                  top="-3.8rem"
                  boxShadow="lg"
                />
              </Box>
              <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
                <Icon as={ImQuotesLeft} w={10} h={10} color="white" />
                <Text fontSize="lg" fontWeight="medium" fontFamily={'initial'}>
                <i>Learn from a glass of liquor, the sweet and bitter are still enjoyed!. Likewise with life, bright or even gloomy, keep living it. Alcohol is perhaps man's worst enemy. But the Bible says, love your enemies. so do not let the brain sober</i>
                </Text>
                <Stack alignItems={{ base: 'center', sm: 'flex-start' }} spacing={0}>
                  <Avatar
                    size="xl"
                    showBorder={true}
                    borderColor="green.400"
                    name="avatar"
                    src={`http://localhost:8000/api/${cashiers.imgProfile}`}
                    d={{ base: 'block', sm: 'none' }}
                  />
                  <Text fontWeight="bold" fontSize="lg" fontFamily="cursive">
                    {cashiers.username}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="white">
                    <i>
                    {cashiers.role}, The Majestic Mixer
                    </i>
                  </Text>
                  <Flex mt={'1'}>
                    <Button colorScheme="white" size="xs" variant={'outline'} onClick={handleImageUpload} width={'40%'}>
                      <i>Change Avatar</i>
                    </Button>
                    <Input variant={'unstyled'} size={'xs'} type="file" ref={fileInputRef} />
                  </Flex>
                </Stack>
              </Stack>
            </Stack>
          </Fragment>
      </Container>
      <MyBranch/>
    </Box>
  );
};

export default Profile;