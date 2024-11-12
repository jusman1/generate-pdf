const express = require('express');
const cors = require('cors')
const htmlPdf = require('html-pdf');
const Mustache = require('mustache');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.post('/generate-pdf', (req, res) => {
  const { template, content, options } = req.body;
  const htmlContent = Mustache.render(template, content);

  htmlPdf.create(htmlContent, options).toBuffer((err, buffer) => {
    if (err) return res.status(500).send(err.message);
    res.contentType("application/pdf");
    res.send(buffer);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));