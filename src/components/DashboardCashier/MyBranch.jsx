import { SVGProps } from 'react';
import {
  Container,
  Box,
  chakra,
  Image,
  Avatar,
  Text,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';


const features: IFeature[] = [
  {
    heading: 'Surabaya',
    image: 'https://images.unsplash.com/photo-1491333078588-55b6733c7de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    content: 'Jl. Dharmahusada Indah Timur No.35-37, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115'
  },
  {
    heading: 'Bali',
    image: 'https://images.unsplash.com/photo-1517638851339-a711cfcf3279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    content: 'Jl. Batu Belig No.11b, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80361'
  },
  {
    heading: 'Yogyakarta',
    image: 'https://images.unsplash.com/photo-1494346480775-936a9f0d0877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1716&q=80',
    content: 'Jl. Ipda Tut Harsono, Muja Muju, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55165'
  },
];

const MyBranch = () => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={6} textAlign="center" fontFamily={'cursive'}>
      This is a branch of &nbsp;&nbsp;<u>"The Majestic Mixer"</u>&nbsp; outlet
      </chakra.h3>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} placeItems="center" spacing={10} mb={4}>
        {features.map((feature, index) => (
          <Box
            key={index}
            bg={"rgba(0,0,0, 0.5)"}
            p={6}
            rounded="lg"
            textAlign="center"
            pos="relative"
          > 
            <Box >
                <Image src={feature.image} />
            </Box>
            <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6} fontFamily={'cursive'}>
              {feature.heading}
            </chakra.h3>
            <Text fontSize="md" mt={4}>
              {feature.content}
            </Text>
            <Link href="https://www.missionliquor.com/" target='blank' mt={4} fontSize="sm" color="blue.400">
              Read more →
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default MyBranch;