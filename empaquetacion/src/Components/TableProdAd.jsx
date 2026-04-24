import React from "react";
import { useState, useEffect } from "react";

const TableProdAdm = ({ Produ }) => {
    const [ ColorBack, setColorBack ] = useState("rgba(65, 65, 65, 0.5)")
    const [ WhitdhStock, setWhitdhStock ] = useState("100%")

    const CalcularStock = (stock) => {
        if(stock >= 20){
            setColorBack("var(--green_81A65D)");
            setWhitdhStock("100%");
        }else if(stock < 20 && stock > 10){
            setColorBack("var(--brown)");
            setWhitdhStock("60%");
        }else{
            setColorBack("var(--pink)");
            setWhitdhStock("30%");
            console.log("HHH")
        }
    }

    useEffect(() => {
        CalcularStock(Produ.stock);
    }, []);

    return(
        <tr className="flex flex-row w-full" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: "rgba(127, 158, 122, 0.15)"}}>
            <td className="py-3 flex justify-center items-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <img src={Produ.image} className="w-10 h-10 rounded-lg object-cover" />
                </div>
            </td>
            <td className="justify-center items-center flex py-3 font-medium text-sm text-gray-800">{Produ.name}</td>
            <td className="py-3 flex justify-center items-center">
                <span className="bg-white text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {Produ.category}
                </span>
            </td>
            <td className="py-3 justify-center items-center flex text-sm text-gray-700">${parseFloat(Produ.price).toFixed(2)}</td>
            <td className="py-3 justify-center w-full items-center flex gap-2 ">
                <div className="w-2/5 rounded-xl h-1 p-0" style={{backgroundColor: "rgba(65, 65, 65, 0.5)"}}>
                    <div className="flex rounded-xl justify-start items-star h-full" style={{backgroundColor: ColorBack, width: WhitdhStock}}></div>
                </div>
                <h2 className="text-xs flex flex-row items-end justify-end gap-2" style={{color: "rgba(65, 65, 65, 0.5)"}}><span className="text-sm">{Produ.stock}</span> units</h2>
            </td>
            <td className="py-3 justify-center items-center flex">
                <div className="flex flex-row gap-4 items-center justify-center">
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--brown)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--pink)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </div>
            </td>
        </tr>
    )
}

export default TableProdAdm;