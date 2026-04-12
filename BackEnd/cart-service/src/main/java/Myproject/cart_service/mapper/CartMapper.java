package Myproject.cart_service.mapper;


import Myproject.cart_service.dto.reponse.CartItemResponse;
import Myproject.cart_service.dto.reponse.CartResponse;
import Myproject.cart_service.entity.Cart;
import Myproject.cart_service.entity.CartItem;
import org.mapstruct.Mapper;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartResponse toCartResponse(Cart cart);

    Optional<CartItemResponse> toCartItemResponse(CartItem cartItem);

}
