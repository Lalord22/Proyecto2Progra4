/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.api.ApiUsuario;
import com.progra.countries.logic.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */

const mysql = require('mysql');

class UserDao {
    
    RelDatabase db;
  
    public UserDao(RelDatabase db){
        this.db= db;
    }

 getUsers() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(this.dbConfig);

    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }

      connection.end();
    });
  });
}


  getUserById(userId) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(this.dbConfig);

      connection.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }

        connection.end();
      });
    });
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(this.dbConfig);

      connection.query('INSERT INTO users SET ?', user, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }

        connection.end();
      });
    });
  }

  updateUser(userId, user) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(this.dbConfig);

      connection.query('UPDATE users SET ? WHERE id = ?', [user, userId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows);
        }

        connection.end();
      });
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(this.dbConfig);

      connection.query('DELETE FROM users WHERE id = ?', [userId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows);
        }

        connection.end();
      });
    });
  }
}

module.exports = UserDao;
