import { Alert, Dimensions } from "react-native";
import { useState, useEffect } from 'react';


export const LoginHook = ( style: any, nav:any ) =>{
    const { width } = Dimensions.get('window');
    const { styles } = stylesF(width,style);
    const [user, setUser] = useState("");
    const [password, setPass] = useState("");

    function Login(){
      if (user.length <= 0 || password.length <= 0)
        {
          SetAlert("Ingrese el usuario y la contraseña");
          return ;
        }
        
        if(user !== "javinix")
        {       
          SetAlert("Usuario incorrecto");
          return;
        }

        if(password !== "Lol96")
        {       
          SetAlert("Contraseña incorrecto");
          return;
        }

        nav('Home');
    }

    return {
        width,
        styles,
        setUser,
        setPass,
        Login
    } 
}

const stylesF = ( width1: number, style:any) =>
{
  const [styles, setStyle ] = useState({});
  useEffect(() => {
    if (width1 > 800)
      setStyle(style.OvaloIpad);
    else
      setStyle(style.Ovalo);
  }, [])
  return { styles }
}

function SetAlert(message: string){
  Alert.alert(
    "Error",
    message,
    [{
      text: "Ok"
    }]
  )
}