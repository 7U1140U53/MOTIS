const https = require('https');
const fs = require('fs');

// We use a verified public domain image of a clean pharmaceutical/chemical production facility
const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pharmaceutical_packaging.jpg/1280px-Pharmaceutical_packaging.jpg";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode === 200) {
    const file = fs.createWriteStream("public/clean-factory.jpg");
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log("Download complete.");
    });
  } else {
    console.log("Failed to download, status: " + res.statusCode);
  }
}).on('error', (err) => {
  console.log("Error: ", err.message);
});
