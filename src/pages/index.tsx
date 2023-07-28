import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import router, { useRouter } from 'next/router';
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";

export default function LoginPage() {
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      router.push('/movies');
    }
  }, []);

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('')

    const response = await login(email, password)

    if (response === 'sucess') {
      router.push('/movies')
    } else if (response === 'fail') {
      setStatus('Email ou senha incorreto!')
    } else {
      setStatus('Error no servidor!')
    }
  };

  return (

    <Flex height="100vh" w="100vw" alignItems='center' justifyContent="center" background='url(https://wallpapers.com/images/hd/american-movie-posters-z0puq43u0qbtr6j2.webp) center/cover no-repeat'>
      <Flex direction="column" background='gray.100' boxShadow='dark-lg' p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input
          mb={3}
          focusBorderColor='orange.400'
          placeholder="exemple@email.com"
          variant="filled" type="email" required
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          mb={6}
          focusBorderColor='orange.400'
          placeholder="******"
          variant="filled" type="password" required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button colorScheme="orange" onClick={handleLogin}>Log in</Button>
        <Flex mt={3}>
          <Text fontSize='sm'>
            Não possui uma conta?{' '}
          </Text>
          <Text
            as="span"
            color="green "
            _hover={{ cursor: 'pointer' }}
            onClick={() => router.push('/register')}
          >
            Cadastre-se aqui

          </Text>
        </Flex>
        {status && <Text color="red">{status}</Text>}
      </Flex>
    </Flex>

  );
}
