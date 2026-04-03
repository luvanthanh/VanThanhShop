package Myproject.cart_service.mapper;


import Myproject.cart_service.dto.reponse.CartResponse;
import Myproject.cart_service.entity.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartResponse cartDtoToCart(Cart cart);

}
