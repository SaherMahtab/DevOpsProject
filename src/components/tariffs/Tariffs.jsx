import React from "react";
import { Images } from "../../assets/images";



const Tariffs = () => {
    const {crysta,dzire,ertiga,innova} = Images

    const tariffs = [
   
        {
            title: "SEDAN",
            description: "Elegant and comfortable, our Sedan offers a smooth and stylish ride for city travel.",
            price: "₹12/km",
            note: "*Only applicable for round trip*",
            image: {dzire}, // Replace with actual image path
        },
        {
            title: "ERTIGA",
            description: "Ideal for families and groups, the Ertiga combines space and versatility for your journeys.",
            price: "₹14/km",
            note: "*Only applicable for round trip*",
            image: {ertiga}, // Replace with actual image path
        },
        {
            title: "INNOVA",
            description: "Experience premium comfort and ample space with our Innova for group travel.",
            price: "₹17/km",
            note: "*Only applicable for round trip*",
            image: {innova}, // Replace with actual image path
            highlighted: true,
        },
        {
            title: "CRYSTA",
            description: "Luxury and sophistication meet in the Crysta, perfect for a superior travel experience.",
            price: "₹20/km",
            note: "*Only applicable for round trip*",
            image: {crysta}, // Replace with actual image path
        },
    ];
   
    return (
        <div className="bg-gray-100 py-16">
            <div className="text-center mb-12">
                <h2 className="text-yellow-500 text-lg font-bold">SEE OUR</h2>
                <h1 className="text-4xl font-extrabold">TARIFFS</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                {tariffs.map((tariff, index) => (
                    <div 
                        key={index} 
                        className={`max-w-xs text-center  hover:scale-110 duration-300 rounded-lg p-6 ${tariff?.highlighted ? ' relative border rounded-tl-xl border-yellow-400' : ''}`}
                    >
                        {tariff.highlighted && (
                            <div className="absolute top-0 right-0  bg-yellow-400 text-white px-5 py-4  text-xl font-bold">★</div>
                        )}
                        <img src={Object.values(tariff.image)} alt={tariff.title} className="mb-4 mix-blend-multiply w-full h-48 object-cover rounded" />
                        <div className="bg-white shadow-xl rounded-xl p-4">
                        <h3 className="text-xl font-bold mb-2">{tariff.title}</h3>
                        <p className="text-gray-700 mb-4">{tariff.description}</p>
                        <div className="text-2xl font-bold mb-2">{tariff.price}</div>
                        <p className="text-red-500 text-sm">{tariff.note}</p>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tariffs;