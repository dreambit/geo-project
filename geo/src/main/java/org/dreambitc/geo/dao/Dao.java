package org.dreambitc.geo.dao;

import java.util.List;

import org.dreambitc.geo.entity.Entity;

public interface Dao<T extends Entity, I> {

    /**
     * 
     * @return
     */
    List<T> findAll();

    /**
     * 
     * @param id
     * @return
     */
    T find(I id);

    /**
     * 
     * @param user
     * @return
     */
    T save(T user);

    /**
     * 
     * @param id
     */
    void delete(I id);
}
