package org.dreambitc.geo.transfer;

public class UserCreationStatusTransfer {
    public static String STATUS_SUCCESS = "SUCCESS";
    public static String STATUS_FAILURE = "FAILURE";

    private String status;
    private String description;

    public UserCreationStatusTransfer(String status, String description) {
        this.status = status;
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }
}
