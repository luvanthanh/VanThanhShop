    package Myproject.cart_service.controller;

    import Myproject.cart_service.dto.reponse.ApiResponse;
    import Myproject.cart_service.dto.reponse.CartItemResponse;
    import Myproject.cart_service.dto.reponse.CartResponse;
    import Myproject.cart_service.dto.request.CartItemCreationRequest;
    import Myproject.cart_service.dto.request.CartItemUpdateRequest;
    import Myproject.cart_service.entity.Cart;
    import Myproject.cart_service.entity.CartItem;
    import Myproject.cart_service.service.CartService;
    import jakarta.validation.Valid;
    import lombok.Builder;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @Builder
    @RequestMapping("/carts")
    public class CartController {

        @Autowired
        CartService cartService;


//tạo mới giỏ hàng theo user, mỗi user sẽ có 1 giỏ hàng
        @PostMapping("/createdCartByUserId/{userId}")
        public ApiResponse<CartResponse> createCartByUserId(@PathVariable String userId) {
            var result = cartService.createdCartByUserId(userId);
            return ApiResponse.<CartResponse>builder()
                    .code(1000)
                    .message(" created cart success")
                    .data(result)
                    .build();
        }

//thêm sản phẩm  vào giò hàng
        @PostMapping("/{cartId}/cartItems")
        public ApiResponse<CartItem> addCartItemByCartId(@Valid @RequestBody  CartItemCreationRequest request, @PathVariable int cartId) {
            var result = cartService.addCartItemByCartId(request,cartId);
            return ApiResponse.<CartItem>builder()
                    .code(1000)
                    .message(" added cart success!")
                    .data(result)
                    .build();
        }

//lấy giỏ hàng của khách hàng
        @GetMapping("/getCartByUserId/{userId}")
        public ApiResponse<CartResponse> getCartByUserId(@PathVariable String userId) {
            var result = cartService.getCartByUserId(userId);
            return ApiResponse.<CartResponse>builder()
                    .code(1000)
                    .message(" get cart success!")
                    .data(result)
                    .build();
        }


//lấy danh sách giỏ hàng
        @GetMapping("/{cartId}/cartItems")
        public ApiResponse<List<CartItem>> getCartItemByCartId(@PathVariable int cartId) {
            return cartService.getCartItemByCartId(cartId);
        }

//sửa số lượng của sản phẩm trong giỏ hàng
        @PutMapping("/cartItems/{cartItemId}/")
        public ApiResponse<CartItem> updateCartItem(@RequestBody CartItemUpdateRequest request ,  @PathVariable int cartItemId) {
            return cartService.updateCartItemQuantity(request,cartItemId);
        }


//xóa sản phẩm ra khỏi giở hàng
        @DeleteMapping("/cartItems/{cartItemId}")
        public String deleteCartItem(@PathVariable int cartItemId) {
            return cartService.deleteCartItemByCartId(cartItemId);
        }
    }
