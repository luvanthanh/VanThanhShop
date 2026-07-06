package Myproject.product_service.service;


import Myproject.product_service.Repository.ProductRepository;
import Myproject.product_service.entity.Product;
import Myproject.product_service.mapper.ProductMapper;
import Myproject.product_service.request.ProductCreationRequest;
import Myproject.product_service.request.ProductUpdateRequest;
import Myproject.product_service.response.ProductResponse;

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


    public  List<Product> getAllProducts(){
        List<Product> products = productRepository.findAll();
        if(products.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return products;
        }
    }


    public ProductResponse getProductById(int productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("product not found"));

        return productMapper.toProductResponse(product);

    }

//tạo sản phẩm
    public ProductResponse createProduct(ProductCreationRequest request){

        Product product = productMapper.toProduct(request);
        product = productRepository.save(product);

        return productMapper.toProductResponse(product);
    }


    public Product updateProduct(ProductUpdateRequest request , int productId){
        Product product = productRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException((" product chưa tồn tại !")));
        productMapper.updateProductFromRequest(request, product);
        return  productRepository.save(product);
    }


    public String  deleteProduct(int productId){
        productRepository.deleteById(productId);
        return " delete this product successful";
    }



    public List<Product> getProductByBrand(String productBrand){
        List<Product> list = productRepository.findByProductBrand(productBrand);
        if (list.isEmpty()){
            throw new RuntimeException("Don't have any products");
        }
        else {
            return list;
        }
    }


    public List<Product> getProductByPrice(double priceMin, double priceMax){

        List<Product> list =productRepository.findByProductPriceBetween(priceMin, priceMax);
        if( list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return list;
        }
    }


    public List<Product> getProductByRam(int ram){
        List<Product> list = productRepository.findByProductRam(ram);
        if ( list.isEmpty()){
        throw new RuntimeException(" don't have any products");
        }
        else {
            return list;
        }
    }

    public List<Product> getProductByRom(int rom){
        List<Product> list = productRepository.findByProductRom(rom);
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return list;
        }
    }


    public List<Product> getProductByColor(String color){
        List<Product> list = productRepository.findByProductColor(color);
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return list;
        }
    }


    public List<Product> getProductByScreenSize(float min, float max){
        List<Product> list = productRepository.findByProductScreenSizeBetween(min, max);
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return list;
        }
    }



    public List<Product> getAndSortByPrice(){
        List<Product> list = productRepository.findAll(Sort.by(Sort.Direction.ASC,"productPrice"));
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return list;
        }
    }

    public List<Product> getAndSortByPrice2(){
        List<Product> list = productRepository.findAll(Sort.by(Sort.Direction.DESC,"productPrice"));
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            return list;
        }
    }

    public List<Product> getProductByName(String name){
        return  productRepository.findByProductNameContainingIgnoreCase(name);

    }
}
