# Aparat Video Platform NodeJs Api

This is a Node.js library for interacting with the [Aparat](https://www.aparat.com) video platform API. You can use it to manage user profiles, search videos, upload videos, fetch video details, and more.
## Features 🚀

- ⭐ Login to the Aparat platform
- ⭐ Fetch user profiles and categories
- ⭐ Search for users and videos
- ⭐ Upload videos
- ⭐ Fetch video details
- ⭐ Fetch comments and tags associated with videos

## Installation 🔧

Install the package using npm:

```bash
npm install aparat-api
```

## Usage 📚

### Import and Initialization

Start by importing the `Aparat` class from the library and creating an instance of it:

```js
const Aparat = require('aparat-api');
const aparat = new Aparat();
```

### Login to Aparat 🔐

You must log in before accessing most of the platform’s features. Here’s how you can log in:

```js
(async () => {
  try {
    const profile = await aparat.login('your_username', 'your_password');
    if (profile) {
      console.log(`Logged in as ${profile.username}`);
    } else {
      console.log('Login failed.');
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
})();
```

### Fetch User Profile 👤

You can retrieve a user's profile using their username:

```js
(async () => {
  try {
    const userProfile = await aparat.profile('some_username');
    if (userProfile) {
      console.log(`Profile of ${userProfile.username}:`, userProfile);
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('An error occurred while fetching the profile:', error);
  }
})();
```

### Search Users 🔍

You can search for users by a keyword:

```js
(async () => {
  try {
    const users = await aparat.userBySearch('search_term', 5);
    if (users.length > 0) {
      console.log('Users found:', users);
    } else {
      console.log('No users found.');
    }
  } catch (error) {
    console.error('An error occurred while searching for users:', error);
  }
})();
```

### Fetch Video Details 📹

Retrieve video details using a video hash:

```js
(async () => {
  try {
    const video = await aparat.video('video_hash_here');
    if (video) {
      console.log('Video details:', video);
    } else {
      console.log('Video not found.');
    }
  } catch (error) {
    console.error('An error occurred while fetching the video details:', error);
  }
})();
```

### Upload a Video 📤

To upload a video, first fetch the upload form, and then send the video file with the form:

```js
(async () => {
  try {
    // Login first
    const profile = await aparat.login('your_username', 'your_password');
    
    if (!profile) {
      console.log('Login failed. Please check your credentials.');
      return;
    }
    
    // Fetch the upload form
    const uploadForm = await aparat.uploadForm(profile.username, profile.ltokem);
    if (!uploadForm) {
      console.log('Failed to retrieve the upload form.');
      return;
    }

    // Upload the video
    const uploadedVideo = await aparat.uploadPost(
      'path/to/your/video.mp4',  // Path to video file
      'My Awesome Video',         // Video title
      1,                          // Category ID
      uploadForm,                 // Upload form object
      {
        tags: ['example', 'tags'],  // Optional tags
        allow_comment: true,        // Allow comments
        description: 'This is a test video.',  // Video description
        video_pass: false           // Optional: Password protection
      }
    );

    console.log('Video uploaded successfully:', uploadedVideo);
  } catch (error) {
    console.error('An error occurred while uploading the video:', error);
  }
})();
```

### Fetch Videos by User 📽️

You can fetch the list of videos uploaded by a specific user:

```js
(async () => {
  try {
    const videos = await aparat.videoByUser('some_username', 10);
    if (videos.length > 0) {
      console.log('Videos by user:', videos);
    } else {
      console.log('No videos found.');
    }
  } catch (error) {
    console.error('An error occurred while fetching videos by user:', error);
  }
})();
```
## Contributing
Contributions are welcome! Here's how you can contribute to this project:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Submit a pull request.
Please ensure your pull request adheres to the following guidelines:

Describe clearly what problem you're solving with this PR.
Keep the PR focused on a single feature or bug fix.

## Repository Stats 📊

- [![npm version](https://img.shields.io/npm/v/aparat-api)](https://www.npmjs.com/package/aparat-api)
- [![License](https://img.shields.io/github/license/Itzhep/aparat)](https://github.com/Itzhep/aparat/blob/main/LICENSE)
![NPM Downloads](https://img.shields.io/npm/dm/aparat)
![stars](https://img.shields.io/github/stars/Itzhep/aparat)
![last commit](https://img.shields.io/github/last-commit/Itzhep/aparat)
## License 📜

This library is provided under the MIT License.
