import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'
import { useContext } from 'react'
// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'
const CartIcon =()=>{
    const {isCartOpen,setIsCartOpen, cartCount}= useContext(CartContext);

    const toggleIsCartOpen =()=> setIsCartOpen(!isCartOpen)
return(
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
)
}
export default CartIcon