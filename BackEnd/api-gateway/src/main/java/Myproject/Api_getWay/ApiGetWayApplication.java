package Myproject.Api_getWay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ApiGetWayApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiGetWayApplication.class, args);
	}

}
