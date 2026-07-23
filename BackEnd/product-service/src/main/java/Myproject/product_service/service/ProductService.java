package Myproject.product_service.service;

import java.util.ArrayList;
import Myproject.product_service.Repository.AttributeRepository;
import Myproject.product_service.Repository.ImageRepository;
import Myproject.product_service.Repository.ProductRepository;
import Myproject.product_service.Repository.ProductVariantRepository;
import Myproject.product_service.entity.Attribute;
import Myproject.product_service.entity.Image;
import Myproject.product_service.entity.Product;
import Myproject.product_service.entity.ProductVariant;
import Myproject.product_service.mapper.AttributeMapper;
import Myproject.product_service.mapper.ImageMapper;
import Myproject.product_service.mapper.ProductMapper;
import Myproject.product_service.mapper.ProductVariantMapper;
import Myproject.product_service.request.*;
import Myproject.product_service.response.ProductResponse;

import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Builder
@RequiredArgsConstructor
public class ProductService {

    private ProductMapper productMapper;
    private ImageMapper imageMapper;
    private AttributeMapper attributeMapper;
    private ProductVariantMapper productVariantMapper;

    private ProductRepository productRepository;
    private ImageRepository imageRepository;
    private AttributeRepository attributeRepository;
    private ProductVariantRepository productVariantRepository;


//    lấy toàn bộ sản phẩm
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

//tạo sản phẩm mới
    @Transactional
    public ProductResponse createProduct(ProductCreationRequest request){

        Product product = productMapper.toProduct(request);
        product = productRepository.save(product);

        List<ImageCreationRequest> imageRequests = request.getImages();
        List<AttributeCreationRequest> attributeRequests = request.getAttributes();
        List<ProductVariantCreationRequest> variantRequests = request.getVariants();

        if(imageRequests != null){
            for (ImageCreationRequest imageRequest : imageRequests){
                Image image = imageMapper.toImage(imageRequest);
                image.setProduct(product);
                imageRepository.save(image);
            }
        }
        if(attributeRequests != null){
            for (AttributeCreationRequest attributeRequest : attributeRequests){
                Attribute attribute = attributeMapper.toAttribute(attributeRequest);
                attribute.setProduct(product);
                attributeRepository.save(attribute);
            }
        }
        if(variantRequests != null){
            for (ProductVariantCreationRequest variantRequest : variantRequests){
                ProductVariant productVariant = productVariantMapper.toProductVariant(variantRequest);
                productVariant.setProduct(product);
                productVariantRepository.save(productVariant);

            }
        }
        return productMapper.toProductResponse(product);
    }


//    sửa sản phẩm
    @Transactional
    public ProductResponse updateProduct(ProductUpdateRequest request , int productId){
        Product product = productRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException((" product chưa tồn tại !")));

        productMapper.toUpdateProduct(product,request);

        productRepository.save(product);
        if(request.getImages() != null){
            imageRepository.deleteByProduct(product);
            for(ImageCreationRequest imageCreationRequest : request.getImages()){
                Image image  = imageMapper.toImage(imageCreationRequest);
                image.setProduct(product);
                imageRepository.save(image);
            }
        }

        if(request.getAttributes() != null){
            attributeRepository.deleteByProduct(product);
            for (AttributeCreationRequest attributeCreationRequest : request.getAttributes()){
                Attribute attribute = attributeMapper.toAttribute(attributeCreationRequest);
                attribute.setProduct(product);
                attributeRepository.save(attribute);
            }
        }
        if(request.getVariants() != null){
            productVariantRepository.deleteByProduct(product);
            for(ProductVariantCreationRequest variantCreationRequest : request.getVariants()){
                ProductVariant productVariant = productVariantMapper.toProductVariant(variantCreationRequest);
                productVariant.setProduct(product);
                productVariantRepository.save(productVariant);
            }
        }
        return productMapper.toProductResponse(product);
    }
    
//     xóa sản phẩm
    @Transactional
    public String deleteProduct(int productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("product not found"));

        imageRepository.deleteByProduct(product);
        productVariantRepository.deleteByProduct(product);
        attributeRepository.deleteByProduct(product);
        productRepository.delete(product);
        return " the product has been delete in database";
    }


//    tìm kiếm sản phẩm theo hãng
    public List<ProductResponse> getProductByBrand(String productBrand){
        List<Product> listProducts = productRepository.findByProductBrand(productBrand);

        List<ProductResponse> listProductResponse = new ArrayList<>();

        if (listProducts.isEmpty()){
            throw new RuntimeException("Don't have any products");
        }
        else {
            for(Product product: listProducts){
                ProductResponse productResponse = productMapper.toProductResponse(product);
                listProductResponse.add(productResponse);
            }
            return listProductResponse;
        }
    }


    public List<ProductResponse> getProductByPrice(double priceMin, double priceMax){

        List<Product> list =productRepository.findByProductPriceBetween(priceMin, priceMax);
        List<ProductResponse> listProductResponse = new ArrayList<>();

        if( list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
        else{
            for(Product product: list){
                ProductResponse productResponse = productMapper.toProductResponse(product);
                listProductResponse.add(productResponse);
            }
            return listProductResponse;
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
