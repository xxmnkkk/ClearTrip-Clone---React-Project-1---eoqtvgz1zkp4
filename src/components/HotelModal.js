import { useContext , useState , useEffect} from "react";
import { AuthContext } from "./App";
import axios from "axios";

function HotelModal() {
    const { selectedHotel} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(selectedHotel);

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "projectID": "f104bi07c490",
            },
        };

        axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${selectedHotel}`, config)
            .then((response) => {
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [selectedHotel]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return(
        <div>HotelModal</div>
    )
}

export default HotelModal