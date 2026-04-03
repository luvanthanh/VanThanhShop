package Myproject.cart_service.repository;

import Myproject.cart_service.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,String> {
    Cart getByCartId(int cartId);
    Optional<Cart> getCartsByUserId(String userId);
}
