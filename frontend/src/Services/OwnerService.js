import React from 'react'

export default {
    getProfile(id){
        return fetch(`http://127.0.0.1:8000/profiles/${id}/`, {
            "method": "GET",
            "headers": {
              "Authorization":  `Token ${localStorage.Token}`,
              "content-type": "application/json",
              "accept": "application/json"
            },
            // "body": data
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