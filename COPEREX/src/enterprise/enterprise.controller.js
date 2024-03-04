'use strict'

import Enterprise from './enterprise.model.js'
import Category from '../category/category.model.js'
import { checkUpdate } from '../../utils/validator.js'
import xlsxPopulate from 'xlsx-populate'
import open from 'open'

export const saveEnterprise = async (req, res) => {
    try {

        let data = req.body
        let enterprise = new Enterprise(data)
        await enterprise.save()
        return res.send({ message: 'Enterprise save succesfully' })


    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error save Enterprise', err })

    }
}

export const enterpriseUpdate = async (req, res) => {
    try {

        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updateEnterprise = await Enterprise.findOneAndUpdate(

            { _id: id },
            data,
            { new: true }

        )
        if (!updateEnterprise) return res.status(401).send({ message: 'Enterprise not found and not update' })
        return res.send({ message: 'Update Enterprise', updateEnterprise })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating enterprise' })

    }
}

export const deleteE = async (req, res) => {
    try {

        let { id } = req.params
        let deletedEnterprise = await Enterprise.findOneAndDelete({ _id: id })
        if (!deletedEnterprise) return res.status(404).send({ message: 'Enterprise not found and not delete' })
        return res.send({ message: 'Enterprise delete successfully' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting enterprise', err })

    }
}

//A-Z
const getSortedE = async () => {
    return await Enterprise.find()
        .populate('category', ['nameCategory', '-_id'])
        .select('-__v')
        .sort({ enterpriseName: 1 })
};

//Z-A
const getSortedEn = async () => {
    return await Enterprise.find()
        .populate('category', ['nameCategory', '-_id'])
        .select('-__v')
        .sort({ enterpriseName: -1 })
}

//YEARS
const getSortedEnterprise = async () => {
    return await Enterprise.find()
        .populate('category', ['nameCategory', '-_id'])
        .select('-__v')
        .sort({ yearsTrayectory: -1 })
}

//Function list AZ
export const getAZ = async (req, res) => {
    try {

        const listEnterprise = await getSortedE()

        if (listEnterprise.length === 0) {
            return res.status(404).send({ message: 'Not found' })
        }
        return res.send({ listEnterprise })

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting enterprise' })
    }
}

//Function list ZA
export const getZA = async (req, res) => {
    try {

        const listEnterprise = await getSortedEn()

        if (listEnterprise.length === 0) {
            return res.status(404).send({ message: 'Not found' })
        }
        return res.send({ listEnterprise });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting enterprise' })
    }
}

//Function list Years
export const getYears = async (req, res) => {
    try {

        const listEnterprise = await getSortedEnterprise()

        if (listEnterprise.length === 0) {
            return res.status(404).send({ message: 'Not found' })
        }
        return res.send({ listEnterprise })

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting enterprise' })
    }
}

// Function to find a category by name
const findCategoryByName = async (name) => {
    return await Category.findOne({ nameCategory: name })
}

// Feature to find enterprise by category
const findEnterpriseByCategory = async (categoryId) => {
    return await Enterprise.find({ category: categoryId }).populate('category', ['nameCategory', '-_id'])
}

//get enterprise by category
export const getEnterpriseCategory = async (req, res) => {
    try {

        const { search } = req.body

        //Search category
        const category = await findCategoryByName(search);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' })
        }

        // Search enterprise by category
        const enterprises = await findEnterpriseByCategory(category._id)
        if (enterprises.length === 0) {
            return res.status(404).send({ message: 'Enterprise not found' })
        }
        return res.send({ enterprises })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error getting enterprise' })
    }
}


//EXCEL

const writeHeaders = (sheet) => {

    sheet.cell('A1').value('EnterpriseName')
    sheet.cell('B1').value('impactLevel')
    sheet.cell('C1').value('yearsTrayectory')
    sheet.cell('D1').value('category')
}

// Function to write enterprise data to Excel file
const writeEnterpriseData = (sheet, enterprise) => {

    enterprise.forEach((enterprise, index) => {
        sheet.cell(`A${index + 2}`).value(enterprise.enterpriseName)
        sheet.cell(`B${index + 2}`).value(enterprise.impactLevel)
        sheet.cell(`C${index + 2}`).value(enterprise.yearsTrayectory)
        sheet.cell(`D${index + 2}`).value(enterprise.category.nameCategory)
    })
}

//Driver to obtain Excel document
export const getExcel = async (req, res) => {
    try {

        const workbook = await xlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);

        // Write headers
        writeHeaders(sheet);

        //Get data from database 
        const enterprises = await Enterprise.find().populate('category', ['nameCategory']);

        // Write enterprise data to Excel file
        writeEnterpriseData(sheet, enterprises);

        // Save the Excel file
        await workbook.toFileAsync("../COPEREX/Coperex.xlsx");
        await open ("../COPEREX/Coperex.xlsx")

        return res.status(200).send({ message: 'Your Excel document has been successfully created.' });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding document' });
    }
};




