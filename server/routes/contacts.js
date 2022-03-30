const express = require('express');
const router = express.Router();
const Contact = require('../models/contact')
const sequenceGenerator = require('./sequenceGenerator');
module.exports = router;


router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json(contacts)
        }).catch(err => {
            res.status(500).json({ message: 'An error occured', error: err })
        })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    console.log(req.params)
    Contact.findOne({ id: id }).then(contact => {
        res.status(200).json(contact)
    }).catch(err => {
        res.status(500).json({message: 'could not get contact', error: err})
    })
})

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    })

    contact.save().then(contact => {
        res.status(201).json({
            message: 'Contact added successfully',
            contact: contact
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'An error occurred',
            error: err
        })
    })
})

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id }).then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;

        Contact.updateOne({ id: req.params.id }, contact).then(result => {
            res.status(204).json({
                message: 'Contact updated successfully',
            })
        }).catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Contact not found',
            error: { contact: 'Contact not found' }
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id }).then(contact => {
        Contact.deleteOne({ id: req.params.id }).then(result => {
            res.status(204).json({
                message: "Contact deleted successfully"
            })
        }).catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Contact not found',
            error: { contact: 'Contact not found' }
        })
    })
})