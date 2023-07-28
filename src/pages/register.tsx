import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import axios from "axios";
import router from "next/router";
import { MouseEvent, useEffect, useState } from "react";

export default function CreateCount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(email, password)
    const response = await axios.post('http://localhost:3333/register',
      JSON.stringify({ email: email, password: password, name: name }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    router.push('/');
  }


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      router.push('/movies');
    }
  }, []);


  return (
    <Flex height="100vh" alignItems='center' justifyContent="center" background="purple.900">
      <Flex direction="column" background='gray.100' p={12} rounded={6}>
        <Heading mb={6}>Cadastre-se</Heading>
        <Input mb={3}
          focusBorderColor='orange.400'
          placeholder="exemple@email.com"
          variant="filled" type="email" required
          onChange={(e) => setEmail(e.target.value)} />

        <Input mb={6}
          focusBorderColor='orange.400'
          placeholder="******"
          variant="filled" type="password" minLength={6} maxLength={10} required
          onChange={(e) => setPassword(e.target.value)} />

        <Input mb={6}
          focusBorderColor='orange.400'
          placeholder="joao batista"
          variant="filled" type="name" required
          onChange={(e) => setName(e.target.value)} />
        <Button colorScheme="green" onClick={(e) => handleLogin(e)}>Cadastrar</Button>

      </Flex>
    </Flex>
  )
}



