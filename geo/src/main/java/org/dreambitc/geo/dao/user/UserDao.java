package org.dreambitc.geo.dao.user;

import org.dreambitc.geo.dao.Dao;
import org.dreambitc.geo.entity.User;

public interface UserDao extends Dao<User, Long> {

    User findByName(String name);

}
