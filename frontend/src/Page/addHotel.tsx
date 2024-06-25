import { useMutation } from "react-query"
import ManageHotelForm from "../forms/manageHotelForm"
import { useAppContext } from "../contexts/appContexts"
import * as apiClient from "../api-client"
const AddHotel = () => {
  const{showToast}=useAppContext();
  const{mutate,isLoading}=useMutation(apiClient.addMyHotel,{
    onSuccess:()=>{
      showToast({message:"Hotel Saved!",type:"SUCCESS"})
    },
    onError:()=>{
      showToast({message:"Error saving hotel",type:"ERROR"});
    }
  })
  const handlSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }
  return (
    <ManageHotelForm onSave={handlSave} isLoading={isLoading}/>
  )
}

export default AddHotel
