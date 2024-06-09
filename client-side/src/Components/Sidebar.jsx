import React from "react";
import logo from "../images/cap.png";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
  useToast,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, path: "/home" },
  { name: "Trending", icon: FiTrendingUp, path: "/trending" },
  { name: "Explore", icon: FiCompass, path: "/explore" },
  { name: "Favourites", icon: FiStar, path: "/favourites" },
  { name: "Settings", icon: FiSettings, path: "/settings" },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Mobile nav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

function SidebarContent({ onClose, ...rest }) {
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out.",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/login");
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to={"/"}>
          <Image src={logo} w={{ base: "20%", md: "40%", lg: "50%" }} />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
      {isAuthenticated && (
        <Box borderTopWidth="1px">
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{ bg: "cyan.400", color: "white" }}
            onClick={handleLogout}
            bg="tomato"
            mt={10}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{ color: "white" }}
              as={FiLogOut}
            />
            Logout
          </Flex>
        </Box>
      )}
    </Box>
  );
}

function NavItem({ icon, children, path, ...rest }) {
  return (
    <Link
      to={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "cyan.400", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}

function MobileNav({ onOpen, ...rest }) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Link to={"/"}>
        <Image src={logo} w={{ base: "20%", md: "40%", lg: "50%" }} />
      </Link>
    </Flex>
  );
}
