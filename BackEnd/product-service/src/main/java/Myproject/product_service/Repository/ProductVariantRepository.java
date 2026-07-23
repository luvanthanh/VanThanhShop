package Myproject.product_service.Repository;

import Myproject.product_service.entity.Product;
import Myproject.product_service.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant,Integer> {
    void deleteByProduct(Product product);


}
