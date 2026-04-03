package Myproject.product_service.controller;


import Myproject.product_service.entity.Product;
import Myproject.product_service.request.ProductCreationRequest;
import Myproject.product_service.request.ProductUpdateRequest;
import Myproject.product_service.response.ProductResponse;
import Myproject.product_service.response.ResponseApi;
import Myproject.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    // Lấy tất cả product
    @GetMapping
    ResponseApi<List<Product>> getAllProducts(){
        return productService.getAllProducts();
    }


    //    lấy sản phẩm theo id
    @GetMapping("/getProductById/{productId}")
    public ResponseApi<ProductResponse> getProductById(@PathVariable int productId){
        return productService.getProductById(productId);
    }

    //    thêm sản phẩm
    @PostMapping
    ResponseApi<Product> addProduct(@RequestBody ProductCreationRequest request){
        return productService.createProduct(request);
    }

    //    sủa sản phẩm theo id
    @PutMapping("/updateProductById/{productId}")
    ResponseApi<Product> updateProduct(@RequestBody ProductUpdateRequest request, @PathVariable("productId") int productId){
        return productService.updateProduct(request,productId);
    }


    //    xóa sản phẩm theo id
    @DeleteMapping("/deleteProductById/{productId}")
    ResponseApi<Void> deleteProduct(@PathVariable("productId") int productId){
        return productService.deleteProduct(productId);
    }
    // lọc sản phẩm theo hãng
    @GetMapping("/getProductByBrand/{productBrand}")
    ResponseApi<List<Product>> getProductByBrand(@PathVariable("productBrand") String productBrand){
        return productService.getProductByBrand(productBrand);
    }

    //    lọc sản phâm theo giá tiền  GET /products/price-range?min=5000000&max=15000000
    @GetMapping("/getProductByPrice")
    ResponseApi<List<Product>> getProductByPrice(@RequestParam Double min, @RequestParam Double max){
        return productService.getProductByPrice(min,max);
    }

    //lọc sản phẩm theo ram product
    @GetMapping("/getProductByRam/{productRam}")
    ResponseApi<List<Product>> getProductByRam(@PathVariable("productRam") int productRam){
        return productService.getProductByRam(productRam);
    }
    //lọc sản phẩm theo rom product
    @GetMapping("/getProductByRom/{productRom}")
    ResponseApi<List<Product>> getProductByRom(@PathVariable("productRom") int productRom){
        return productService.getProductByRom(productRom);
    }
// lọc sản phẩm theo màu sắc
    @GetMapping("/getProductByColor/{productColor}")
    ResponseApi<List<Product>> getProductByColor(@PathVariable("productColor") String productColor){
        return productService.getProductByColor(productColor);
    }

//    lọc sản phẩm theo kích thước màn hình
    @GetMapping("/getProductByScreenSize")
    ResponseApi<List<Product>> getProductByScreenSize(@RequestParam float min, @RequestParam float max){
        return productService.getProductByScreenSize(min,max);
    }

    @GetMapping("/getAndSortByPrice/increase")
    ResponseApi<List<Product>> getAndSortByPrice(){
        return productService.getAndSortByPrice();
    }

    @GetMapping("/getAndSortBYPrice/decrease")
    ResponseApi<List<Product>> getAndSortBYPrice(){
        return productService.getAndSortByPrice2();
    }


}
