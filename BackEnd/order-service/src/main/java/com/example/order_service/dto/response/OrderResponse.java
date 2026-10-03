    package com.example.order_service.dto.response;


    import com.example.order_service.dto.request.OrderDetailCreationRequest;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.extern.slf4j.Slf4j;

    import java.time.LocalDateTime;
    import java.util.List;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Slf4j
    public class OrderResponse {
        private String orderId;
        private String shopAddress;

        private String note;
        private String customerName;
        private String deliveryAddress;
        private String customerPhoneNumber;

        private String paymentMethod;
        private Double totalMoney;
        private LocalDateTime createdAt = LocalDateTime.now();
        private String order_status;

        private String userId; // lấy danh sách order
        private int cartId; // sẽ lấy listCartItem bằng CartID

        private List<OrderDetailsResponse> orderDetails;
    }
