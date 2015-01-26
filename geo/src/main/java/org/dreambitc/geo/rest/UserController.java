package org.dreambitc.geo.rest;

import org.dreambitc.geo.dao.user.UserService;
import org.dreambitc.geo.entity.User;
import org.dreambitc.geo.secure.TokenUtils;
import org.dreambitc.geo.transfer.TokenTransfer;
import org.dreambitc.geo.transfer.UserCreationStatusTransfer;
import org.dreambitc.geo.transfer.UserTransfer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
    private static Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authManager;

    /**
     * Retrieves the currently logged in user.
     * 
     * @return A transfer containing the username and the roles.
     */
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public UserTransfer getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof String && ((String) principal).equals("anonymousUser")) {
            
        }
        UserDetails userDetails = (UserDetails) principal;

        return new UserTransfer(userDetails.getUsername());
    }

    /**
     * Returns user details by user name.
     * 
     * @param name user name to return
     * @return user details by user name
     */
    @RequestMapping(value = "{name}", method = RequestMethod.GET)
    @ResponseBody
    public UserTransfer getUser(@PathVariable("name") String name) {
        User user = userService.getUserByName(name);
        return new UserTransfer(user.getName());
    }

    /**
     * Creates new user.
     * 
     * @param name user name
     * @param password user password
     * @return user creation status
     */
    @RequestMapping(value = "create", method = RequestMethod.POST)
    @ResponseBody
    public UserCreationStatusTransfer createUser(@RequestParam(value = "name", required = true) String name,
                                                 @RequestParam(value = "password", required = true) String password) {

        // if user already exists 
        if (userService.getUserByName(name) != null) {
            return new UserCreationStatusTransfer(UserCreationStatusTransfer.STATUS_FAILURE,
                                                  "User with specified name already exists");
        }

        try {
            userService.createUser(name, password);
            return new UserCreationStatusTransfer(UserCreationStatusTransfer.STATUS_SUCCESS,
                                                  "User was successfuly created");
        } catch (Exception e) {
            LOGGER.error("User creation exception", e);
            return new UserCreationStatusTransfer(UserCreationStatusTransfer.STATUS_FAILURE,
                                                  "Unknown error: User creation failed");
        }
    }

    /**
     * Authenticates a user and creates an authentication token.
     * 
     * @param username
     *            the name of the user.
     * @param password
     *            the password of the user.
     * @return a transfer containing the authentication token.
     */
    @RequestMapping(value = "authenticate", method = RequestMethod.POST)
    @ResponseBody
    public TokenTransfer authenticate(@RequestParam(value = "email", required = true) String username,
                                      @RequestParam(value = "password", required = true) String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = this.authManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        /*
         * Reload user as password of authentication principal will be null after authorization and
         * password is needed for token generation
         */
        UserDetails userDetails = this.userService.loadUserByUsername(username);

        return new TokenTransfer(TokenUtils.createToken(userDetails));
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
