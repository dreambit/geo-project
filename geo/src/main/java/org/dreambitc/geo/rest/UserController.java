package org.dreambitc.geo.rest;

import org.dreambitc.geo.dao.user.UserService;
import org.dreambitc.geo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/{name}", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@PathVariable String name) {
        return userService.getUserByName(name);
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
