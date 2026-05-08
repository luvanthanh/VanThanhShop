package com.example.payment_service.service;


import com.example.payment_service.config.VNPayConfig;
import com.example.payment_service.dto.request.PaymentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VNPayService {

    private final VNPayConfig vnPayConfig;

    public String createPaymentUrl(PaymentRequest request) throws Exception {

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";

        String vnp_TxnRef = String.valueOf(System.currentTimeMillis());

        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = vnPayConfig.getTmnCode();

        long amount = (long) (request.getAmount() * 100);

        Map<String, String> vnp_Params = new HashMap<>();

        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);

        vnp_Params.put("vnp_Amount", String.valueOf(amount));

        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);

        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang");

        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");

        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.getReturnUrl());

        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        vnp_Params.put("vnp_CreateDate",
                new SimpleDateFormat("yyyyMMddHHmmss")
                        .format(new Date()));

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());

        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();

        StringBuilder query = new StringBuilder();

        for (String fieldName : fieldNames) {

            String fieldValue = vnp_Params.get(fieldName);

            hashData.append(fieldName);
            hashData.append('=');
            hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

            query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
            query.append('=');
            query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

            query.append('&');
            hashData.append('&');
        }

        hashData.deleteCharAt(hashData.length() - 1);

        query.deleteCharAt(query.length() - 1);

        String secureHash = hmacSHA512(
                vnPayConfig.getHashSecret(),
                hashData.toString());

        query.append("&vnp_SecureHash=");
        query.append(secureHash);

        return vnPayConfig.getPayUrl() + "?" + query;
    }

    public static String hmacSHA512(String key, String data) throws Exception {

        Mac hmac512 = Mac.getInstance("HmacSHA512");

        SecretKeySpec secretKey =
                new SecretKeySpec(key.getBytes(), "HmacSHA512");

        hmac512.init(secretKey);

        byte[] bytes = hmac512.doFinal(data.getBytes());

        StringBuilder hash = new StringBuilder();

        for (byte b : bytes) {
            hash.append(String.format("%02x", b));
        }

        return hash.toString();
    }
}
