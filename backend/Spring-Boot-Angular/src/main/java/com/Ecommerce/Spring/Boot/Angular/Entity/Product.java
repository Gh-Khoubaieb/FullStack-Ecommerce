package com.Ecommerce.Spring.Boot.Angular.Entity;

import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="Product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name ;

    @Column(name = "sku")
    private String sku ;

    @Column(name = "description")
    private String description ;

    @Column(name = "unit_price")
    private BigDecimal unitPrice ;

    @Column(name = "image_url")
    private String imageUrl ;

    @Column(name = "active")
    private boolean active ;

    @Column(name = "units_in_stock")
    private int unitsInStock ;

    @Column(name = "date_created")
    @UpdateTimestamp
    private Date dateCreated ;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;
}
