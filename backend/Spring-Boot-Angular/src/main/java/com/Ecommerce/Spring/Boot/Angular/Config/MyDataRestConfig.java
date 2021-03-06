package com.Ecommerce.Spring.Boot.Angular.Config;


import com.Ecommerce.Spring.Boot.Angular.Entity.Product;
import com.Ecommerce.Spring.Boot.Angular.Entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
            entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE} ;
        // disable Http Methods of Product PUT POST DELETE

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)) ;

        // disable Http Methods of PoductCategory PUT POST DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)) ;


        //call an internal helper methof
        exposeIds(config) ;
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity  ids


        //get a list of all entity from entity manager
        Set<javax.persistence.metamodel.EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //// create an array of entity type
        List<Class> entityClasses = new ArrayList<>();

        //get the entity type for the entities
        for(EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType()) ;
        }

        //expose the entity ids for the array of entity/domain type
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}

