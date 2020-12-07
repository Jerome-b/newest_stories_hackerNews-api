# Newest stories using Hacker News api

Hello!

Welcome to my web application

It is accessible at https://neweststorieshackernews.azurewebsites.net/
### You will be required to download .Net Core Runtime to access the app
Download link: https://dotnet.microsoft.com/download/dotnet-core/current/runtime

This app fetches data from the Hacker News public api and displays the results in a table.

I am using C#/.Net Core as backend, and Angular as frontend.

# How to run locally
 * ## Windows
## Requirements

### 1. Node.js
* Download here: https://nodejs.org/en/ 
* Open Command Prompt
* Check if it's correctly installed by running the command 'node --version'
* If the command is not recognized, add 'nodejs' to your Path variable on the "User variable" section of the Environment Variables on the System Properties.
* Here's a tutorial on how to add new Path variable: https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/

### 2. .NET Core 3.1&nbsp;
* Download here: https://dotnet.microsoft.com/download/dotnet-core 
* Add 'dotnet' to your Path variable.
 
## How to run the app

1. Open command prompt 
2. Clone the repo by running 'git clone https://github.com/Jerome-b/newest_stories_hackerNews-api.git'
3. Go to the application folder: 'cd newest_stories_hackerNews-api\Nextechapp\
4. Run 'npm uninstall node-gyp'
5. Run 'npm install @angular-devkit/build-angular'
6. Launch app with 'dotnet run' 
7. Open your web browser and go to https://localhost:5001/
(News page can take some time to load)

## How to run test cases

#### Backend tests
1. Open command prompt
2. Go to the app test folder: 'cd newest_stories_hackerNews-api\NewStoriesTests\
3. Run 'dotnet test'

#### Frontend tests
1. Open command prompt
2. Go to the app folder: 'cd newest_stories_hackerNews-api\Nextechapp\ClientApp\
3. Run 'npm run ng test'
4. Wait for your web browser to load the test page

### Linux (not supported yet)
### macOS (not supported yet)

