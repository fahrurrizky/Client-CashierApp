import {
  Stack,
  HStack,
  Link,
  Image,
  IconButton,
  LinkProps,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import logo from "../../assets/img/avatars/logoFooter.png";

const links = [
  // "Blog",
  "Made with 🍻 by Andre & Rizky",
  "Careers",
  "Sign up",
  "Terms of use",
  "Privacy policy",
];
const accounts = [
  {
    url: "https://github.com/fahrurrizky",
    label: "Github Account",
    type: "gray",
    icon: <FaGithub />,
  },
  {
    url: "mailto:fahrurrizky022@gmail.com",
    label: "Email Account",
    type: "email",
    icon: <MdAttachEmail />,
  },
  {
    url: "https://www.linkedin.com/in/m-fahrur-rizky-444655220/",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
];

const Footers = () => {
  return (
      <Stack
        maxW="5xl"
        display={'flex'}
        marginInline="auto"
        pt={"8"}
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
        marginTop={'auto'}
      >
        <Image w="20%" src={logo} alt="logo" />
        {/* Desktop Screen */}
        <HStack spacing={4} alignItems="center" d={{ base: "none", md: "flex" }}>
          {links.map((link, index) => (
            <CustomLink key={index}>{link}</CustomLink>
          ))}
        </HStack>
        <Stack direction="row" spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
          {accounts.map((sc, index) => (
            <IconButton
              key={index}
              as={Link}
              isExternal
              href={sc.url}
              aria-label={sc.label}
              icon={sc.icon}
              rounded="md"
            />
          ))}
        </Stack>
      </Stack>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      href="#"
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Footers;
