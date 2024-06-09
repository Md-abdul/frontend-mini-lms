import React from "react";
import { Box, Flex, Image, Button } from "@chakra-ui/react";
import backGroundImg from "../images/Ellipse 35.png";
import childImage from "../images/Frame.png";
import cermonyCap from "../images/cap.png";
import { Link } from "react-router-dom";

export const WelcomePage = () => {
  return (
    <Box
      boxShadow={
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      }
      w={{ base: "90%", md: "60%", lg: "80%" }}
      m="auto"
      height={{ base: "auto", md: "95vh" }}
      display="flex"
      alignItems="center"
      bg={"white"}
      borderRadius={"20px"}
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Left Side Content */}
        <Box width="50%">
          <Image
            src={cermonyCap}
            alt="Logo"
            mb={8}
            m={{ base: "auto", lg: "0" }}
          />
          <Flex
            justifyContent={{ base: "center", lg: "flex-start" }}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Link to={"/login"}>
              <Button
                colorScheme="black"
                aria-label="More details"
                size="lg"
                mr={{ base: 0, md: 4 }}
                mb={{ base: 4, md: 0 }}
                bgGradient="linear(to-b, #ADBBDE, #B6BCCA )" //\\
                color={"black"}
                _hover={{ bg: "cyan.400" }}
              >
                Login as a Student
              </Button>
            </Link>
            <Link to={"/teacherlogin"}>
              <Button
                variant="outline"
                colorScheme="white"
                aria-label="More details"
                size="lg"
                _hover={{ bg: "cyan.400" }}
                mb={{ base: 4, md: 0 }}
              >
                Login as a Teacher
              </Button>
            </Link>
          </Flex>
        </Box>

        {/* Right Side Content */}
        <Box
          position="relative"
          width={{ base: "100%", lg: "70%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={backGroundImg}
            alt="Background"
            width="100%"
            height="auto"
          />
          <Image
            src={childImage}
            alt="Child"
            position="absolute"
            top="50%"
            left="60%"
            transform="translate(-50%, -50%)"
            width={{ base: "60%", md: "70%", lg: "80%" }}
            height="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

