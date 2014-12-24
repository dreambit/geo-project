package org.dreambitc.geo.rest;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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
import org.springframework.stereotype.Service;

@Service
@Path("/user")
public class UserController {
    private static Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authManager;

    /**
     * Returns user details by user name.
     * 
     * @param name user name to return
     * @return user details by user name
     */
    @GET
    @Path("{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserTransfer getUser(@PathParam("name") String name) {
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
    @POST
    @Path("create")
    @Produces(MediaType.APPLICATION_JSON)
    public UserCreationStatusTransfer createUser(@FormParam("name") String name, @FormParam("password") String password) {

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
    @Path("authenticate")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public TokenTransfer authenticate(@FormParam("username") String username, @FormParam("password") String password) {
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
