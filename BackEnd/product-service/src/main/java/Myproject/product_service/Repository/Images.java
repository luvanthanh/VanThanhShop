package Myproject.product_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Images extends JpaRepository<Images,Integer> {
}
