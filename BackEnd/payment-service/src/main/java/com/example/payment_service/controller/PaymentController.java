package com.example.payment_service.controller;

import com.example.payment_service.dto.request.PaymentRequest;
import com.example.payment_service.service.VNPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final VNPayService vnPayService;

    @PostMapping("/create")
    public String createPayment(
            @RequestBody PaymentRequest request
    ) throws Exception {

        return vnPayService.createPaymentUrl(request);
    }

    @GetMapping("/vnpay-return")
    public String paymentReturn(
            @RequestParam Map<String, String> params
    ) {

        return vnPayService.handlePaymentReturn(params);
    }
}