const userModel = require('../models/userModel')

const getAllUser = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'username', order = 'asc' } = req.query;
        const users = await userModel.find()
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const searchUser = async (req, res) => {
    try {
        const { username, email, role } = req.query;

        let filter = {};
        if (username) filter.username = username;
        if (email) filter.email = email;
        if (role) filter.role = role;

        if (Object.keys(filter).length === 0) {
            return res.status(400).json({ message: 'Please provide a valid search parameter (username, email, or role).' });
        }

        const users = await userModel.find(filter);

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found matching the provided criteria.' });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const updateUser = async (request, response) => {
    try {
        const userToBeUpdated = request.body
        const updatedUser = await userModel.updateOne({ username: userToBeUpdated.username }, userToBeUpdated)
        if (!updatedUser) {
            return response.status(404).json({ message: 'User not found' })
        }
        return response.status(200).json(updatedUser)
    }
    catch {
        return response.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userModel.findOneAndUpdate(
            { username, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found or already deactivated' });
        }

        return res.status(200).json({ message: 'User deactivated successfully!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await userModel.find({ isDeleted: false });
        return res.status(200).json(activeUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const reactivateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userModel.findOneAndUpdate(
            { username, isActive: false },
            { isActive: true },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found or already active' });

        return res.status(200).json({ message: 'User reactivated successfully', user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const exportUsersToCSV = async (req, res) => {
    try {
        const users = await userModel.find();
        const csv = users.map(user => ({
            Username: user.username,
            Email: user.email,
            Role: user.role,
            IsActive: user.isActive,
            DateOfRegistration: user.dateOfRegistration,
        }));

        res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
        res.setHeader('Content-Type', 'text/csv');
        res.status(200).end(csv.join('\n'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const activeUsers = await userModel.countDocuments({ isActive: true });
        const roleCounts = await userModel.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } },
        ]);

        return res.status(200).json({ totalUsers, activeUsers, roleCounts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllUser,
    searchUser,
    updateUser,
    deleteUser,
    getActiveUsers,
    reactivateUser,
    exportUsersToCSV,
    getDashboardStats
};