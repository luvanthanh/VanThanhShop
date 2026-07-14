package Myproject.product_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "attributes")
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  AttributeId;
    private int productId;

    private String AttributeName;
    private String AttributeValue;

}
