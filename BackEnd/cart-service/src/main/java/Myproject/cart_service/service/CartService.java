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
    public CartResponse createdCartByUserId(String userId){
        Cart cart = cartRepository.getCartsByUserId(userId)
                .orElseGet(()->{
                    Cart newCart =new Cart();
                    newCart.setUserId(userId);
                    return cartRepository.save(newCart);
                });

         return cartMapper.toCartResponse(cart);
    }

   // thêm cartItem bởi bằng cartId
    public CartItem addCartItemByCartId(CartItemCreationRequest request, @PathVariable int cartId) {
        ApiResponse<ProductResponse> productResponse = productClient.getProductById(request.getProductId());

        if(productResponse == null ){
            throw new RuntimeException("product don't have find athor service !");
        }

        ProductResponse product = productResponse.getData();
        if(product.getProductStockQuantity() < request.getQuantity()){
            throw new RuntimeException("lỗi số lượng cho kho không đủ!");
        }

        CartItem cartItem = cartItemRepository.getByCartIdAndProductId(cartId,product.getProductId())
                .orElse(null);
        if(cartItem == null){
            cartItem = new CartItem();
            cartItem.setCartId(cartId);
            cartItem.setProductId(request.getProductId());
            cartItem.setQuantity(request.getQuantity());

            cartItem.setProductName(product.getProductName());
            cartItem.setProductImage(product.getProductImage());
            cartItem.setProductPrice(product.getProductPrice());
            cartItem.setQuantity(request.getQuantity());

        }
        else{
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        }
        return cartItemRepository.save(cartItem);
    }

//    lấy danh sách sản phẩm thông qua cartId ( vì mỗi user có 1 và chỉ 1 cartId)
    public List<CartItemResponse> getCartItemByCartId(int cartId) {
        List<CartItem> listCartItems = cartItemRepository.findByCartId(cartId);
        List<CartItemResponse> listCartItemResponse = new ArrayList<>();
        if(listCartItems == null){
            throw new RuntimeException(" don't have find athor service !");
        }
        else{
            for(CartItem cartItem : listCartItems){
                CartItemResponse cartItemResponse = cartMapper.toCartItemResponse(cartItem);
                listCartItemResponse.add(cartItemResponse);
            }
            return listCartItemResponse;
        }
    }

    public CartResponse getCartByUserId(@PathVariable String userId) {
        Cart cart = cartRepository.getCartsByUserId(userId)
                .orElseThrow(()-> new RuntimeException(" không tìm thấy cart"));
        return cartMapper.toCartResponse(cart);
    }

    public CartItem updateCartItemQuantity(CartItemUpdateRequest request, @PathVariable int cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(()->new RuntimeException(" không tìm thấy cartItem"));
        if(request.getQuantity() <= 0 || cartItem.getQuantity() <= 0){
            throw new RuntimeException(" số lượng phải lớn hơn 0");
        }
        cartItem.setQuantity(request.getQuantity());
       return  cartItemRepository.save(cartItem);
    }
    public String deleteCartItemByCartId(int cartItemId){
        cartItemRepository.deleteById(cartItemId);
        return "cartItem đã được xóa ra khỏi data base!";
    }
}
