package Myproject.cart_service.service;

import Myproject.cart_service.client.ProductClient;
import Myproject.cart_service.dto.reponse.ApiResponse;
import Myproject.cart_service.dto.reponse.CartItemResponse;
import Myproject.cart_service.dto.reponse.CartResponse;
import Myproject.cart_service.dto.reponse.ProductResponse;
import Myproject.cart_service.dto.request.CartItemCreationRequest;
import Myproject.cart_service.dto.request.CartItemUpdateRequest;
import Myproject.cart_service.entity.Cart;
import Myproject.cart_service.entity.CartItem;
import Myproject.cart_service.mapper.CartMapper;
import Myproject.cart_service.repository.CartItemRepository;
import Myproject.cart_service.repository.CartRepository;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;


@Builder
@Service

public class CartService {

    @Autowired
    private ProductClient productClient;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartMapper cartMapper;


// tạo cart nếu chưa có (1 user sẽ có 1 cart)
    public ApiResponse<CartResponse> createdCartByUserId(String userId){
        Cart cart = cartRepository.getCartsByUserId( userId)
                .orElseGet(()->{
                    Cart newCart =new Cart();
                    newCart.setUserId(userId);
                    return cartRepository.save(newCart);
                });
         CartResponse cartResponse = cartMapper.cartDtoToCart(cart);

        return ApiResponse.<CartResponse>builder()
                .code(1000)
                .message(" đã lấy giữ liệu thành công!")
                .data(cartResponse)
                .build();
    }
   // thêm cartItem bởi bằng cartId
    public ApiResponse<CartItem> addCartItemByCartId(CartItemCreationRequest request, @PathVariable int cartId) {
        ApiResponse<ProductResponse> response = productClient.getProductById(request.getProductId());

        if(response == null ){
            throw new RuntimeException("product không tồn taij hoặc có lỗi khi lấy dữ liệu ở service khác!");
        }

        ProductResponse product = response.getData();
        if(product.getProductStockQuantity() < request.getQuantity()){
            throw new RuntimeException("lỗi số lượng cho kho không đủ!");
        }

        CartItem cartItem = cartItemRepository.findById(cartId).orElse(null);
        if(cartItem == null){
            cartItem = new CartItem();
            cartItem.setCartId(cartId);
            cartItem.setProductId(request.getProductId());
            cartItem.setQuantity(request.getQuantity());

            cartItem.setProductName(product.getProductName());
            cartItem.setProductImage(product.getProductName());
            cartItem.setProductImage(product.getProductImageUrl());
        }
        else{
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        }
        cartItemRepository.save(cartItem);
        return ApiResponse.<CartItem>builder()
                .code(1000)
                .message("Đã lấy dữ liệu thành công!")
                .build();
    }

//    lấy danh sách sản phẩm thông qua cartId ( vì mỗi user có 1 và chỉ 1 cartId)
    public ApiResponse<List<CartItem>> getCartItemByCartId(int cartId) {
        List<CartItem> listCartItems = cartItemRepository.findByCartId(cartId);
        return ApiResponse.<List<CartItem>>builder()
                .code(1000)
                .message("đã lấy dữ liệu thành công!")
                .data(listCartItems)
                .build();
    }

    public ApiResponse<CartResponse> getCartByUserId(@PathVariable String userId) {
        Cart cart = cartRepository.getCartsByUserId(userId)
                .orElseThrow(()-> new RuntimeException(" không tìm thấy cart"));
        CartResponse cartResponse = new  CartResponse();
         cartResponse =  cartMapper.cartDtoToCart(cart);
        return ApiResponse.<CartResponse>builder()
                .code(1000)
                .message(" đã lấy dữ liệu CartResponse thành công!")
                .data(cartResponse)
                .build();
    }

    public ApiResponse<CartItem> updateCartItemQuantity(CartItemUpdateRequest request, @PathVariable int cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(()->new RuntimeException(" không tìm thấy cartItem"));
        if(request.getQuantity() <= 0 || cartItem.getQuantity() <= 0){
            throw new RuntimeException(" số lượng phải lớn hơn 0");
        }
        cartItem.setQuantity(request.getQuantity());


        cartItemRepository.save(cartItem);
        return ApiResponse.<CartItem>builder()
                .code(1000)
                .message("đã  update số lượng sản phẩm thành công!")
                .data(cartItem)
                .build();
    }

    public String deleteCartItemByCartId(int cartItemId){
        cartItemRepository.deleteById(cartItemId);
        return "cartItem đã được xóa ra khỏi data base!";
    }
}
