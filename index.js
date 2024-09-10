// aparat.js

const axios = require('axios');
const crypto = require('crypto');
const FormData = require('form-data');
const fs = require('fs');
const certifi = require('certifi');
const https = require('https');

// Utility function to hash password
class Aparat {
  constructor() {
    this.baseUrl = 'https://www.aparat.com/etc/api/';
  }

  // SHA1-MD5 hash for password
  hashPassword(password) {
    const md5 = crypto.createHash('md5').update(password).digest('hex');
    const sha1 = crypto.createHash('sha1').update(md5).digest('hex');
    return sha1;
  }

  // Login method
  async login(luser, lpass) {
    const hashedpass = this.hashPassword(lpass);
    try {
      const res = await axios.get(`${this.baseUrl}login/luser/${luser}/lpass/${hashedpass}`);
      return res.data.login || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Get profile by username
  async profile(username) {
    try {
      const res = await axios.get(`${this.baseUrl}profile/username/${username}`);
      return res.data.profile || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Search users
  async userBySearch(text, perpage = 10) {
    try {
      const res = await axios.get(`${this.baseUrl}userBySearch/text/${text}/perpage/${perpage}`);
      return res.data.userbysearch || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get profile categories by username
  async profileCategories(username) {
    try {
      const res = await axios.get(`${this.baseUrl}profilecategories/username/${username}`);
      return res.data.profilecategories || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get video by videohash
  async video(videohash) {
    try {
      const res = await axios.get(`${this.baseUrl}video/videohash/${videohash}`);
      return res.data.video || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Get videos by category
  async categoryVideo(cat = 1, perpage = 10) {
    try {
      const res = await axios.get(`${this.baseUrl}categoryVideos/cat/${cat}/perpage/${perpage}`);
      return res.data.categoryvideos || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get videos by user
  async videoByUser(username, perpage = 10) {
    try {
      const res = await axios.get(`${this.baseUrl}videoByUser/username/${username}/perpage/${perpage}`);
      return res.data.videobyuser || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get comments by video hash
  async commentByVideos(videohash, perpage = 10) {
    try {
      const res = await axios.get(`${this.baseUrl}commentByVideos/videohash/${videohash}/perpage/${perpage}`);
      return res.data.videobyuser || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get videos by search
  async videoBySearch(text, perpage = 10) {
    try {
      const res = await axios.get(`${this.baseUrl}videoBySearch/text/${text}/perpage/${perpage}`);
      return res.data.videobysearch || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get videos by tag
  async videoByTag(text) {
    try {
      const res = await axios.get(`${this.baseUrl}videobytag/text/${text}`);
      return res.data.videobytag || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get upload form
  async uploadForm(luser, ltoken) {
    try {
      const res = await axios.get(`${this.baseUrl}uploadform/luser/${luser}/ltoken/${ltoken}`);
      return res.data.uploadform || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Upload video
  async uploadPost(videoPath, title, category, form, options = {}) {
    const formData = new FormData();
    formData.append('frm-id', form.frm_id);
    formData.append('data[title]', title);
    formData.append('data[category]', category);
    
    if (options.tags) {
      formData.append('data[tags]', options.tags.join(','));
    }
    if (options.allow_comment !== undefined) {
      formData.append('data[comment]', options.allow_comment);
    }
    if (options.description) {
      formData.append('data[descr]', options.description);
    }
    if (options.video_pass !== undefined) {
      formData.append('data[video_pass]', options.video_pass);
    }
    formData.append('video', fs.createReadStream(videoPath));

    try {
      const response = await axios.post(form.formAction, formData, {
        headers: formData.getHeaders(),
        httpsAgent: new https.Agent({
          ca: certifi,
        }),
      });
      const videohash = response.data.uploadpost.uid;
      return this.video(videohash);
    } catch (error) {
      console.error(error);
      throw new Error('Upload failed');
    }
  }
}

module.exports = Aparat;
