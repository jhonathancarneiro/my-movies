import { Flex, Avatar, Text, Box, PopoverFooter } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
} from '@chakra-ui/react'

import { useAuth } from "@/context/Auth";
import router from "next/router";


interface UserProps {
  name: string;
  email?:string;
  id?:string;
}

export default function Header() {
  const { getToken } = useAuth();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = getToken();
      const { data } = await axios.get("http://localhost:3333/user", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push("/");
  };

  return (
    <Flex
      as="header"
      data-cy="Header"
      bg="black"
      justify="space-between"
      align="center"
      w="100%"
      h="80px"
      px="146px"
      boxShadow='xl'
      direction="row"
      top="0"
      left="0"
      right="0"
    >
      <Text color="white"> My Movies</Text>
      {user && (
        <Popover>
          <PopoverTrigger>
            <Avatar name={user.name} role='button' />
          </PopoverTrigger>
          <PopoverContent bg='black' color='white'>
            <PopoverArrow />
            <PopoverCloseButton bg='purple.500' />
            <PopoverBody mt={3}>
              <Text key={user.id}>
                Nome: {user.name} <br />
                Email: {user.email} <br />
                ID: {user.id} <br />
              </Text>
            </PopoverBody>

            <PopoverFooter>
              <Text color="red" cursor="pointer" onClick={handleLogout}>Sair</Text>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )}
    </Flex>
  )
}
