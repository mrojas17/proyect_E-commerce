import React from 'react'
import { MdDeleteForever } from 'react-icons/md';

interface CartItemProps {
    image: string;
    price: number;
    name: string;
    description: string;
    onTrashClick: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
    image, price, name, description, onTrashClick
}) => {
  return (
    <div className=" flex-col  m-5  md: mx-auto  overflow-hidden  bg-background  shadow-sm  max-w-2xl">
      <div className=" flex  h-40">
        <div className=" shrink-0">
          <img
            className=" object-contain  h-full  w-full"
            src={image}
            alt="Modern building architecture"
          />
        </div>
        <div className="  flex  flex-col  m-8">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>
        <div className=" mt-2 ">
          <span className=' font-semibold  text-lg  mt-14  text-gray-900  mr-2'>
          ${price}
          </span>
          <span onClick={onTrashClick} className=" flex mt-14 text-red-900  rounded-lg  cursor-pointer">
          <MdDeleteForever className="w-8 h-8"/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem