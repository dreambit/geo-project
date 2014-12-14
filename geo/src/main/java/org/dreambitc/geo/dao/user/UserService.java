package org.dreambitc.geo.dao.user;

import org.dreambitc.geo.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserDao userDao;

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
}
