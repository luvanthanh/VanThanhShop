package com.example.order_service.client;

import com.example.order_service.dto.response.CartItemResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "product-service")
public interface CartItemClient {

    @GetMapping("carts/{cartId}/cartItems")
    public List<CartItemResponse> getCartItemByCartId(@PathVariable int cartId);
}
