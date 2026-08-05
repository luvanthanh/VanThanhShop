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
    ProductService productService;

//    lấy toàn bộ sản phẩm
    @GetMapping
    ApiResponse<List<ProductResponse>> getAllProducts(){
        var result =  productService.getAllProducts();
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message(" get all products Success")
                .data(result)
                .build();
    }
// lấy sản phẩm theo id
    @GetMapping("/id/{productId}")
    public ApiResponse<ProductResponse> getProductById(@PathVariable int productId){
        var result = productService.getProductById(productId);
        return ApiResponse.<ProductResponse>builder()
                .code(1000)
                .message("get product success")
                .data(result)
                .build();
    }

//    thêm sản phẩm mới
    @PostMapping("/post")
    ApiResponse<ProductResponse> addProduct(@RequestBody ProductCreationRequest request){
        var result  = productService.createProduct(request);
        return ApiResponse.<ProductResponse>builder()
                .code(1000)
                .message("add product success")
                .data(result)
                .build();
    }

// tìm kiếm theo tên
    @GetMapping("/name/{name}")
    ApiResponse<List<ProductResponse>> getProductByName(@PathVariable String name){
        var  result = productService.getProductByName(name);
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product success")
                .data(result)
                .build();
    }

//    sửa theo id
    @PutMapping("/update/{productId}")
    ApiResponse<ProductResponse> updateProduct(@RequestBody ProductUpdateRequest request, @PathVariable("productId") int productId){
        var result =  productService.updateProduct(request,productId);
        return ApiResponse.<ProductResponse>builder()
                .code(1000)
                .message("update product success")
                .data(result)
                .build();
    }

// xóa theo id
    @DeleteMapping("/delete/{productId}")
    ApiResponse<String> deleteProduct(@PathVariable("productId") int productId){

        var result = productService.deleteProduct(productId);
        return ApiResponse.<String>builder()
                .code(1000)
                .message("delete product success")
                .data(result)
                .build();
    }


// Tìm kiếm sản phẩm theo hãng
    @GetMapping("/brand/{productBrand}")
    ApiResponse<List<ProductResponse>> getProductByBrand(@PathVariable("productBrand") String productBrand){
        var result = productService.getProductByBrand(productBrand);
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by brand  success")
                .data(result)
                .build();
    }



//    tìm kiếm theo giá.
    @GetMapping("/price")
    ApiResponse<List<ProductResponse>> getProductByPrice(@RequestParam Double min, @RequestParam Double max){
        var result =  productService.getProductByPrice(min,max);
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by price  success")
                .data(result)
                .build();
    }


    @GetMapping("/ram/{productRam}")
    ApiResponse<List<ProductResponse>> getProductByRam(@PathVariable("productRam") int productRam){
        var result = productService.getProductByRam(productRam);
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by Ram  success")
                .data(result)
                .build();
    }


    @GetMapping("/rom/{productRom}")
    ApiResponse<List<ProductResponse>> getProductByRom(@PathVariable("productRom") int productRom){
        var result = productService.getProductByRom(productRom);
        return  ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by Rom  success")
                .data(result)
                .build();
    }

    @GetMapping("/color/{productColor}")
    ApiResponse<List<ProductResponse>> getProductByColor(@PathVariable("productColor") String productColor){
        var result = productService.getProductByColor(productColor);
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by color success")
                .data(result)
                .build();
    }


    @GetMapping("/screen")
    ApiResponse<List<ProductResponse>> getProductByScreenSize(@RequestParam float min, @RequestParam float max){
        var result =  productService.getProductByScreenSize(min,max);
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by screen size success")
                .data(result)
                .build();
    }

    @GetMapping("/sort/price/create")
    ApiResponse<List<ProductResponse>> getAndSortByPrice(){
        var result =  productService.getAndSortByPrice();

        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by price success")
                .data(result)
                .build();
    }

    @GetMapping("/sort/price/decrease")
    ApiResponse<List<ProductResponse>> getAndSortBYPrice(){
        var result = productService.getAndSortByPrice2();
        return ApiResponse.<List<ProductResponse>>builder()
                .code(1000)
                .message("get product by price success")
                .data(result)
                .build();
    }

}
