import { useContext } from "react"
import { AuthContext } from "../components/App"

export default function AuthNavigator({Children}){

    const {isLoggedIn , setLoginModal} = useContext(AuthContext);

    if(!isLoggedIn){
        return setLoginModal(true);
    }else{
        return Children;
    }
}