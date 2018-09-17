const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    getUser: {
        value: (username, password) => {
            return fetch(`${remoteURL}/users?username=${username}&password=${password}`)
            .then(res => res.json())
        }
    },
    checkUser: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
            .then(res => res.json())
        }
    },
    getUserData: {
        value: (resource, userId) => {
            return fetch(`${remoteURL}/users/${userId}/${resource}?_sort=name&_order=asc`)
            .then(res => res.json())
        }
    },
    add: {
        value: (resource, object) => {
            return fetch(`${remoteURL}/${resource}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(res => res.json())
        }
    },
    delete: {
        value: (resource, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "DELETE"
            })
            .then(r => r.json())
        }
    },
    patch: {
        value: (resource, newObject, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(e => e.json())
        }
    },
})