package org.dreambitc.geo.transfer;

public class UserTransfer {
    private String name;

    public UserTransfer() {
    }

    public UserTransfer(String username) {
        this.name = username;
    }

    public void setUsername(String username) {
        this.name = username;
    }

    public String getUsername() {
        return name;
    }

}
