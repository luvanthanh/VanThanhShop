package Myproject.product_service.service;


import Myproject.product_service.Repository.ProductRepository;
import Myproject.product_service.entity.Product;
import Myproject.product_service.mapper.ProductMapper;
import Myproject.product_service.request.ProductCreationRequest;
import Myproject.product_service.request.ProductUpdateRequest;
import Myproject.product_service.response.ProductResponse;
import Myproject.product_service.response.ResponseApi;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Builder

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

//    lấy danh sách sản phẩm
    public ResponseApi<List<Product>> getAllProducts(){
        List<Product> products = productRepository.findAll();
        System.out.println(">>> Found products: " + products.size());
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message("lấy thành công")
                .data(products)
                .build();
    }

//    lấy sản phẩm theo id
    public ResponseApi<ProductResponse> getProductById(int productId){
        Product product = productRepository.findById(productId);
        ProductResponse productResponse = new ProductResponse();
        productResponse = productMapper.toProductResponse(product);
        return ResponseApi.<ProductResponse>builder()
                .code(1000)
                .message("đã lấy product thành công !")
                .data(productResponse)
                .build();
    }

//tạo sản phẩm
    public ResponseApi<Product> createProduct(ProductCreationRequest request){
        Product product = new Product();
        product = productMapper.toProduct(request);
        product = productRepository.save(product);
        return ResponseApi.<Product>builder()
                .code(1000)
                .message("đã tạo mới sản phẩm thành công !")
                .data(product)
                .build();
    }

//    cập nhật thông tin sản phẩm
    public ResponseApi<Product> updateProduct(ProductUpdateRequest request , int productId){
        Product product = productRepository.findById(productId);

        productMapper.updateProductFromRequest(request, product);

        Product productSave = productRepository.save(product);
        return ResponseApi.<Product>builder()
                .code(1000)
                .message("đã cập nhật thông tin Product thành! ")
                .data(productSave)
                .build();
    }


//    xóa sản phẩm  theo id
    public ResponseApi<Void> deleteProduct(int productId){
        productRepository.deleteById(productId);
        return ResponseApi.<Void>builder()
                .code(1000)
                .message(" đã xóa thành công sản phẩm!")
                .build();
    }


//    lọc sản phẩm theo hãng
    public ResponseApi<List<Product>> getProductByBrand(String productBrand){
        List<Product> list = productRepository.findByProductBrand(productBrand);
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message(" lấy danh sách sản phẩm theo hãng thành công !")
                .data(list)
                .build();
    }

// lọc sản phẩm theo giá tiền
    public ResponseApi<List<Product>> getProductByPrice(double priceMin,  double priceMax){

        List<Product>  list =productRepository.findByProductPriceBetween(priceMin, priceMax);
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message("lấy danh sách sản phẩm thêm giá tiền thành công!")
                .data(list)
                .build();
    }

//   lọc sản phẩm theo Ram
    public ResponseApi<List<Product>> getProductByRam(int ram){
        List<Product> list = productRepository.findByProductRam(ram);
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message(" đã lấy dữ liệu thành công !")
                .data(list)
                .build();
    }

//    lọc sản phẩm theo rom
    public ResponseApi<List<Product>> getProductByRom(int rom){
        List<Product> list = productRepository.findByProductRom(rom);
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message(" đã lấy dữ liệu thành công!")
                .data(list)
                .build();
    }

//    lọc sản phẩm theo màu sắc
    public ResponseApi<List<Product>>  getProductByColor(String color){
        List<Product> list = productRepository.findByProductColor(color);
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message(" đã lấy dữ liệu thành công !")
                .data(list)
                .build();
    }

//    lọc sản phẩm theo kích thước màn hình
    public ResponseApi<List<Product>> getProductByScreenSize(float min, float max){
        List<Product> list = productRepository.findByProductScreenSizeBetween(min, max);
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message("đã lấy dữ liệu thành công!")
                .data(list)
                .build();
    }


    // sắp xếp theo giá tiền
    public ResponseApi<List<Product>> getAndSortByPrice(){
        List<Product> list = productRepository.findAll(Sort.by(Sort.Direction.ASC,"productPrice"));
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message("Đã lấy dữ liệu thành công")
                .data(list)
                .build();
    }

    public ResponseApi<List<Product>> getAndSortByPrice2(){
        List<Product> list = productRepository.findAll(Sort.by(Sort.Direction.DESC,"productPrice"));
        return ResponseApi.<List<Product>>builder()
                .code(1000)
                .message(" sắp xếp theo giá tiền giảm dần")
                .data(list)
                .build();
    }
}
