package Myproject.product_service.Repository;

import Myproject.product_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ProductRepository extends JpaRepository<Product,Integer>
{
   Optional<Product> findById(int id);
   List<Product> findByProductBrand(String productBrand);
    List<Product> findByProductScreenSizeBetween(float min, float max);
    List<Product> findByProductPriceBetween(Double minPrice, Double maxPrice);
    List<Product> findByProductNameContainingIgnoreCase(String name);

    @Query("""
            SELECT DISTINCT p
            FROM Product p
            JOIN p.variants v
            WHERE v.ram = :ram
            """)
    List<Product> findByProductRam(@Param("ram") int ram);

    @Query("""
        SELECT DISTINCT p
        FROM Product p
        JOIN p.variants v
        WHERE v.rom = :rom
        """)
    List<Product> findByProductRom(@Param("rom") int rom);

    @Query("""
        SELECT DISTINCT p
        FROM Product p
        JOIN p.variants v
        WHERE v.color = :color
        """)
    List<Product> findByProductColor(@Param("color") String color);


    @Query("""
    SELECT p
    FROM Product p
    JOIN p.variants v
    GROUP BY p
    ORDER BY MIN(v.price) ASC
    """)
    List<Product> sortByLowestPriceAsc();

    @Query("""
    SELECT p
    FROM Product p
    JOIN p.variants v
    GROUP BY p
    ORDER BY MIN(v.price) DESC
""")
    List<Product> sortByLowestPriceDesc();

}
