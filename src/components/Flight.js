import axios from "axios"
import { useContext, useEffect } from "react";
import { AuthContext } from "./App";

export default function Flight() {

    const { departure, arrival } = useContext(AuthContext);
    console.log(departure, " ", arrival);

    useEffect(() => {
        const config = {
            search: {
                source: departure,
                destination: arrival,
            },
            headers: {
                "Content-type": "application/json",
                "projectID": "f104bi07c490",
            }
        };

        axios.get("https://academics.newtonschool.co/api/v1/bookingportals/flight/", config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return <>
        {/* <button onClick={handleFlightData}>Check flight api</button> */}
        <div>flight</div>
    </>
} 