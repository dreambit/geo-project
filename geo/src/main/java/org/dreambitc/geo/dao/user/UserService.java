package org.dreambitc.geo.dao.user;

import org.dreambitc.geo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    @Autowired
    private UserDao userDao;

    /**
     * Creates new user.
     * 
     * @param name user name
     * @param password user password
     */
    public User createUser(String name, String password) {
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        return userDao.save(user);
    }

    /**
     * 
     * @param name
     * @return
     */
    public User getUserByName(String name) {
        return userDao.findByName(name);
    }

    /**
     * 
     * @param id
     * @return
     */
    public User getUserById(Long id) {
        return userDao.find(id);
    }

    public UserDetails loadUserByUsername(String username) {
        return userDao.loadUserByUsername(username);
    }
}
