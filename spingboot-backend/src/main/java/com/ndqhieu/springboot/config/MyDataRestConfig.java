package com.ndqhieu.springboot.config;

import com.ndqhieu.springboot.model.Country;
import com.ndqhieu.springboot.model.Product;
import com.ndqhieu.springboot.model.ProductCategory;
import com.ndqhieu.springboot.model.State;
import org.hibernate.type.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig  implements RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH };

        disableHttpMethods(config, Product.class , theUnsupportedActions);
        disableHttpMethods(config, ProductCategory.class , theUnsupportedActions);
        disableHttpMethods(config, Country.class , theUnsupportedActions);
        disableHttpMethods(config, State.class , theUnsupportedActions);
//        exposeId(config);
//        config.exposeIdsFor(Product.class, ProductCategory.class);
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream()
                .map(Type::getJavaType)
                .toArray(Class[]::new));

        //CORS GLOBAL SETTING
        //config.getBasePath()
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(RepositoryRestConfiguration config, Class<?> type ,HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(type)
                .withItemExposure( (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
//    private void exposeId(RepositoryRestConfiguration config) {
//        //get a list of all entity classes for the entity manager
//        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
//
//        List<Class> entityClasses = new ArrayList<>();
//
//        for(EntityType entityType: entities){
//            entityClasses.add(entityType.getJavaType());
//        }
//
//        Class[] domainTypes = entityClasses.toArray(new Class[0]);
//        config.exposeIdsFor(domainTypes);
//    }
}
