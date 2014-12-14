package org.dreambitc.geo.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.dreambitc.geo.entity.Entity;
import org.springframework.transaction.annotation.Transactional;

public class JpaDao<T extends Entity, I> implements Dao<T, I> {

    @PersistenceContext
    protected EntityManager entityManager;

    protected Class<T> entityClass;

    public JpaDao(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    @Transactional(readOnly = true)
    @Override
    public List<T> findAll() {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(this.entityClass);

        criteriaQuery.from(this.entityClass);

        TypedQuery<T> typedQuery = entityManager.createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }

    @Transactional(readOnly = true)
    @Override
    public T find(I id) {
        return entityManager.find(this.entityClass, id);
    }

    @Transactional
    @Override
    public T save(T entity) {
        return entityManager.merge(entity);
    }

    @Transactional
    @Override
    public void delete(I id) {

        if (id == null) {
            return;
        }

        T entity = this.find(id);
        if (entity == null) {
            return;
        }

        entityManager.remove(entity);
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
