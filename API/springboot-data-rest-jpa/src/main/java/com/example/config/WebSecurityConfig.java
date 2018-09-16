/**
 * 
 */
package com.example.config;

/**
 * @author ratneshc
 *
 */
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests()
       // .antMatchers("/").permitAll()
    
        .antMatchers(HttpMethod.GET, "/api/customer/test").permitAll() //just to test our API is up and running  
        .antMatchers(HttpMethod.POST, "/api/customer/login").permitAll()
      .antMatchers(HttpMethod.GET, "/api/**").permitAll() // Uncomment to permit all GET requests with /api/
      .antMatchers(HttpMethod.POST, "/api/**").permitAll() // Uncomment to permit all POST requests with /api/
        .anyRequest().authenticated()
        .and()
        // We filter the /api/customer/login requests --> for Authentication
        .addFilterBefore(new JWTAuthenticationFilter("/api/customer/login", authenticationManager()),
                UsernamePasswordAuthenticationFilter.class)
        // And filter other requests to check the presence of JWT in header --> for Authorization
        .addFilterBefore(new JWTAuthorizationFilter(),
                UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    // Create a default account
    auth.inMemoryAuthentication()
        .withUser("admin")
        .password("password")
        .roles("ADMIN");
  }
}