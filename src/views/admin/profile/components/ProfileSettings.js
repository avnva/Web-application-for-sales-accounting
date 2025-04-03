import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useState } from "react";

export default function ProfileSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState({
    firstName: "Иван",
    lastName: "Петров",
    email: "ivan.petrov@example.com",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Profile updated:", profile);
    onClose();
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
      <VStack spacing={4} align="stretch">
        <Heading size="md"></Heading>
        <Text><b>Имя:</b> {profile.firstName}</Text>
        <Text><b>Фамилия:</b> {profile.lastName}</Text>
        <Text><b>Email:</b> {profile.email}</Text>
        <Button colorScheme="blue" onClick={onOpen}>Редактировать профиль</Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактирование профиля</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input name="firstName" value={profile.firstName} onChange={handleChange} placeholder="Введите имя" />
              </FormControl>

              <FormControl>
                <FormLabel>Фамилия</FormLabel>
                <Input name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Введите фамилию" />
              </FormControl>

              <FormControl>
                <FormLabel>Логин (Email)</FormLabel>
                <Input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Введите email" />
              </FormControl>

              <FormControl>
                <FormLabel>Старый пароль</FormLabel>
                <Input type="password" name="oldPassword" value={profile.oldPassword} onChange={handleChange} placeholder="Введите старый пароль" />
              </FormControl>

              <FormControl>
                <FormLabel>Новый пароль</FormLabel>
                <Input type="password" name="newPassword" value={profile.newPassword} onChange={handleChange} placeholder="Введите новый пароль" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>Сохранить</Button>
            <Button onClick={onClose} ml={3}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
