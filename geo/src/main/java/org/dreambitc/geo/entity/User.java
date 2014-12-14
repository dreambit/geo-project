package org.dreambitc.geo.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@javax.persistence.Entity
@Table(name = "users")
public class User implements Entity {
    private static final long serialVersionUID = -6598497629616410835L;

    @Id
    @GeneratedValue
    @JsonIgnore
    private long id;

    @Column(unique = true, length = 16, nullable = false, name = "username")
    private String name;

    @Column(length = 80, nullable = false)
    @JsonIgnore
    private String password;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPasswordHash(String passwordHash) {
        this.password = passwordHash;
    }

}
