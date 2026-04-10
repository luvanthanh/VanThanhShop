package Myproject.product_service.controller;


import Myproject.product_service.entity.Product;
import Myproject.product_service.request.ProductCreationRequest;
import Myproject.product_service.request.ProductUpdateRequest;
import Myproject.product_service.response.ProductResponse;
import Myproject.product_service.response.ApiResponse;
import Myproject.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    ApiResponse<List<Product>> getAllProducts(){
        var result =  productService.getAllProducts();
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message(" get all products Success")
                .data(result)
                .build();
    }


    @GetMapping("/getProductById/{productId}")
    public ApiResponse<ProductResponse> getProductById(@PathVariable int productId){
        var result = productService.getProductById(productId);
        return ApiResponse.<ProductResponse>builder()
                .code(1000)
                .message("get product success")
                .data(result)
                .build();
    }

    @PostMapping
    ApiResponse<ProductResponse> addProduct(@RequestBody ProductCreationRequest request){
        var result  = productService.createProduct(request);
        return ApiResponse.<ProductResponse>builder()
                .code(1000)
                .message("add product success")
                .data(result)
                .build();
    }


    @PutMapping("/updateProductById/{productId}")
    ApiResponse<Product> updateProduct(@RequestBody ProductUpdateRequest request, @PathVariable("productId") int productId){
        var result =  productService.updateProduct(request,productId);
        return ApiResponse.<Product>builder()
                .code(1000)
                .message("update product success")
                .data(result)
                .build();
    }


    @DeleteMapping("/deleteProductById/{productId}")
    ApiResponse<String> deleteProduct(@PathVariable("productId") int productId){

        var result = productService.deleteProduct(productId);
        return ApiResponse.<String>builder()
                .code(1000)
                .message("delete product success")
                .data(result)
                .build();
    }



    @GetMapping("/getProductByBrand/{productBrand}")
    ApiResponse<List<Product>> getProductByBrand(@PathVariable("productBrand") String productBrand){
        var result = productService.getProductByBrand(productBrand);
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by brand  success")
                .data(result)
                .build();
    }


    @GetMapping("/getProductByPrice")
    ApiResponse<List<Product>> getProductByPrice(@RequestParam Double min, @RequestParam Double max){
        var result =  productService.getProductByPrice(min,max);
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by price  success")
                .data(result)
                .build();
    }


    @GetMapping("/getProductByRam/{productRam}")
    ApiResponse<List<Product>> getProductByRam(@PathVariable("productRam") int productRam){
        var result = productService.getProductByRam(productRam);
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by Ram  success")
                .data(result)
                .build();
    }


    @GetMapping("/getProductByRom/{productRom}")
    ApiResponse<List<Product>> getProductByRom(@PathVariable("productRom") int productRom){
        var result = productService.getProductByRom(productRom);
        return  ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by Rom  success")
                .data(result)
                .build();
    }

    @GetMapping("/getProductByColor/{productColor}")
    ApiResponse<List<Product>> getProductByColor(@PathVariable("productColor") String productColor){
        var result = productService.getProductByColor(productColor);
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by color success")
                .data(result)
                .build();
    }


    @GetMapping("/getProductByScreenSize")
    ApiResponse<List<Product>> getProductByScreenSize(@RequestParam float min, @RequestParam float max){
        var result =  productService.getProductByScreenSize(min,max);
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by screen size success")
                .data(result)
                .build();
    }

    @GetMapping("/getAndSortByPrice/increase")
    ApiResponse<List<Product>> getAndSortByPrice(){
        var result =  productService.getAndSortByPrice();

        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by price success")
                .data(result)
                .build();
    }

    @GetMapping("/getAndSortBYPrice/decrease")
    ApiResponse<List<Product>> getAndSortBYPrice(){
        var result = productService.getAndSortByPrice2();
        return ApiResponse.<List<Product>>builder()
                .code(1000)
                .message("get product by price success")
                .data(result)
                .build();
    }
}
