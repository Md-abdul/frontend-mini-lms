import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  Heading,
  Select,
  useColorModeValue,
  useToast,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

export const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProgress, setNewProgress] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setNewProgress(data.progress);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleProgressChange = (e) => {
    setNewProgress(e.target.value);
  };

  const handleSave = () => {
    fetch(`http://localhost:8080/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...course, progress: newProgress }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setIsEditing(false);
        toast({
          title: "Progress updated.",
          description: `The progress has been updated to ${newProgress}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleConfirmUpdate = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmYes = () => {
    setIsConfirmationOpen(false);
    setIsEditing(true); // Enable editing only after confirmation
  };

  const handleConfirmNo = () => {
    setIsConfirmationOpen(false);
  };

  const boxBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      w={{ base: "90%", md: "60%", lg: "40%" }}
      m="auto"
      p="4"
      bgGradient="linear(to-b, #4A68A3, #42868F )"
      boxShadow="md"
      borderRadius="md"
      mt="10"
      borderTopLeftRadius="3xl"
      borderBottomRightRadius="3xl"
      color={"white"}
    >
      {!course ? (
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      ) : (
        <>
          <Heading as="h1" size="xl" mb="4">
            {course.title}
          </Heading>
          <Text fontSize="lg" mb="4">
            {course.Description}
          </Text>
          <Text fontSize="md" mb="2">
            <strong>Lessons:</strong> {course.lessons}
          </Text>
          <Box mb="4">
            <Heading as="h2" size="md" mb="2" textAlign={"left"}>
              Materials:
            </Heading>
            <List spacing={2} styleType="disc" pl="4" textAlign={"left"}>
              {course.materials.map((material, index) => (
                <ListItem key={index}>
                  <Text>{material}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
          <Flex justifyContent="space-between" alignItems="center" mt="10">
            <Flex alignItems="center">
              <Text fontSize="md" mr="2">
                <strong>Progress:</strong>
              </Text>
              {!isEditing ? (
                <Text fontSize="md">{course.progress}</Text>
              ) : (
                <Select
                  value={newProgress}
                  onChange={handleProgressChange}
                  size="sm"
                  w="auto"
                  mr="2"
                  bg="#0A5F6F"
                  color="white"
                >
                  <option
                    style={{ backgroundColor: "#0A5F6F", color: "white" }}
                    value="pending"
                  >
                    Pending
                  </option>
                  <option
                    style={{ backgroundColor: "#0A5F6F", color: "white" }}
                    value="in-progress"
                  >
                    In-progress
                  </option>
                  <option
                    style={{ backgroundColor: "#0A5F6F", color: "white" }}
                    value="completed"
                  >
                    Completed
                  </option>
                </Select>
              )}
            </Flex>
            <Button
              variant="outline"
              colorScheme="white"
              aria-label="More details"
              leftIcon={<FiEdit />}
              size="sm"
              onClick={() => {
                if (!isEditing) {
                  handleConfirmUpdate();
                } else {
                  handleSave();
                }
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </Flex>
          <AlertDialog
            isOpen={isConfirmationOpen}
            leastDestructiveRef={undefined}
            onClose={handleConfirmNo}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Update Progress
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to update the progress?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={undefined} onClick={handleConfirmNo}>
                    No
                  </Button>
                  <Button colorScheme="red" onClick={handleConfirmYes} ml={3}>
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </Box>
  );
};
