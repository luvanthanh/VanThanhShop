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

import java.util.ArrayList;
import java.util.List;

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
    public CartItem addCartItemByCartId(CartItemCreationRequest request, @PathVariable int cartId) {
        CartItem cartItem = cartItemRepository.getByCartIdAndProductId(cartId, request.getProductId())
                .orElseGet(()->{
                    CartItem newCartItem = new CartItem();
                    newCartItem.setCartId(cartId);
                    newCartItem.setProductId(request.getProductId());
                    newCartItem.setQuantity(request.getQuantity());
                    return cartItemRepository.save(newCartItem);
                });
        if(cartItem !=null ){
            cartItem.setQuantity(request.getQuantity()+cartItem.getQuantity());
        }
        return cartItemRepository.save(cartItem);
    }

//    lấy danh sách sản phẩm thông qua cartId ( vì mỗi user có 1 và chỉ 1 cartId)
    public List<CartItemResponse> getCartItemByCartId(int cartId) {
        List<CartItem> listCartItems = cartItemRepository.findByCartId(cartId);

        List<CartItemResponse> listCartItemResponses = new ArrayList<>();

        for (CartItem item : listCartItems) {

            ApiResponse<ProductResponse> product = productClient.getProductById(item.getProductId()); // gọi đến service khác
            ProductResponse productResponse = product.getData();

            CartItemResponse cartItemResponse = new CartItemResponse(
                    item.getCartItemsId(),
                    item.getProductId(),
                    productResponse.getProductImageUrl(),
                    productResponse.getProductName(),
                    productResponse.getProductPrice(),
                    item.getQuantity()
            );

            listCartItemResponses.add(cartItemResponse);
        }

        return listCartItemResponses;
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

    public CartItem updateCartItemQuantity(CartItemUpdateRequest request, @PathVariable int cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(()->new RuntimeException(" không tìm thấy cartItem"));
        if(request.getQuantity() <= 0 || cartItem.getQuantity() <= 0){
            throw new RuntimeException(" số lượng phải lớn hơn 0");
        }
        cartItem.setQuantity(request.getQuantity());


        return cartItemRepository.save(cartItem);
    }

    public String deleteCartItemByCartId(int cartItemId){
        cartItemRepository.deleteById(cartItemId);
        return "cartItem đã được xóa ra khỏi data base!";
    }

}
