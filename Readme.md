# Install

```
   git clone https://github.com/mehmethelveci/get-deleted.git
```

Install Required Dependencies
Open a terminal and navigate to the project's root directory.

Install the project's dependencies by running the following command:

```
	npm install
```

## Update the Library's Gradle Configuration
Open the :react-native-background-task gradle file. (You can find it easily with android studio)

Replace the "compile" statements with "implementation":

### For example:
```
// Before
	compile 'com.facebook.react:react-native:+'
	compile 'com.evernote:android-job:1.1.11'

// After
	implementation 'com.facebook.react:react-native:+'
	implementation 'com.evernote:android-job:1.1.11'
```

Run the Application
Navigate to the project directory in your terminal.

### Run the following command to start the project:

```
	npx react-native run-android
```


# Conclusion

This documentation covers the steps to clone, install dependencies, and integrate a library into a React Native project from GitHub. By following these steps, you should be able to successfully run the project.

