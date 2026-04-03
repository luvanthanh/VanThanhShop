package Myproject.cart_service.dto.reponse;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CartResponse {
    private int cart_id;
    private String user_id;
}
