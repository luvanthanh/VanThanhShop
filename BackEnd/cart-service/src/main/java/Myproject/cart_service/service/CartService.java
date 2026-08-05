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
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final ProductClient productClient;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartMapper cartMapper;

    public CartService(ProductClient productClient,
                       CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       CartMapper cartMapper) {
        this.productClient = productClient;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartMapper = cartMapper;
    }


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
    public CartItem addCartItemByCartId(CartItemCreationRequest request, int cartId) {
        ApiResponse<ProductResponse> productResponse = productClient.getProductById(request.getProductId());

        if (productResponse == null || productResponse.getData() == null) {
            throw new RuntimeException("Product service không trả về dữ liệu sản phẩm!");
        }

        ProductResponse product = productResponse.getData();
        if (product.getProductVariantResponses() == null || product.getProductVariantResponses().isEmpty()) {
            throw new RuntimeException("Sản phẩm không có biến thể hợp lệ để thêm vào giỏ hàng!");
        }

        var variant = product.getProductVariantResponses().get(0);
        if (variant.getProductStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Số lượng sản phẩm trong kho không đủ!");
        }

        CartItem cartItem = cartItemRepository.getByCartIdAndProductId(cartId, product.getProductId())
                .orElse(null);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCartId(cartId);
            cartItem.setProductId(request.getProductId());
            cartItem.setQuantity(request.getQuantity());
            cartItem.setProductName(product.getProductName());
            cartItem.setProductImage(product.getProductImageThumbnail());
            cartItem.setProductPrice(BigDecimal.valueOf(variant.getProductPrice()));
        } else {
            cartItem.setQuantity(Math.addExact(cartItem.getQuantity(), request.getQuantity()));
            cartItem.setProductPrice(BigDecimal.valueOf(variant.getProductPrice()));
        }
        return cartItemRepository.save(cartItem);
    }

//    lấy danh sách sản phẩm thông qua cartId ( vì mỗi user có 1 và chỉ 1 cartId)
    public List<CartItemResponse> getCartItemByCartId(int cartId) {
        List<CartItem> listCartItems = cartItemRepository.findByCartId(cartId);
        List<CartItemResponse> listCartItemResponse = new ArrayList<>();
        for (CartItem cartItem : listCartItems) {
            CartItemResponse cartItemResponse = cartMapper.toCartItemResponse(cartItem);
            listCartItemResponse.add(cartItemResponse);
        }
        return listCartItemResponse;
    }

    public CartResponse getCartByUserId(String userId) {
        Cart cart = cartRepository.getCartsByUserId(userId)
                .orElseThrow(() -> new RuntimeException("không tìm thấy cart"));
        return cartMapper.toCartResponse(cart);
    }

    public CartItem updateCartItemQuantity(CartItemUpdateRequest request, int cartItemId) {
        CartItem cartItem = cartItemRepository.findByCartItemsId(cartItemId)
                .orElseThrow(() -> new RuntimeException("không tìm thấy cartItem"));
        if (request.getProductQuantity() <= 0) {
            throw new RuntimeException("Số lượng phải lớn hơn 0");
        }
        cartItem.setQuantity(request.getProductQuantity());
        return cartItemRepository.save(cartItem);
    }

    public String deleteCartItemByCartId(int cartItemId){
        cartItemRepository.deleteById(cartItemId);
        return "cartItem đã được xóa ra khỏi data base!";
    }
}
