package Myproject.product_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String productBrand;
    private String productName;
    private float productScreenSize;
    private String productDescription;
    private Date productReleaseDate;
    private int productWarranty;
    private String productImageThumbnail;

}
