import { ActionTypes, CartType } from './../types/types';
import { create } from "zustand";
import {persist} from 'zustand/middleware'

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
  };

  export const useCartStore = create(persist<CartType & ActionTypes>(( set, get) =>({
    products:INITIAL_STATE.products,
    totalItems:INITIAL_STATE.totalItems,
    totalPrice:INITIAL_STATE.totalPrice,
    addToCart(item){

        const products = get().products
        const productsInState = products.find(product => product.id === item.id)

        if(productsInState){

            const updatedproducts = products.map(product => product.id === productsInState.id ? {
                ...item,
                quantity: item.quantity + product.quantity,
                price: item.price + product.price
            } : item)

            set((state) => (
                {
                    products: updatedproducts,
                    totalItems: state.totalItems + item.quantity,
                    totalPrice: state.totalPrice + item.price
                }
            ))

        }else{
            set((state) => ({
                products:[...state.products, item],
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price
                
            }))
        }

       
    },
    removeFromCart(item) {
        set((state) => ({
            products: state.products.filter(product => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price
        }))
    },
  }), {name: "cart", skipHydration: true}))