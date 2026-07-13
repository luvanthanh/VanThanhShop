package Myproject.product_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Attributes extends JpaRepository<Attributes,Integer> {

}
