package Myproject.cart_service.mapper;


import Myproject.cart_service.dto.reponse.CartItemResponse;
import Myproject.cart_service.dto.reponse.CartResponse;
import Myproject.cart_service.entity.Cart;
import Myproject.cart_service.entity.CartItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartResponse toCartResponse(Cart cart);

    CartItemResponse toCartItemResponse(CartItem cartItem);
}
