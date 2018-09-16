/**
 * 
 */
package com.example.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Customer;

/**
 * @author ratneshc
 *
 */
@Repository
public interface CustomeRepository extends JpaRepository<Customer, Long> {

	 Customer findByUsername(String username);
	
}