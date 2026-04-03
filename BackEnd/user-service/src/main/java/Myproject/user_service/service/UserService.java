package Myproject.user_service.service;

import Myproject.user_service.dto.reponse.UserResponse;
import Myproject.user_service.dto.request.UserCreationRequest;
import Myproject.user_service.dto.request.UserUpdateRequest;
import Myproject.user_service.entity.User;
import Myproject.user_service.entity.enums.Role;
import Myproject.user_service.exception.AppException;
import Myproject.user_service.exception.ErrorCode;
import Myproject.user_service.mapper.UserMapper;
import Myproject.user_service.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;


//    thêm user mới
    public UserResponse addUser(@RequestBody UserCreationRequest request){
        if(userRepository.existsByUserName(request.getUserName()))
            throw new AppException(ErrorCode.USER_EXITS);

        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10); // tạo passwordEncoder
        user.setUserPassword(passwordEncoder.encode(request.getUserPassword())); // set password cho user khi truyền request vào;

        HashSet<String> roles = new HashSet<>();
        roles.add(Role.USER.name());
        user.setRoles(roles);

        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

// lấy all user
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        log.info("In methor get all users");

        List<User> listUser = userRepository.findAll();
        return listUser;
    }

//    lấy user theo userId
    @PostAuthorize("returnObject.userName == authentication.name")
    public UserResponse getUserById(String userId){
        log.info("In methor get user by id: "+userId);

        User user = userRepository.findByUserId(userId)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOTFIND));

        return userMapper.toUserResponse(user);
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUserName(name)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOTFIND));
        return userMapper.toUserResponse(user);

    }



//    sửa thông tin user
    public UserResponse updateUserById(@RequestBody UserUpdateRequest request, String userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new AppException(ErrorCode.USER_EXITS));
        user = userMapper.toUpdateUser(user,request);

        if(request.getUserPassword() != null && !request.getUserPassword().isEmpty()){
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            user.setUserPassword(passwordEncoder.encode(request.getUserPassword()));
        }
        return userMapper.toUserResponse(userRepository.save(user));
    }

//    xóa thông tin user
    public String deletedUserById(String userId){
        User user = userRepository.findByUserId(userId)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOTFIND));
        userRepository.delete(user);
        return " user has been deleted ";
    }

}
