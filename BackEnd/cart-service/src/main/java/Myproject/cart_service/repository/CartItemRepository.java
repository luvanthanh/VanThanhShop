package Myproject.cart_service.repository;

import Myproject.cart_service.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Integer> {
    Optional<CartItem> findById(int id);
    List<CartItem> findByCartId( int cartId);
    Optional<CartItem> getByCartIdAndProductId(int cartId, int productId);
    List<CartItem> getCartItemByCartId(int cartId);

}
