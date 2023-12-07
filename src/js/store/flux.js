const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			addContact: newContact => {
				const tempStore = getStore();
				console.log(newContact);
				fetch("https://assets.breatheco.de/apis/fake/contact", {
					method: "POST",
					body: JSON.stringify(newContact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/camilla_w")
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								setStore({ contacts: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			// .then(() => getActions().initialData())

			// .catch(function(error) {
			// 	console.log("Looks like there was a problem: \n", error);
			// });

			// delete function
			deleteContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, { method: "DELETE" })
					.then(response => response.json())
					.then(response => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/camilla_w")
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								setStore({ contacts: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					});
			},
			editContact: (editedContact, id) => {
				console.log(editedContact);
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(editedContact)
				})
					.then(() => getActions().initialData())
					// getActions gives you access to line 7, with a dot you get to access initialData
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},

			initialData: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/camilla_w")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON

						setStore({ contacts: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			}
		}
	};
};

export default getState;