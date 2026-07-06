package Myproject.product_service.Repository;

import Myproject.product_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ProductRepository extends JpaRepository<Product,Integer>
{
   Optional<Product>  findById(int id);
   List<Product> findByProductBrand(String brand);
   List<Product> findByProductPriceBetween(Double minPrice, Double maxPrice);
   List<Product> findByProductRam(int ram);
   List<Product>  findByProductRom(int rom);
   List<Product> findByProductColor(String Color);
   List<Product> findByProductScreenSizeBetween(float min, float max);
   List<Product> findByProductNameContainingIgnoreCase(String name);
}
