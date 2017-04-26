# Foo-Cypter

In our project, we will create a Crypto-ransomware, that will be made in NodeJS. Since it is in javascript, the ransomware will be an executable, right out of the box. The ransomware will encrpt all files with a .foo extensions to protect important files, with AES-192 encryption CTR format. Once all the foo files have been encypted directions made visible withing the html page to regain access (decrepyt) to the files.

We are using  AES-192 CTR for our symetric encryption for files. The reason why we chose AES is because it is a symetric cipher and is secure and complex enough. We chose the 192-bit version of it so that its "good enough" for when someone tries to break it. Symetric ciphers are fast to run encryption and decryption on files. This feature is required for the ransomeware to work as desired as we want to encrypt the files before the user realises it. 

The encryption is just as strong as how we handle the key. Using the same key for different computers will make the ransomware insignificant. Thus we create a 64-bit secure-random key everytime for every computer that the ransomeware will attack. Also we cannot store the key in HDD, so we keep the key in memory and then we encrypt the key with an asymmetric RSA encryption so it will be harder to run cryptanalysis. The RSA is used to send trudy encrypted key of the AES. The RSA is running on Trudy's computer such that upon verified payment Trudy would use its private key to decrypt the key and send it to the local running program for it to decrypt the .foo files   

The script can be delivered using an phishing email. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

node.js --version 7.9+	node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient

npm --version 2.7.1+	npm is the package manager for JavaScript and the world’s largest software registry. Discover packages of reusable code — and assemble them in powerful new ways.

electorn --version 1.6.5+	Electron is a framework for creating native applications with web technologies like JavaScript, HTML, and CSS.


### Installing

install the package



## Dependencies

dotenv (npm module) - Dotenv is a zero-dependency module that loads environment variables 

fs-finder (npm module) - File system finder 

fs (Native Node.js Library)- File I/O using simple wrappers around standard POSIX functions.

node-rsa (npm module) - Node.js RSA library

file-encryptor (npm module) - Encrypts files using Node's built-in Cipher class. Encryption is stream-based for low memory footprint.

child_process (Native Node.js Library) - used to spawn a shell and runs a command within that shell

secure-random-string (npm module) - generates a cryptographically secure random string with a given length

ursa-purejs (npm module) - A pure-js drop-in replacement for URSA, using node-rsa behind the scenes

## Deployment

Add additional notes about how to deploy this on a live system


## Authors

* **Nilay Bhatt* 

* **Sabahudin Mujcinovic* 

## License

This project is licensed under the MIT License 
