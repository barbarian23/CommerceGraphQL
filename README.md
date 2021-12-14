<!-- GETTING STARTED -->
## GraphQLSample


### Install


1. Clone the repo
   ```sh
   git clone https://github.com/barbarian23/GraphQLSample.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
	 `Create .env file to store credential of facebook, firebase and database connection`
	 `You can change file name .env.example to .env for testing`
3. Get Facebook credential
![image](https://user-images.githubusercontent.com/48834179/145991344-4e6accd8-00ed-4830-8f8d-e933582bfaae.PNG)
4. Get Firebase credential
![image](https://user-images.githubusercontent.com/48834179/145991931-9b1f420a-4a0e-471b-9a42-7461349c2682.PNG)
5. Install mongoDB create sample database 
   ```sh
   You can use sample database in database folder, By using mongostore command
   ```
   ```sh
   mongorestore -d TestSample /path_to_your_database/
   ```
6. Start app
     ```sh
   npm start
   ```
7. Enable sending cookie to playground 
	
	Step 1: Tap on setting icon
	![image](https://user-images.githubusercontent.com/48834179/146057680-3270c5ad-f236-4905-aaa6-e3b54d7bf8e5.PNG)
	Step 2: Set value *"same-origin"* to key *"request.credentials"*
	![image](https://user-images.githubusercontent.com/48834179/146057680-3270c5ad-f236-4905-aaa6-e3b54d7bf8e5.PNG)
	
***Important Note: If you go to directly to http://localhost:4000/playground or http://localhost:4000/graphql , you could access these pages but you can run query or mutation***

### Usage
This project using Facebook login as a SNS ID

1. Login via facebook
`GET /registration`
 
2. After login it will go to graphql **http://localhost:4000/playground**
![image](https://user-images.githubusercontent.com/48834179/146058475-32a86a1e-5a8c-4312-9d32-0459826c2604.PNG)
3. Get a list of products
`
query Product{
  products {
    productName
    productDetail
    deliveryFee
    totalNumber
  }
}
`

4. Register a product

	4.1. Create A product 
	```sh
	mutation CreateAProduct {
	  insert(productName: "Toyota",
	    productDetail: "Toyota I9", 
	    deliveryFee: "50", 
	    totalNumber: 2) 
	}
	```
	4.2. Register Product to user
	***(Product must exist before registering to user)***
	```sh
	mutation RegisterProductToUser {
	  registerProduct(fToken: "token 1 send by front end",
	    productName: "Toyota I9") 
	}
	```
5. Subscribe notifications via Firebase token
`
mutation EnableNotification {
  enable(fToken:"token 1 send by front end") 
}
`
