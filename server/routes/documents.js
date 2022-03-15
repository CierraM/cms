const express = require('express');
const router = express.Router();
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');
module.exports = router;


router.get('/', (req, res, next) => {
    Document.find().then(documents => {
        res.status(200).json(documents)
    }).catch(err => {
        res.status(500).json({ message: 'An error occured', error: err })
    })
});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
    if (Number.isNaN(maxDocumentId)) {
        return;
    }
    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })

    document.save().then(document => {
        res.status(201).json({
            message: 'Document added successfully',
            document: document
        })
    }).catch(err => {
        res.status(500).json({
            message: 'An error occurred',
            error: err
        })
    })
})

router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id }).then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;

        Document.updateOne({ id: req.params.id }, document).then(result => {
            res.status(204).json({
                message: 'Document updated succesfully',
            })
        }).catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Document not found',
            error: { document: 'Document not found' }
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id }).then(document => {
        Document.deleteOne({ id: req.params.id }).then(result => {
            res.status(204).json({
                message: "Document deleted successfully"
            })
        }).catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Document not found',
            error: { document: 'Document not found' }
        })
    })
})