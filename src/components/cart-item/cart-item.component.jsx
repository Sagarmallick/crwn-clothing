import { CartItemContainer, ItemDetails } from './cart-item.styles';
const CartItem = ({cartItem}) =>{
    // extrect name and quantity from cartItem which is passed from cart dropdown 
    const {name,imageUrl,price, quantity} = cartItem;
return(
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
)
}
export default CartItem