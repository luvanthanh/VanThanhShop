package Myproject.user_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

@Table(name = "invalidated_token")
public class InvalidatedToken {
    @Id
    private String id;
    @Column(name = "expiry_time")
    private Date expiryTime; //thời gian hết hạn (để check nếu token hết hạn thì sẽ remove nó đi)

}
