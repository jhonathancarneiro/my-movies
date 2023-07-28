
import { ReactNode, createContext, useContext, useState } from 'react';
import axios from 'axios';

type AuthContextData = {
  getToken : ()=>string | null
  login : (email :string,password:string)=>Promise<string>
  removeToken?: () => void;
}

type Authproviderprops = {
  children: ReactNode

}


const AuthContext = createContext({} as AuthContextData);
export function AuthProvider({children }: Authproviderprops) {
  const [token, setToken] = useState<string | null>(null);




const login = async (email :string, password:string)=>{
      try {
      const {data, status} = await axios.post('http://localhost:3333/login', {
        email,
        password
      });

      if(status === 200) {
        localStorage.setItem('token', data.token)
        return "sucess"
      } else {
        return "fail"
      }
    } catch (error:any) {
      console.error(error);
      return "error"
    }
  };

  const getToken =() => {
   const token = localStorage.getItem("token")
   return token

  }

  const removeToken = () => {
    setToken(null);
  };


  return (
    <AuthContext.Provider value={{getToken,login}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext)
  return context
}




