const Department = require('../schema/department');

module.exports = {
    getAllDepartments: function () {
        return Department.find({})
            .populate({ path: 'employees', select: '_id userName' })
            .exec();
    },

    getDepartmentById: function (id) {
        return Department.findById(id);
    },

    getDepartmentByName: function (name) {
        return Department.findOne({ name: name });
    },

    createDepartment: function (department) {
        return new Department(department).save();
    },

    updateDepartment: function (departmentId, updateData) {
        return Department.findOneAndUpdate({ _id: departmentId }, updateData, { new: true });
    },

    deleteDepartment: async function (departmentId) {
        try {
            const deletedDepartment = await Department.findOneAndDelete({ _id: departmentId });
            return deletedDepartment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
