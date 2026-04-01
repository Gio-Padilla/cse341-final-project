const mongodb = require('../data/database');

// Get all packages
const getAll = async (req, res) => {
    try {
        const packages = await mongodb
            .getDatabase()
            .db()
            .collection('packages')
            .find()
            .toArray();

        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving packages',
            error: error.message
        });
    }
};

// Get a single package
const getSingle = async (req, res) => {
    try {
        const packageId = req.params.packageId;

        const pkg = await mongodb
            .getDatabase()
            .db()
            .collection('packages')
            .findOne({ packageId });

        if (!pkg) {
            return res.status(404).json({
                message: 'Package not found'
            });
        }

        res.status(200).json(pkg);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving package',
            error: error.message
        });
    }
};

// Add a package
const addPackage = async (req, res) => {
    try {
        const pkg = {
            packageId: req.body.packageId,
            title: req.body.title,
            destinationId: req.body.destinationId,
            durationDays: req.body.durationDays,
            price: req.body.price,
            includesFlight: req.body.includesFlight,
            includesHotel: req.body.includesHotel,
            maxPeople: req.body.maxPeople,
            description: req.body.description
        };

        await mongodb
            .getDatabase()
            .db()
            .collection('packages')
            .insertOne(pkg);

        res.status(201).json({
            message: 'Package created successfully'
        });
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'packageId already exists'
            });
        }

        res.status(500).json({
            message: 'Error creating package',
            error: error.message
        });
    }
};

// EDIT PACKAGE
const editPackage = async (req, res) => {
    try {
        const packageId = req.params.packageId;

        const updatedPackage = {
            packageId: req.body.packageId,
            title: req.body.title,
            destinationId: req.body.destinationId,
            durationDays: req.body.durationDays,
            price: req.body.price,
            includesFlight: req.body.includesFlight,
            includesHotel: req.body.includesHotel,
            maxPeople: req.body.maxPeople,
            description: req.body.description
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('packages')
            .replaceOne({ packageId }, updatedPackage);

        if (response.matchedCount === 0) {
            return res.status(404).json({
                message: 'Package not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error updating package',
            error: error.message
        });
    }
};

// DELETE PACKAGE
const deletePackage = async (req, res) => {
    try {
        const packageId = req.params.packageId;
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('packages')
            .deleteOne({ packageId });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                message: 'Package not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting package',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    addPackage,
    editPackage,
    deletePackage
};