import React from "react";

const TableGymAd = ({ Gym }) => {
    return(
        <tr className="flex flex-row w-full" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: "rgba(127, 158, 122, 0.15)"}}>
            <td className="py-3 flex justify-center items-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <img src={Gym.image} className="w-10 h-10 rounded-lg object-cover" />
                </div>
            </td>
            <td className="justify-center items-center flex py-3 font-medium text-sm text-gray-800">{Gym.name}</td>
            <td className="py-3 flex justify-center items-center">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {Gym.memberships}
                </span>
            </td>
            <td className="py-3 justify-center items-center flex text-sm text-gray-700">{Gym.members}</td>
            <td className="py-3 justify-center items-center flex text-sm text-gray-500">{Gym.city}</td>
            <td className="py-3 justify-center items-center flex">
                <div className="flex flex-row gap-4 items-center justify-center">
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--brown)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--pink)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </div>
            </td>
        </tr>
    )
}

export default TableGymAd;