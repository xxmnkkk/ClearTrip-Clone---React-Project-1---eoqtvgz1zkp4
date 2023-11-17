import { useEffect } from "react";
import axios from "axios";

export default function() {
    useEffect(() => {
        const queryParams = {
            source: departure,
            destination: arrival,
            day: flightDay
        };

        const config = {
            headers: {
                "Content-type": "application/json",
                "projectID": "f104bi07c490",
            },
            params: queryParams
        };

        axios.get("https://academics.newtonschool.co/api/v1/bookingportals/flight/", config)
            .then((response) => {
                setFlights(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [departure, arrival, flightDay]);
}