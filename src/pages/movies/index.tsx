// pages/index.tsx
import { Flex, Text, Grid, GridItem, Image, Tooltip, useDisclosure, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { formatdate } from "@/utils/FormatDate";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "@/components/header/Header";
import { useAuth } from "@/context/Auth";
import router from "next/router";
interface Movie {
  id: string;
  title: string;
  duration: number;
  release_Date: string;
  description: string;
  url_Image: string;
}

export default function Home() {
  const {getToken} = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [movies, setMovies] = useState<Movie[]>([]);
  const [itens, setItens] = useState(8)
  const [isLast, setLast] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | any>("");
  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    onOpen();
  };

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      const token = getToken()
      try {
        const {data} = await axios.get("http://localhost:3333/movies?itens=" + itens, {
          headers: {
            Authorization : 'Bearer ' + token
          }});
        setMovies(data.data);
        setLast(data.isLast)
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, [itens]);

  const moreMovies = () => {
    if (!isLast) {
      setItens(itens + 8)
    }
  }

  return (
    <>
      <Header />
      <Flex w="100%" minH="100vh" h="100%" direction="column" bgGradient="linear(black 0%, orange.800 150%)" align="center">
        {movies.length > 0 ? (
          <>
          <Grid templateColumns="repeat(4, 1fr)" gap={5} mt={5} mb={10}>
            {movies.map((movie) => (
              <GridItem key={movie.id} w="194px" h="286px" onClick={() => handleOpenModal(movie)}>


                <Tooltip label={movie.title} aria-label="A tooltip">
                  <Image
                    _hover={{ opacity: "0.9", border: "2px", borderColor: "gray.200" }}
                    boxSize="100%"
                    borderRadius="lg"
                    src={movie.url_Image}
                    alt={movie.title}
                  />
                </Tooltip>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}  >

                  <ModalContent h="500px">
                    <ModalCloseButton color="white" />
                    <ModalBody pb={6} backgroundColor="blackAlpha.800">
                      <Flex><Image
                        h="250px"
                        width="150px"
                        src={selectedMovie.url_Image}
                      />
                        <Flex direction="column" color="white" fontStyle="bold" mt={8} mx={6}>
                          <Text color="orange.300" fontWeight="bold" >{selectedMovie.title}</Text>
                          <Text >{selectedMovie.duration} min </Text>

                          <Text>lançamento
: {formatdate(selectedMovie.release_Date)}</Text>
                        </Flex>
                      </Flex>

                      <Text color="white" mt={8}>Sinopse: {selectedMovie.description}</Text>

                    </ModalBody>
                  </ModalContent>
                </Modal>


              </GridItem>
            ))}
          </Grid>

          {!isLast && <Button colorScheme='red' variant='solid' mb={20} onClick={moreMovies}>Ver mais</Button>}
          </>
        ) : (
          <Text textAlign="center" mt={5} color="gray.200" fontSize="2xl" fontWeight="bold">
            Nenhum filme disponível
          </Text>
        )}



      </Flex>


    </>
  );
}


