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

        @PostMapping("/createdCartByUserId/{userId}") // thêm giỏ hàng , bắt đầu tạo giỏ hàng cho user
        public ApiResponse<CartResponse> createCartByUserId(@PathVariable String userId) {
            return cartService.createdCartByUserId(userId);
        }


        @PostMapping("/{cartId}/cartItems") //sau đó mới thêm cartItem (productId ) vào trong CartId  // tiếp theo đó mới lấy thông tin sản phẩm
        public CartItem addCartItemByCartId( @RequestBody  CartItemCreationRequest request, @PathVariable int cartId) {
            return  cartService.addCartItemByCartId(request,cartId);
        }

        @GetMapping("/getCartByUserId/{userId}") //lấy cart bằng userId
        public ApiResponse<CartResponse> getCartByUserId(@PathVariable String userId) {
            return cartService.getCartByUserId(userId);
        }

        @GetMapping("/{cartId}/cartItems")  //lấy danh sách cartItem bằng cartId
        public List<CartItemResponse> getCartItemByCartId(@PathVariable int cartId) {
            return  cartService.getCartItemByCartId(cartId);
        }

        @PutMapping("/cartItems/{cartItemId}/") //sửa quatity của cartItem theo cartItemId
        public CartItem updateCartItem(@RequestBody CartItemUpdateRequest request ,  @PathVariable int cartItemId) {
            return cartService.updateCartItemQuantity(request,cartItemId);
        }



        @DeleteMapping("/cartItems/{cartItemId}")   //xóa cartItems theo cartItemId
        public String deleteCartItem(@PathVariable int cartItemId) {
            return cartService.deleteCartItemByCartId(cartItemId);
        }
    }
