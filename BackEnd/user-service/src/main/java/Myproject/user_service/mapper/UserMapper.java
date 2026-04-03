package Myproject.user_service.mapper;

import Myproject.user_service.dto.reponse.UserResponse;
import Myproject.user_service.dto.request.UserCreationRequest;
import Myproject.user_service.dto.request.UserUpdateRequest;
import Myproject.user_service.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "Spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "userPassword" ,ignore = true)
    User toUser(UserCreationRequest request);
    User toUpdateUser(@MappingTarget User user, UserUpdateRequest request);
    UserResponse toUserResponse(User user);

}
