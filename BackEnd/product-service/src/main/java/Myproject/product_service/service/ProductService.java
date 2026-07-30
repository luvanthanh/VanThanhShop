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
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Builder
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;
    private final ImageMapper imageMapper;
    private final AttributeMapper attributeMapper;
    private final ProductVariantMapper productVariantMapper;

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final AttributeRepository attributeRepository;
    private final ProductVariantRepository productVariantRepository;


//    lấy toàn bộ sản phẩm
    @Transactional
    public  List<ProductResponse> getAllProducts(){
        List<Product> products = productRepository.findAll();
        if(products.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return productMapper.toProductResponseList(products);
    }

// lấy sản phẩm theo id
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

        productMapper.updateProductFromRequest(request,product);

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

        if (listProducts.isEmpty()){
            throw new RuntimeException("Don't have any products");
        }
            return productMapper.toProductResponseList(listProducts);
    }

// lọc theo giá sản phẩm
    public List<ProductResponse> getProductByPrice(double priceMin, double priceMax){
        List<Product> list =productRepository.findByProductPriceBetween(priceMin, priceMax);

        if( list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return productMapper.toProductResponseList(list);
    }

// lọc sản phẩm theo ram
    public List<ProductResponse> getProductByRam(int ram){
        List<Product> list = productRepository.findByProductRam(ram);

        if ( list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return productMapper.toProductResponseList(list);
    }

//    lọc sản phẩm theo rom
    public List<ProductResponse> getProductByRom(int rom){
        List<Product> list = productRepository.findByProductRom(rom);


        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }

            return productMapper.toProductResponseList(list);
    }

// lọc sản phẩm theo màu
    public List<ProductResponse> getProductByColor(String color){
        List<Product> list = productRepository.findByProductColor(color);
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return  productMapper.toProductResponseList(list);
    }

// lọc sản phẩm theo size màn hình.
    public List<ProductResponse> getProductByScreenSize(float min, float max){
        List<Product> list = productRepository.findByProductScreenSizeBetween(min, max);

        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return  productMapper.toProductResponseList(list);
    }


// lọc sản phẩm theo giá tăng dần.
    public List<ProductResponse> getAndSortByPrice(){
        List<Product> list = productRepository.sortByLowestPriceAsc();
        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return  productMapper.toProductResponseList(list);
    }

// lọc sản phẩm theo giá giảm dần.
    public List<ProductResponse> getAndSortByPrice2(){
        List<Product> list = productRepository.sortByLowestPriceDesc();

        if(list.isEmpty()){
            throw new RuntimeException(" don't have any products");
        }
            return  productMapper.toProductResponseList(list);
    }

//     tìm kiếm theo tên.
    public List<ProductResponse> getProductByName(String name){
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(name);

        if(products.isEmpty()){
            throw new RuntimeException(" don't have any products");

        }
        return  productMapper.toProductResponseList(products);
    }
}
