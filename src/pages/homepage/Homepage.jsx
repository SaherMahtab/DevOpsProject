import React, { useState } from "react";
import FlipButtons from "../../components/flipbuttons/Flipbuttons";
import { Images } from "../../assets/images";
import LocationPin from "../../assets/svgs/LocationPin";
import CircleStop from "../../assets/svgs/CircleStop";
import Tariffs from "../../components/tariffs/Tariffs";

const services = [
    {
        title: "INTERCITY TRAVEL AND TOUR",
        description: "Seamless intercity travel for business or leisure. Comfortable rides for long-distance journeys. Safe and efficient transportation between cities.",
        icon: "🗺", // You can replace this with an actual icon or image if available
    },
    {
        title: "CITY TOURS AND SIGHTSEEING",
        description: "Explore the city with our guided tours. Visit popular attractions and landmarks. Enjoy a personalized sightseeing experience.",
        icon: "🏙", // You can replace this with an actual icon or image if available
    },
    {
        title: "AIRPORT PICK AND DROP",
        description: "Reliable transportation to and from the airport. Hassle-free airport transfers for your convenience. Professional drivers to ensure punctuality.",
        icon: "✈️", // You can replace this with an actual icon or image if available
    },
    {
        title: "CORPORATE TRANSPORTATION",
        description: "Corporate travel solutions for businesses. Executive transportation services. Convenient and professional rides for your team.",
        icon: "💼", // You can replace this with an actual icon or image if available
    },
];

const Homepage = () => {
    const [tripType,setTripType] = useState('one Way')
    const handleTriptype = (type) => {
        setTripType(type)
    }

    return (
        <>
                <div className="bg-yellow-500 md:flex md:p-40">
            <div className="">
                
                <h1 className="text-white text-5xl mx-4  my-4  md:mx-16  capitalize font-black">
                Get there in a Vroom with <p className="text-black underline text-6xl">VroomCabs!</p>
                </h1>
                <div className="px-3 grid items-center justify-evenly w-full ">
                <button onClick={()=>handleTriptype('one Way')} className="bg-black text-white px-8 py-2 shadow-sm hover:shadow-2xl hover:bg-white hover:text-black duration-300 rounded-lg my-3">ONE WAY</button>
                <button onClick={()=>handleTriptype('round Trip')} className="bg-black text-white px-8 py-2 shadow-sm hover:shadow-2xl hover:bg-white hover:text-black duration-300 rounded-lg my-3">ROUND TRIP</button>
                <button onClick={()=>handleTriptype('airPort Service')} className="bg-black text-white px-8 w-full py-2 shadow-sm hover:shadow-2xl hover:bg-white hover:text-black duration-300 rounded-lg my-3">AIRPORT SERVICE</button>

                </div>
                <div className="">
                    
                    <h1 className="text-center text-3xl font-black uppercase underline"> {tripType} </h1>
            { tripType === 'one Way' && 
                (<>
                    <div className=" py-3 px-5">
                    <div className="border flex items-center justify-evenly bg-white rounded-lg">
                        <CircleStop/>
                    <input className="w-full py-3 mx-2" placeholder="Enter Location" type="text"/>
                    </div>


                </div>
                <div className="py-3 px-5">
                    <div className="border flex items-center justify-evenly bg-white rounded-lg">
                        <LocationPin/>
                    <input className="w-full py-3 mx-2" placeholder="Enter Destination" type="text"/>
                    </div>


                <button className="bg-white px-8 py-2 shadow-sm hover:shadow-2xl hover:bg-gray-300 duration-300 rounded-lg my-3">Search</button>
                </div>
                </>)
                
            }
            { tripType === 'round Trip' && 
                (<>
                    <div className=" py-3 px-5">
                    <div className="border flex items-center justify-evenly bg-white rounded-lg">
                        <CircleStop/>
                    <input className="w-full py-3 mx-2" placeholder="Enter Location" type="text"/>
                    </div>


                </div>
                <div className="py-3 px-5">
                    <div className="border flex items-center justify-evenly bg-white rounded-lg">
                        <LocationPin/>
                    <input className="w-full py-3 mx-2 " placeholder="Enter Destination" type="text"/>
                    </div>


                <button className="bg-white px-8 py-2 shadow-sm hover:shadow-2xl hover:bg-gray-300 duration-300 rounded-lg my-3">Search</button>
                </div>
                </>)
                
            }
            { tripType === 'airPort Service' && 
                (<>
                    <div className=" py-3 px-5">
                    <div className="border flex items-center justify-evenly bg-white rounded-lg">
                        <CircleStop/>
                    <input className="w-full py-3 mx-2" placeholder="Enter Location" type="text"/>
                    </div>


                </div>
                <div className="py-3 px-5">
                    <div className="border flex items-center justify-evenly bg-white rounded-lg">
                        <LocationPin/>
                    <input className="w-full py-3 mx-2" placeholder="Enter Destination" type="text"/>
                    </div>


                <button className="bg-white px-8 py-2 shadow-sm hover:shadow-2xl hover:bg-gray-300 duration-300 rounded-lg my-3">Search</button>
                </div>
                </>)
                
            }
                </div>


            </div>
            <div className=" w-full">
                <img src={Images.bigCar}/>
                <div>

                </div>

            </div>
        </div>


{/* Our Services */}
        <div className="bg-black py-16">
            <div className="text-center mb-12">
                <h2 className="text-yellow-500 text-lg font-bold">WELCOME</h2>
                <h1 className="text-4xl text-white font-extrabold">OUR SERVICES</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                {services.map((service, index) => (
                    <div key={index} className="max-w-xs text-center">
                        <div className="text-6xl text-white mb-4 text-yellow-500">{service.icon}</div>
                        <h3 className="text-xl text-white font-bold mb-2">{service.title}</h3>
                        <p className="text-white">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
<div className="bg-yellow-500">
    <Tariffs/>
    </div>
        </>
    );
};

export default Homepage;
