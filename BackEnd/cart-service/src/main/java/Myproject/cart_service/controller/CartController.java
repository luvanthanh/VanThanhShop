    package Myproject.cart_service.controller;



    import Myproject.cart_service.dto.reponse.ApiResponse;
    import Myproject.cart_service.dto.reponse.CartItemResponse;
    import Myproject.cart_service.dto.reponse.CartResponse;
    import Myproject.cart_service.dto.request.CartItemCreationRequest;
    import Myproject.cart_service.dto.request.CartItemUpdateRequest;
    import Myproject.cart_service.entity.Cart;
    import Myproject.cart_service.entity.CartItem;
    import Myproject.cart_service.service.CartService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/carts")
    public class CartController {


        @Autowired
        CartService cartService;


//tạo mới giỏ hàng theo user, mỗi user sẽ có 1 giỏ hàng
        @PostMapping("/createdCartByUserId/{userId}")
        public ApiResponse<CartResponse> createCartByUserId(@PathVariable String userId) {
            return cartService.createdCartByUserId(userId);
        }

//thêm sản phẩm  vào giò hàng
        @PostMapping("/{cartId}/cartItems")
        public ApiResponse<CartItem> addCartItemByCartId( @RequestBody  CartItemCreationRequest request, @PathVariable int cartId) {
            return  cartService.addCartItemByCartId(request,cartId);
        }

//lấy giỏ hàng của khách hàng
        @GetMapping("/getCartByUserId/{userId}")
        public ApiResponse<CartResponse> getCartByUserId(@PathVariable String userId) {
            return cartService.getCartByUserId(userId);
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
