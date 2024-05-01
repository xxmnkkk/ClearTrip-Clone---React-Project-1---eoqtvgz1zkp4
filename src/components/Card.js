import axios from "axios"
import { useEffect, useState } from "react"

// Very basic code for some card images that is being displayed on the right side of the mainpage
export default function Card() {
    const [offerData, setOfferData] = useState();
    console.log("Offer data: ", offerData)

    const [currentIndex, setCurrentIndex] = useState(0);
    console.log("current index: ", currentIndex);
    useEffect(() => {
        const config = {
            headers: {
                projectId: "f104bi07c490"
            }
        }

        axios.get("https://academics.newtonschool.co/api/v1/bookingportals/offers", config)
            .then((response) => {
                // console.log(response.data.data.offers)
                setOfferData(response.data.data.offers)
            })
            .catch((error) => {
                console.log("Offer error: ", error)
            });
    }, []);

    useEffect(() => {
        const nextIndex = (currentIndex + 1) % offerData?.length;

        const timeout = setTimeout(() => {
            setCurrentIndex(nextIndex);
        }, 10000);

        return () => {
            clearTimeout(timeout);
        };
    }, [currentIndex, offerData])

    return (
        <div className='adds-div'>
            {offerData && offerData.map((data, index) => (
                    <div className={`${currentIndex === index ? "card-container-block" : "card-container-none"}`} key={index}>
                        <div className="card-container">
                            <p className="card-title">{data.offerPersuasion}</p>
                            <p className="card-description">{data.pTl}</p>
                            <p className="card-description">{data.pTx}</p>
                        </div>
                    </div>
            ))}


            {
                offerData && offerData.map((data, index) => (
                    <div
                        className={`card-container-img ${currentIndex === index ? "card-container-block" : "card-container-none"}`}
                        key={index}>

                            <img src={data.heroUrl} alt="img" className="card-image" />
                    </div>
                ))
            }
        </div>
    )
}

// ${currentIndex === index ? "card-container-block" : "card-container-none"}
 {/* <div className="image-container">
                            {/* <img src={data.heroUrl} alt="img" className="card-image" /> */}
                      //  </div> */}