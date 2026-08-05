package Myproject.cart_service.controller;

import Myproject.cart_service.dto.reponse.ApiResponse;
import Myproject.cart_service.dto.reponse.CartItemResponse;
import Myproject.cart_service.dto.reponse.CartResponse;
import Myproject.cart_service.dto.request.CartItemCreationRequest;
import Myproject.cart_service.dto.request.CartItemUpdateRequest;
import Myproject.cart_service.entity.CartItem;
import Myproject.cart_service.service.CartService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // tạo mới giỏ hàng theo user, mỗi user sẽ có 1 giỏ hàng
    @PostMapping("/user/{userId}")
    public ApiResponse<CartResponse> createCartByUserId(@PathVariable String userId) {
        var result = cartService.createdCartByUserId(userId);
        return ApiResponse.<CartResponse>builder()
                .code(1000)
                .message("created cart success")
                .data(result)
                .build();
    }

    // thêm sản phẩm vào giỏ hàng
    @PostMapping("/{cartId}/items")
    public ApiResponse<CartItem> addCartItemByCartId(@Valid @RequestBody CartItemCreationRequest request, @PathVariable int cartId) {
        var result = cartService.addCartItemByCartId(request, cartId);
        return ApiResponse.<CartItem>builder()
                .code(1000)
                .message("added cart success")
                .data(result)
                .build();
    }

    // lấy giỏ hàng của khách hàng
    @GetMapping("/user/{userId}")
    public ApiResponse<CartResponse> getCartByUserId(@PathVariable String userId) {
        var result = cartService.getCartByUserId(userId);
        return ApiResponse.<CartResponse>builder()
                .code(1000)
                .message("get cart success")
                .data(result)
                .build();
    }

    // lấy danh sách sản phẩm thông qua cart id vì mỗi user có 1 id
    @GetMapping("/{cartId}/items")
    public ApiResponse<List<CartItemResponse>> getCartItemByCartId(@PathVariable int cartId) {
        var result = cartService.getCartItemByCartId(cartId);
        return ApiResponse.<List<CartItemResponse>>builder()
                .code(1000)
                .message("get cart items success")
                .data(result)
                .build();
    }

    // sửa số lượng của sản phẩm trong giỏ hàng
    @PutMapping("/items/{cartItemId}")
    public ApiResponse<CartItem> updateCartItem(@Valid @RequestBody CartItemUpdateRequest request, @PathVariable int cartItemId) {
        var result = cartService.updateCartItemQuantity(request, cartItemId);
        return ApiResponse.<CartItem>builder()
                .code(1000)
                .message("updated cart item success")
                .data(result)
                .build();
    }

    // xóa sản phẩm ra khỏi giỏ hàng
    @DeleteMapping("/items/{cartItemId}")
    public ApiResponse<String> deleteCartItem(@PathVariable int cartItemId) {
        String result = cartService.deleteCartItemByCartId(cartItemId);
        return ApiResponse.<String>builder()
                .code(1000)
                .message("delete cart item success")
                .data(result)
                .build();
    }
}
