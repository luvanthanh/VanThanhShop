package Myproject.product_service.Repository;

import Myproject.product_service.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute,Integer> {

}
