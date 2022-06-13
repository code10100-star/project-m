import React from 'react'

export default {
    login(data){
        return fetch("http://127.0.0.1:8000/auth/", {
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "accept": "application/json"
            },
            "body": data
          })
          .then(response => response.json())
          .then(response => {
            // this.setState({
            //   friends: response
            // })
            console.log(response)
          })
          .catch(err => { console.log(err); 
          });
    },
    register(data){
        console.log(data)
        return fetch("http://127.0.0.1:8000/register/", {
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "accept": "application/json"
            },
            "body": data
          })
          .then(response => response.json())
          .then(response => {
            // this.setState({
            //   friends: response
            // })
            console.log(response)
          })
          .catch(err => { console.log(err); 
          });
    }
}