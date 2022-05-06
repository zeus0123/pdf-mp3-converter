const fs = require('fs');
const pdf = require('pdf-parse');
const gTTS = require('gtts');

// Pdf path goes here ->
const pdfPath = "assets/bootstrapping-microservices-with-docker-kubernetes-and-terraform-a-project-based-guide-1nbsped-1617297216-9781617297212_compress.pdf";

// Convert Pdf to text
const generateTextFiles = async () => {
    
    try {
        let dataBuffer = fs.readFileSync(pdfPath);
        const text = await pdf(dataBuffer);
        return text.text;
    } catch (error) {
        console.log(error);
    }
}

// Convert text to speech
const generateAudioFromText = async () => {
    const bookText = await generateTextFiles();
    const gtts = new gTTS(bookText, 'en');
    gtts.save('assets/book.mp3', function (err, result) {
        if(err) { throw new Error(err) }
        console.log('Success! Open file to hear result.');
      });
}

generateAudioFromText();
