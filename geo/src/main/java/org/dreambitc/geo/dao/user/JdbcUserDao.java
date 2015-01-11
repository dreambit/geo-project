package org.dreambitc.geo.dao.user;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.dreambitc.geo.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class JdbcUserDao extends JdbcDaoSupport implements UserDao {

    @Value("${user.select.all}")
    private String findAll;

    @Value("${user.select.by.id}")
    private String find;

    @Value("${user.select.by.name}")
    private String findByName;
 
    @Value("${user.insert}")
    private String insertUser;

    @Value("${user.delete}")
    private String deleteUser;

    private static UserRowMapper USER_ROW_MAPPER = new UserRowMapper(); 

    private static class UserRowMapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setName(rs.getString(1));
            user.setPassword(rs.getString(2));
            return user;
        }

    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<User> findAll() {
        return getJdbcTemplate().query(findAll, USER_ROW_MAPPER);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User find(Long id) {
        return getJdbcTemplate().queryForObject(find, USER_ROW_MAPPER, new Object[] {id});
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User save(User user) {
        getJdbcTemplate().update(insertUser, new Object[] {user.getName(), user.getPassword()});
        return user;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Long id) {
        getJdbcTemplate().update(deleteUser, new Object[] {id});
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByName(username);

        if (null == user) {
            throw new UsernameNotFoundException("The user with name " + username + " was not found");
        }

        return user;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User findByName(String name) {
        try {
            return getJdbcTemplate().queryForObject(findByName, USER_ROW_MAPPER, new Object[] {name});
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
