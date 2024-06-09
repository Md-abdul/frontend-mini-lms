import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { FiInfo, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [progressFilter, setProgressFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setIsLoading(false); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const truncateDescription = (description) => {
    if (!description) return "No description available";
    const words = description.split(" ");
    return words.length > 3 ? words.slice(0, 4).join(" ") + "..." : description;
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (progressFilter ? course.progress === progressFilter : true)
    );
  });

  const boxBg = useColorModeValue("white", "gray.800");

  return (
    <Box w="90%" m="auto" p="4">
      {isLoading ? ( 
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <>
          <Flex
            mb="4"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <InputGroup w="48%" mb="4">
              <InputLeftElement pointerEvents="none" children={<FiSearch />} />
              <Input
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderColor="#42868F"
              />
            </InputGroup>
            <Select
              w="48%"
              mb="4"
              placeholder="Filter by progress"
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              borderColor="#42868F"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </Select>
          </Flex>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {filteredCourses.map((course) => (
              <GridItem key={course.id}>
                <Box
                  p="4"
                  bg={boxBg}
                  boxShadow="md"
                  borderRadius="md"
                  borderTopLeftRadius="3xl"
                  borderBottomRightRadius="3xl"
                  bgGradient="linear(to-b, #4A68A3, #42868F)"
                  color="white"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    {course.title}
                  </Text>
                  <Text fontSize="md" my="2">
                    {truncateDescription(course.Description)}
                  </Text>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt="4"
                  >
                    <Text fontSize="sm" color="white">
                      {course.progress}
                    </Text>
                    <Link to={`/singlecourse/${course.id}`}>
                      <Button
                        variant="outline"
                        colorScheme="white"
                        aria-label="More details"
                        leftIcon={<FiInfo />}
                        size="sm"
                      >
                        More Info
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};
