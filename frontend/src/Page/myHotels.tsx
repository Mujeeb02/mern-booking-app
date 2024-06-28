import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/appContexts";
import {BsBuilding, BsMap, BsStar } from "react-icons/bs";
import { BiHotel, BiMoney } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {
      showToast({ message: "Error in fetching hotels", type: "ERROR" })
    }
  })
  if (!hotelData) {
    return <span>No Hotels found....</span>
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link to="/add-hotel" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">Add Hotel</Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between border rounded-lg border-slate-300 p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description.slice(0,250)}.....more</div>
            <div className="grid grid-cols-5 gap-2 ">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-3" />{hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-3" />{hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-3" />€ {hotel.pricePerNight} per Night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-3" />{hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsStar className="mr-3" />{hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link to={`/edit-hotel/${hotel._id}`} className="bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">View Details</Link>
            </span>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyHotels
