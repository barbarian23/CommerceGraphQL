<!-- GETTING STARTED -->
## GraphQLSample


GraphQLSample


1. Clone the repo
   ```sh
   git clone https://github.com/barbarian23/GraphQLSample.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Start app
     ```sh
   npm start
   ```
	 `Create .env file to store credential of facebook, firebase and database connection`
	 `You can change file name .env.example to .env for testing`
5. Get Facebook credential
![image](https://user-images.githubusercontent.com/48834179/145991344-4e6accd8-00ed-4830-8f8d-e933582bfaae.PNG)
6. Get Firebase credential
![image](https://user-images.githubusercontent.com/48834179/145991931-9b1f420a-4a0e-471b-9a42-7461349c2682.PNG)
7. Install mongoDB create sample database 
   ```sh
	 You can use sample database in database folder, By using mongostore command
	 ```
	 ```sh
	 mongorestore -d TestSample /path_to_your_database/
	 ```
### Usage
This project using Facebook login as a SNS ID

#### Login via facebook
 `GET /registration`
 
#### Goto graphql to query and mutate
  `http://localhost:4000/graphql`
![image](https://user-images.githubusercontent.com/48834179/145992086-2dd9f280-3bdb-4a87-a8bc-a62e3ac5c078.PNG)
#### Get a list of products
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

#### Register a product
1. Create A product 
```sh
mutation CreateAProduct {
  insert(productName: "Toyota",
    productDetail: "Toyota I9", 
    deliveryFee: "50", 
    totalNumber: 2) 
}
```
2. Register Product to user
***(Product must exist before registering to user)***
```sh
mutation RegisterProductToUser {
  registerProduct(fToken: "token 1 send by front end",
    productName: "Toyota I9") 
}

mutation CreateAProduct {
  insert(productName: "Toyota",
    productDetail: "Toyota I9", 
    deliveryFee: "50", 
    totalNumber: 2) 
}
```

#### Subscribe notifications via Firebase token
`
mutation EnableNotification {
  enable(fToken:"token 1 send by front end") 
}
`
