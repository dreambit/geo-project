package org.dreambitc.geo.dao.user;

import org.dreambitc.geo.dao.Dao;
import org.dreambitc.geo.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserDao extends Dao<User, Long>, UserDetailsService {

    User findByName(String name);

}
