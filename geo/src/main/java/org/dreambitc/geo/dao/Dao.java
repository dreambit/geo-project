package org.dreambitc.geo.dao;

import java.util.List;

import org.dreambitc.geo.entity.Entity;

public interface Dao<T extends Entity, I> {

    List<T> findAll();

    T find(I id);

    T save(T newsEntry);

    void delete(I id);
}
