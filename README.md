# Newest stories using Hacker News api

Hello!

Welcome to my web application,

This app fetches data from the Hacker News public api and displays the results in a table.

I am using C#/.Net Core as backend, and Angular as frontend.

# Requirements

1. ## Node.js 14.15.1
* Download here: https://nodejs.org/en/ \
* Add C:\Program Files\nodejs\ to your Path variable on the "User variable" section of the Environment Variables on the System Properties.\
* Here's a tutorial on how to do it: https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/

2. ## .NET Core 3.1&nbsp;
* Download here: https://dotnet.microsoft.com/download/dotnet-core 
* Add C:\Program Files\dotnet\ to your Path variable.
 
# How to run the app

1. Clone the repo
2. Open command prompt
3. Go to the app folder C:\Users\'your user'\newest_stories_hackerNews-api\ClientApp\
4. Run 'npm uninstall node-gyp'
5. Run 'npm install @angular-devkit/build-angular'
6. Launch app with 'dotnet run' at this path C:\Users\'your user'\newest_stories_hackerNews-api\ \
(News page will take some time to load)

# How to run test cases

### Backend tests
1. Open command prompt
2. Go to the app folder C:\Users\'your user'\newest_stories_hackerNews-api\
3. Run 'dotnet test'

### Frontend tests
1. Open command prompt
2. Go to the app folder C:\Users\'your user'\newest_stories_hackerNews-api\ClientApp\
3. Run 'npm run ng test'


