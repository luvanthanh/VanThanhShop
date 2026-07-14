package Myproject.product_service.Repository;

import Myproject.product_service.entity.Image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {

}
